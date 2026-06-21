// src/scheduler/services/velocityCheckerEngine.js
import { db } from "../../database/dexie";
import dayjs from "dayjs";

const TARGET_DEADLINE = "2027-03-31";

const LOCKED_SUBJECTS = [
  "internal security",
  "disaster management",
  "post independence history",
  "world history"
];

export async function calculateVelocityMetrics(userId) {
  const config = await db.onboarding_config.where("userId").equals(userId).first();
  if (!config) return null;

  const totalHoursTarget = parseInt(config.dailyStudyTarget) || parseInt(config.studyHoursPerDay) || 6;
  const today = dayjs();
  const deadlineDate = dayjs(TARGET_DEADLINE);
  const totalDaysRemainingToDeadline = Math.max(1, deadlineDate.diff(today, "day"));

  // 1. Calculate Time Budgets based on Core Study Hour Group Rules
  const revisionMinutes = totalHoursTarget >= 8 ? 75 : (totalHoursTarget === 7 ? 60 : 45);
  const practiceMinutes = 60;
  let baseOptionalMinutes = 90;
  if (totalHoursTarget === 7) baseOptionalMinutes = 105;
  if (totalHoursTarget === 8) baseOptionalMinutes = 120;

  const baseGsMinutesPerDay = (totalHoursTarget * 60) - (revisionMinutes + practiceMinutes + baseOptionalMinutes);

  // 2. Load supporting subject dictionaries for rigorous exclusion filtering
  const subjectsArray = await db.subjects.toArray();
  const progressRecords = await db.subtopic_progress.toArray();
  const allSubtopics = await db.subtopics.toArray();

  let totalGsRemainingMinutes = 0;
  let totalOptionalRemainingMinutes = 0;

  // Extract the specific sequences chosen by the user
  let currentGsSubjectId = config.gsSequence?.[0]?.id || null;
  let userOptionalTopicIds = config.optionalSequence?.map(opt => opt.id) || [];
  let currentOptionalTopicId = userOptionalTopicIds[0] || null;
  
  let currentSubjectRemainingMinutes = 0;
  let currentSubjectType = "GS"; 
  let currentSubjectName = "None Active";

  if (currentGsSubjectId) {
    const activeSubjMeta = subjectsArray.find(s => s.id === currentGsSubjectId);
    if (activeSubjMeta) {
      currentSubjectName = activeSubjMeta.name;
    }
  }

  // Hierarchical structure to capture microscopic reporting
  const structuralAuditMap = {};

  // 3. Process subtopic workloads with strict subject lookup and user choice constraints
  for (const st of allSubtopics) {
    // Look up parent subject metadata dynamically from the array cache
    const parentSubject = subjectsArray.find(s => s.id === st.subjectId);
    const parentSubjectNameClean = parentSubject?.name?.toLowerCase().trim() || "";

    // STRICT GATE LAYER: If it belongs to any locked post-prelims subject, skip entirely
    if (LOCKED_SUBJECTS.includes(parentSubjectNameClean)) {
      continue;
    }

    const prog = progressRecords.find(p => p.subtopicId === st.id);
    if (st.status?.toUpperCase() === "COMPLETED" || prog?.status?.toUpperCase() === "COMPLETED") {
      continue;
    }

    // Direct extraction parsing that mirrors exact raw string values
    let remaining = 0;
    if (prog && prog.status === "chunked" && prog.remainingMinutes !== undefined) {
      remaining = parseInt(prog.remainingMinutes, 10);
    } else {
      remaining = parseInt(st.estimatedMinutes, 10) || parseInt(st.duration, 10) || 45;
    }

    if (st.type?.toUpperCase() === "OPTIONAL") {
      if (userOptionalTopicIds.includes(st.topicId)) {
        totalOptionalRemainingMinutes += remaining;
        if (st.topicId === currentOptionalTopicId && currentGsSubjectId === null) {
          currentSubjectRemainingMinutes += remaining;
        }
      }
    } else {
      totalGsRemainingMinutes += remaining;
      
      // Populate nested visual reporting map
      const subjectKey = parentSubject?.name || st.subjectId || "Unclassified GS Subjects";
      const topicKey = st.topicName || st.topicId || "General Group Module";
      const subtopicKey = st.name || st.subtopicId || "Unnamed Component Block";

      if (!structuralAuditMap[subjectKey]) {
        structuralAuditMap[subjectKey] = { _subjectTotalMinutes: 0, topics: {} };
      }
      if (!structuralAuditMap[subjectKey].topics[topicKey]) {
        structuralAuditMap[subjectKey].topics[topicKey] = { _topicTotalMinutes: 0, subtopics: [] };
      }

      structuralAuditMap[subjectKey]._subjectTotalMinutes += remaining;
      structuralAuditMap[subjectKey].topics[topicKey]._topicTotalMinutes += remaining;
      structuralAuditMap[subjectKey].topics[topicKey].subtopics.push({
        name: subtopicKey,
        minutes: remaining,
        status: prog?.status || st.status || "pending"
      });

      if (st.subjectId === currentGsSubjectId) {
        currentSubjectRemainingMinutes += remaining;
      }
    }
  }

 

  // Fallback switch checking to Optional if GS tracking sequence is completely empty
  if (currentSubjectRemainingMinutes === 0 && currentOptionalTopicId) {
    currentSubjectType = "OPTIONAL";
    const activeTopicMeta = await db.topics.get(currentOptionalTopicId);
    currentSubjectName = activeTopicMeta ? activeTopicMeta.name : "Optional Module";
    
    for (const st of allSubtopics) {
      if (st.topicId === currentOptionalTopicId) {
        const parentSubject = subjectsArray.find(s => s.id === st.subjectId);
        const parentSubjectNameClean = parentSubject?.name?.toLowerCase().trim() || "";
        if (LOCKED_SUBJECTS.includes(parentSubjectNameClean)) continue;

        const prog = progressRecords.find(p => p.subtopicId === st.id);
        if (st.status?.toUpperCase() !== "COMPLETED" && prog?.status?.toUpperCase() !== "COMPLETED") {
          let rem = 0;
          if (prog && prog.status === "chunked" && prog.remainingMinutes !== undefined) {
            rem = parseInt(prog.remainingMinutes, 10);
          } else {
            rem = parseInt(st.estimatedMinutes, 10) || parseInt(st.duration, 10) || 45;
          }
          currentSubjectRemainingMinutes += rem;
        }
      }
    }
  }

  // 4. Compute Pace & Projections accurately against available study sessions
  const gsDaysNeeded = baseGsMinutesPerDay > 0 ? Math.ceil(totalGsRemainingMinutes / baseGsMinutesPerDay) : 0;
  const optionalSessionsNeeded = baseOptionalMinutes > 0 ? Math.ceil(totalOptionalRemainingMinutes / baseOptionalMinutes) : 0;

  // Convert active Optional session blocks into real physical calendar days (~4 active days out of 7)
  const optionalCalendarDaysNeeded = Math.ceil(optionalSessionsNeeded * (7 / 4));

  const estimatedGsCompletionDate = today.add(gsDaysNeeded, "day");
  const estimatedOptionalCompletionDate = today.add(optionalCalendarDaysNeeded, "day");

  const isGsMiss = estimatedGsCompletionDate.isAfter(deadlineDate);
  const isOptionalMiss = estimatedOptionalCompletionDate.isAfter(deadlineDate);

  // Velocity needed per active session day to hit the deadline completely
  const requiredGsMinutesPerDay = totalGsRemainingMinutes / totalDaysRemainingToDeadline;
  
  const totalOptionalSessionsLeft = Math.max(1, Math.floor(totalDaysRemainingToDeadline * (4 / 7)));
  const requiredOptionalMinutesPerSession = totalOptionalRemainingMinutes / totalOptionalSessionsLeft;

  const recommendedGsHoursIncrease = isGsMiss ? Math.ceil((requiredGsMinutesPerDay - baseGsMinutesPerDay) / 60) : 0;
  const recommendedOptionalHoursIncrease = isOptionalMiss ? Math.ceil((requiredOptionalMinutesPerSession - baseOptionalMinutes) / 60) : 0;

  // Current Subject tracking allocations
  const currentAllocationMinutesPerActiveSession = currentSubjectType === "GS" ? baseGsMinutesPerDay : baseOptionalMinutes;
  const currentSubjectSessionsNeeded = currentAllocationMinutesPerActiveSession > 0 ? Math.ceil(currentSubjectRemainingMinutes / currentAllocationMinutesPerActiveSession) : 0;
  
  const currentSubjectCalendarDaysNeeded = currentSubjectType === "OPTIONAL" 
    ? Math.ceil(currentSubjectSessionsNeeded * (7 / 4)) 
    : currentSubjectSessionsNeeded;
    
  const estimatedCurrentSubjectCompletionDate = today.add(currentSubjectCalendarDaysNeeded, "day");

  // 5. Extract exact hour integers and minute remainders for absolute UI precision
  const gsExactHours = Math.floor(totalGsRemainingMinutes / 60);
  const gsExactMinutes = totalGsRemainingMinutes % 60;

  const optionalExactHours = Math.floor(totalOptionalRemainingMinutes / 60);
  const optionalExactMinutes = totalOptionalRemainingMinutes % 60;

  const currentExactHours = Math.floor(currentSubjectRemainingMinutes / 60);
  const currentExactMinutes = currentSubjectRemainingMinutes % 60;

  return {
    gs: {
      remainingHours: gsExactHours,
      remainingMinutes: gsExactMinutes,
      displayTime: `${gsExactHours}h ${gsExactMinutes}m`,
      velocityNeededPerDayMins: Math.round(requiredGsMinutesPerDay),
      estimatedCompletion: estimatedGsCompletionDate.format("DD MMM YYYY"),
      missed: isGsMiss,
      suggestion: recommendedGsHoursIncrease > 0 ? `Increase daily GS buffer by +${recommendedGsHoursIncrease}h to hit target.` : "Pacing is stable to hit March 31 target."
    },
    optional: {
      remainingHours: optionalExactHours,
      remainingMinutes: optionalExactMinutes,
      displayTime: `${optionalExactHours}h ${optionalExactMinutes}m`,
      velocityNeededPerDayMins: Math.round(requiredOptionalMinutesPerSession),
      estimatedCompletion: estimatedOptionalCompletionDate.format("DD MMM YYYY"),
      missed: isOptionalMiss,
      suggestion: recommendedOptionalHoursIncrease > 0 ? `Increase daily Optional allocation by +${recommendedOptionalHoursIncrease}h to secure deadline.` : "Pacing conforms to safety guidelines."
    },
    currentSubject: {
      name: currentSubjectName,
      type: currentSubjectType,
      remainingHours: currentExactHours,
      remainingMinutes: currentExactMinutes,
      displayTime: `${currentExactHours}h ${currentExactMinutes}m`,
      estimatedCompletion: estimatedCurrentSubjectCompletionDate.format("DD MMM YYYY")
    }
  };
}