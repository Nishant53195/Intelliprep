// src/dashboard/sections/TestYourMains.jsx
import { useState, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../database/dexie";
import useLoginStore from "../../login/store/loginStore";
import gsSyllabus from "../../constants/gsSyllabus";
import { firestoreDb } from "../../firebase/firestore/config";
import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";
import { BookOpen, Layers, RefreshCw, FileText, ChevronLeft, ChevronRight, HelpCircle, PenTool, ClipboardSignature, Save, X, Activity, ShieldAlert, AlertTriangle, Sparkles } from "lucide-react";

function TestYourMains() {
  const user = useLoginStore((state) => state.user);
  
  // CONFIGURATION INTERFACE SELECTION STATES
  const [selectedPaper, setSelectedPaper] = useState("");
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [selectedTopicId, setSelectedTopicId] = useState("");
  const [fetchingQuestions, setFetchingQuestions] = useState(false);
  
  // CASCADING BLUEPRINT LIST HOLDERS
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [availableTopics, setAvailableTopics] = useState([]);

  // RUNTIME WORKSPACE POOL HOLDERS
  const [questionPool, setQuestionPool] = useState([]);
  const [hasLoadedPool, setHasLoadedPool] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [activeTopicName, setActiveTopicName] = useState("");

  // LOG MARKS MODAL VIEWPORT CONTAINER STATES
  const [isLogMarksOpen, setIsLogMarksOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [savingLog, setSavingLog] = useState(false);

  // CURRENT ACTIVE QUESTION EVALUATION SNAPSHOT
  const [activePastAttemptLog, setActivePastAttemptLog] = useState(null);

  // EVALUATION ARRAYS STRUCTURE TRACKERS
  const [selfScores, setSelfScores] = useState({
    demand: 0, content: 0, analysis: 0, multi: 0, valueAdd: 0, presentation: 0
  });
  const [mentorScores, setMentorScores] = useState({
    demand: 0, content: 0, analysis: 0, multi: 0, valueAdd: 0, presentation: 0
  });

  useEffect(() => {
    if (!selectedPaper) {
      setAvailableSubjects([]);
      setSelectedSubjectId("");
      setSelectedTopicId("");
      return;
    }
    const filteredSubjects = gsSyllabus.filter(s => s.paper === selectedPaper);
    setAvailableSubjects(filteredSubjects);
    setSelectedSubjectId("");
    setSelectedTopicId("");
    setHasLoadedPool(false);
    setQuestionPool([]);
  }, [selectedPaper]);

  useEffect(() => {
    if (!selectedSubjectId) {
      setAvailableTopics([]);
      setSelectedTopicId("");
      return;
    }
    const targetSubject = availableSubjects.find(s => s.id === selectedSubjectId);
    setAvailableTopics(targetSubject?.topics || []);
    setSelectedTopicId("");
    setHasLoadedPool(false);
    setQuestionPool([]);
  }, [selectedSubjectId, availableSubjects]);

  useEffect(() => {
    setHasLoadedPool(false);
    setQuestionPool([]);
  }, [selectedTopicId]);

  const activeQuestionItem = questionPool[currentQuestionIdx] || null;

  const getMaximumParameterWeights = (maxMarksValue) => {
    const totalMarksNum = Number(maxMarksValue) || 15;
    if (totalMarksNum <= 10) {
      return { demand: 2, content: 3, analysis: 2, multi: 1, valueAdd: 1, presentation: 1 };
    } else if (totalMarksNum <= 12.5) {
      return { demand: 2.5, content: 3.5, analysis: 2.5, multi: 1.5, valueAdd: 1.25, presentation: 1.25 };
    } else {
      return { demand: 3, content: 4, analysis: 3, multi: 2, valueAdd: 1.5, presentation: 1.5 };
    }
  };

  const activeMaxBounds = activeQuestionItem ? getMaximumParameterWeights(activeQuestionItem.maxMarks) : { demand: 3, content: 4, analysis: 3, multi: 2, valueAdd: 1.5, presentation: 1.5 };

  useEffect(() => {
    if (!activeQuestionItem) {
      setActivePastAttemptLog(null);
      return;
    }

    const verifyAndHydratePastMainsLog = async () => {
      const activeUserId = user?.uid || "local_user";
      try {
        let localLogs = await db.mains_log_marks
          .where("questionId")
          .equals(activeQuestionItem.id)
          .toArray();

        if (localLogs.length === 0) {
          console.log("[Mains Analytics] Log missing locally. Syncing from cloud ledger...");
          const cloudLogsRef = collection(firestoreDb, "mains_log_marks");
          const cloudLogQuery = query(
            cloudLogsRef,
            where("userId", "==", activeUserId),
            where("questionId", "==", activeQuestionItem.id)
          );
          const cloudSnapshot = await getDocs(cloudLogQuery);
          
          const tempCloudPayloads = [];
          cloudSnapshot.forEach(doc => {
            tempCloudPayloads.push({ id: doc.id, ...doc.data() });
          });

          if (tempCloudPayloads.length > 0) {
            await db.mains_log_marks.bulkPut(tempCloudPayloads);
            localLogs = await db.mains_log_marks
              .where("questionId")
              .equals(activeQuestionItem.id)
              .toArray();
          }
        }

        if (localLogs.length > 0) {
          localLogs.sort((a, b) => b.timestamp - a.timestamp);
          setActivePastAttemptLog(localLogs[0]);
        } else {
          setActivePastAttemptLog(null);
        }
      } catch (err) {
        console.warn("Failed syncing previous log history markers:", err);
      }
    };

    verifyAndHydratePastMainsLog();
  }, [activeQuestionItem, isLogMarksOpen, currentQuestionIdx]);

  const handleLoadMainsQuestions = async () => {
    if (!selectedPaper || !selectedSubjectId || !selectedTopicId) {
      alert("Please ensure Paper, Subject, and Topic boundaries are set completely before initializing.");
      return;
    }

    setFetchingQuestions(true);
    setHasLoadedPool(false);
    
    try {
      let cachedMainsBatch = await db.pyqs
        .where("topicId")
        .equals(selectedTopicId)
        .filter(q => q.type === "PYQ_MAINS")
        .toArray();

      if (cachedMainsBatch.length === 0) {
        const qBankRef = collection(firestoreDb, "master_questions_bank");
        const cloudMainsQuery = query(
          qBankRef,
          where("type", "==", "PYQ_MAINS"),
          where("topicId", "==", selectedTopicId)
        );
        const cloudSnapshot = await getDocs(cloudMainsQuery);
        
        const processedCloudPayloads = [];
        cloudSnapshot.forEach(doc => {
          const item = doc.data();
          processedCloudPayloads.push({
            id: doc.id,
            type: "PYQ_MAINS",
            paper: item.paper || selectedPaper,
            subjectId: item.subjectId || selectedSubjectId,
            topicId: item.topicId || selectedTopicId,
            subtopicId: item.subtopicId || "",
            questionText: item.questionText || "",
            year: item.year ? Number(item.year) : null,
            maxMarks: item.maxMarks ? Number(item.maxMarks) : 15,
            wordCountAllowed: item.wordCountAllowed || item.wordCount || 250,
            keywords: Array.isArray(item.keywords) ? item.keywords : (item.keywords ? item.keywords.split(",").map(k => k.trim()) : []),
            createdBy: item.createdBy || "cloud_sync",
            createdAt: item.createdAt || new Date()
          });
        });

        if (processedCloudPayloads.length > 0) {
          await db.pyqs.bulkPut(processedCloudPayloads);
          cachedMainsBatch = await db.pyqs
            .where("topicId")
            .equals(selectedTopicId)
            .filter(q => q.type === "PYQ_MAINS")
            .toArray();
        }
      }

      const matchedTopicObj = availableTopics.find(t => t.id === selectedTopicId);
      setActiveTopicName(matchedTopicObj ? matchedTopicObj.name : "Syllabus Module");
      
      setQuestionPool(cachedMainsBatch);
      setCurrentQuestionIdx(0);
      setHasLoadedPool(true);
    } catch (err) {
      console.error("Mains ledger initialization failed:", err);
      alert(`Could not compile target parameters: ${err.message}`);
    } finally {
      setFetchingQuestions(false);
    }
  };

  const handleOpenLogMarksDrawer = () => {
    setFeedbackText("");
    setSelfScores({ demand: 0, content: 0, analysis: 0, multi: 0, valueAdd: 0, presentation: 0 });
    setMentorScores({ demand: 0, content: 0, analysis: 0, multi: 0, valueAdd: 0, presentation: 0 });
    setIsLogMarksOpen(true);
  };

  /* --------------------------------------------------------------------------
   * TRACK 4 MAINS SUBMIT ACTION + SCORE BRACKET LOGIC ENGINE
   * -------------------------------------------------------------------------- */
  const handleSaveEvaluationLogData = async () => {
    if (!activeQuestionItem) return;
    setSavingLog(true);
    
    const timestamp = Date.now();
    const activeUserId = user?.uid || "local_user";
    const logId = `mains_log_${activeQuestionItem.id}_${timestamp}`;

    const maxQuestionMarks = Number(activeQuestionItem.maxMarks) || 15;
    const totalMentorObtainedSum = Object.values(mentorScores).reduce((a, b) => a + b, 0);

    const metricsPayload = {
      id: logId,
      userId: activeUserId,
      questionId: activeQuestionItem.id,
      timestamp: timestamp,
      maxQuestionMarks: maxQuestionMarks,
      feedback: feedbackText.trim(),
      selfEvaluation: selfScores,
      mentorEvaluation: mentorScores
    };

    try {
      await db.transaction("rw", [db.mains_log_marks, db.topic_intelligence], async () => {
        await db.mains_log_marks.put(metricsPayload);

        // --- EVALUATE MULTI-MARKER PERCENTAGE RATIO BRACKETS ---
        const obtainedPercentage = (totalMentorObtainedSum / maxQuestionMarks) * 100;
        let adjustment = 0;

        if (obtainedPercentage < 35) {
          adjustment = -4;
        } else if (obtainedPercentage >= 35 && obtainedPercentage < 45) {
          adjustment = 1;
        } else if (obtainedPercentage >= 45 && obtainedPercentage < 55) {
          adjustment = 2;
        } else if (obtainedPercentage >= 55 && obtainedPercentage < 70) {
          adjustment = 3;
        } else if (obtainedPercentage >= 70) {
          adjustment = 4;
        }

        const targetTopicId = activeQuestionItem.topicId || selectedTopicId;

        let topicIntel = await db.topic_intelligence
          .where("[userId+topicId]")
          .equals([activeUserId, targetTopicId])
          .first();

        if (!topicIntel) {
          topicIntel = await db.topic_intelligence
            .where("topicId")
            .equals(targetTopicId)
            .filter(r => r.userId === activeUserId)
            .first();
        }

        let baseConfidence = topicIntel ? (topicIntel.confidenceScore || 0) : 0;
        const finalizedConfidenceScore = Math.max(0, Math.min(100, baseConfidence + adjustment));

        if (topicIntel) {
          await db.topic_intelligence.update(topicIntel.id, {
            confidenceScore: finalizedConfidenceScore,
            updatedAt: new Date()
          });
        } else {
          await db.topic_intelligence.put({
            id: `intel_t_${Date.now()}_${targetTopicId}`,
            userId: activeUserId,
            topicId: targetTopicId,
            subjectId: activeQuestionItem.subjectId || selectedSubjectId || "",
            completionScore: 0,
            confidenceScore: finalizedConfidenceScore,
            updatedAt: new Date()
          });
        }
      });

      // 2. TRIGGER HOOK ONCE TRANSACTION HAS CONCLUDED NATIVELY
      const targetTopicId = activeQuestionItem.topicId || selectedTopicId;
      try {
        const { syncTopicIntelligence } = await import("../../syllabus/services/intelligenceSyncService");
        await syncTopicIntelligence(targetTopicId, activeUserId);
      } catch (syncErr) {
        console.warn("[Mains Intel Sync Deferred]", syncErr);
      }

      try {
        const { syncEngine } = await import("../../database/services/syncEngine");
        await syncEngine.pushLocalChangesToCloud(activeUserId);
      } catch (cloudErr) {
        console.warn("[Mains Sync] Cloud synchronization deferred out-of-band:", cloudErr);
      }

      alert("Success! Evaluation marks logged and committed safely into telemetry history.");
      setIsLogMarksOpen(false);
    } catch (err) {
      alert(`Could not save evaluation markers: ${err.message}`);
    } finally {
      setSavingLog(false);
    }
  };

  const computeDiagnosticMetricsAnalytics = (attemptLog) => {
    if (!attemptLog) return null;
    
    const bounds = getMaximumParameterWeights(attemptLog.maxQuestionMarks);
    const self = attemptLog.selfEvaluation || {};
    const mentor = attemptLog.mentorEvaluation || {};

    const totalSelfSum = Object.values(self).reduce((a, b) => a + b, 0);
    const totalMentorSum = Object.values(mentor).reduce((a, b) => a + b, 0);
    const fullMarks = attemptLog.maxQuestionMarks;

    const definitions = [
      { id: "demand", label: "Demand Fulfilled", score: mentor.demand, max: bounds.demand },
      { id: "content", label: "Content Quality", score: mentor.content, max: bounds.content },
      { id: "analysis", label: "Analysis & Depth", score: mentor.analysis, max: bounds.analysis },
      { id: "multi", label: "Multidimensionality", score: mentor.multi, max: bounds.multi },
      { id: "valueAdd", label: "Value Addition", score: mentor.valueAdd, max: bounds.valueAdd },
      { id: "presentation", label: "Presentation/Structure", score: mentor.presentation, max: bounds.presentation },
    ];

    const weaknessesList = [];
    definitions.forEach(d => {
      const ratio = d.score / d.max;
      if (ratio < 0.25) {
        weaknessesList.push({ name: d.label, tag: "EXTREMELY_WEAK", text: "Extremely Weak" });
      } else if (ratio < 0.50) {
        weaknessesList.push({ name: d.label, tag: "WEAK", text: "Weakness" });
      }
    });

    let qualityRatingStr = "Average Quality";
    const overallRatio = totalMentorSum / fullMarks;

    if (overallRatio < (1 / 3)) {
      qualityRatingStr = "Poor Quality Answer";
    } else if (overallRatio >= (1 / 3) && overallRatio < 0.50) {
      qualityRatingStr = "Average Quality";
    } else if (overallRatio >= 0.50 && overallRatio < 0.65) {
      qualityRatingStr = "Good Quality";
    } else if (overallRatio >= 0.65 && overallRatio < 0.80) {
      qualityRatingStr = "Very Good";
    } else if (overallRatio >= 0.80) {
      qualityRatingStr = "Exceptional Quality";
    }

    return {
      selfTotal: totalSelfSum,
      mentorTotal: totalMentorSum,
      weaknesses: weaknessesList,
      qualityRating: qualityRatingStr
    };
  };

  const analyticsProfile = activePastAttemptLog ? computeDiagnosticMetricsAnalytics(activePastAttemptLog) : null;

  return (
    <div className="space-y-6 text-left font-sans antialiased text-zinc-800">
      
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-xl font-black text-zinc-900 tracking-tight">Mains Evaluator Blueprint Workspace</h2>
        <p className="text-xs font-semibold text-slate-400 mt-0.5">Draft structural frames, organize high-yield keywords, and review previous UPSC parameters.</p>
      </div>

      <div className="bg-white border border-[#EBEFF8] rounded-[2rem] p-6 shadow-[0_8px_24px_rgba(235,240,248,0.35)] space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 border border-slate-200/60 p-4 rounded-2xl shadow-3xs">
          
          <div className="space-y-1.5">
            <label className="text-[13px] font-black text-black uppercase tracking-wide block">
              Select Paper
            </label>
            <select
              value={selectedPaper}
              onChange={(e) => setSelectedPaper(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-zinc-700 outline-none focus:border-indigo-500 shadow-3xs cursor-pointer"
            >
              <option value="">-- Choose GS Paper Blueprint --</option>
              <option value="GS1">GS Paper I (Culture, History, Geography, Society)</option>
              <option value="GS2">GS Paper II (Polity, Governance, Justice, IR)</option>
              <option value="GS3">GS Paper III (Economy, Tech, Bio, Security, Disaster)</option>
              <option value="GS4">GS Paper IV (Ethics, Integrity, Aptitude)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[13px] font-black text-black uppercase tracking-wide block">
              Select Subject
            </label>
            <select
              value={selectedSubjectId}
              disabled={!selectedPaper || availableSubjects.length === 0}
              onChange={(e) => setSelectedSubjectId(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-zinc-700 outline-none focus:border-indigo-500 shadow-3xs disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <option value="">-- Choose Core Subject Node --</option>
              {availableSubjects.map((sub) => (
                <option key={sub.id} value={sub.id}>{sub.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[13px] font-black text-black uppercase tracking-wide block">
              Select Topic
            </label>
            <select
              value={selectedTopicId}
              disabled={!selectedSubjectId || availableTopics.length === 0}
              onChange={(e) => setSelectedTopicId(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-zinc-700 outline-none focus:border-indigo-500 shadow-3xs disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <option value="">-- Choose Syllabus Chapter Alignment --</option>
              {availableTopics.map((top) => (
                <option key={top.id} value={top.id}>{top.name}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3 pt-2 flex justify-end">
            <button
              type="button"
              disabled={fetchingQuestions || !selectedPaper || !selectedSubjectId || !selectedTopicId}
              onClick={handleLoadMainsQuestions}
              className="w-full sm:w-auto px-6 py-2.5 bg-zinc-900 text-white hover:bg-zinc-800 disabled:bg-slate-100 disabled:text-zinc-400 font-black text-xs rounded-xl tracking-wide uppercase transition-all shadow-3xs cursor-pointer flex items-center justify-center gap-1.5"
            >
              {fetchingQuestions ? (
                <span className="flex items-center gap-2">
                  <RefreshCw size={13} className="animate-spin text-cyan-400" /> Syncing Cloud Repository...
                </span>
              ) : (
                "Load Questions"
              )}
            </button>
          </div>
        </div>

        {hasLoadedPool && (
          <div className="space-y-6 animate-in zoom-in-95 duration-200">
            {questionPool.length > 0 ? (
              <div className="space-y-6">
                
                <div className="border border-indigo-100 bg-gradient-to-r from-indigo-50/20 to-transparent rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-3xs">
                  <div>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-md tracking-wider">
                      Mains Core Queue Loaded
                    </span>
                    <h4 className="text-base font-black text-zinc-900 tracking-tight mt-1">{activeTopicName}</h4>
                  </div>
                  <div className="text-xs font-mono font-black text-indigo-600 bg-white border px-3 py-1.5 rounded-xl shadow-3xs shrink-0">
                    Question {currentQuestionIdx + 1} of {questionPool.length}
                  </div>
                </div>

                {activeQuestionItem && (
                  <div className="border border-slate-100 bg-slate-50/40 rounded-3xl p-6 md:p-8 space-y-6 shadow-3xs relative">
                    
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 pb-3">
                      <div className="flex flex-wrap gap-2 text-xs font-mono font-bold text-zinc-600">
                        {activeQuestionItem.year && (
                          <span className="bg-zinc-900 text-white px-2.5 py-0.5 rounded-md font-black">
                            UPSC {activeQuestionItem.year}
                          </span>
                        )}
                        {activeQuestionItem.maxMarks && (
                          <span className="bg-white border px-2 py-0.5 rounded-md shadow-3xs">
                            Marks: {activeQuestionItem.maxMarks}M
                          </span>
                        )}
                        {activeQuestionItem.wordCountAllowed && (
                          <span className="bg-white border px-2 py-0.5 rounded-md shadow-3xs">
                            Constraint: {activeQuestionItem.wordCountAllowed} Words
                          </span>
                        )}
                      </div>

                      <button
  type="button"
  onClick={async () => {
    if (selectedTopicId) {
      const activeUserId = user?.uid || "local_user";
      let topicIntel = await db.topic_intelligence
        .where("[userId+topicId]")
        .equals([activeUserId, selectedTopicId])
        .first();

      if (!topicIntel) {
        topicIntel = await db.topic_intelligence
          .where("topicId")
          .equals(selectedTopicId)
          .filter(r => r.userId === activeUserId)
          .first();
      }

      if (!topicIntel || topicIntel.completionScore < 100) {
        alert("🔒 Practice Blocked! You must finish studying all component nodes for this topic and hit 100% completion progress before recording written marks.");
        return;
      }
    }
    // Fire original drawer layout if valid
    handleOpenLogMarksDrawer();
  }}
  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs rounded-xl shadow-3xs uppercase tracking-wide transition-all flex items-center gap-1.5 cursor-pointer"
>
  <PenTool size={12} /> {activePastAttemptLog ? "Reattempt" : "Attempt"}
</button>
                    </div>

                    <div className="text-left pt-2">
                      <div 
                        className="text-lg font-bold text-zinc-900 leading-relaxed font-sans tracking-tight"
                        dangerouslySetInnerHTML={{ __html: activeQuestionItem.questionText }}
                      />
                    </div>

                    {activePastAttemptLog && analyticsProfile && (
                      <div className="mt-6 border-t border-zinc-200 pt-5 space-y-4 animate-in slide-in-from-top-3 duration-200">
                        <div className="flex items-center gap-2 text-zinc-900">
                          <Activity size={16} className="text-indigo-500" />
                          <h5 className="text-xs font-black uppercase tracking-wider text-zinc-500">Evaluation History Analytics Log</h5>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="bg-white border border-zinc-200 p-4 rounded-xl flex flex-col justify-between shadow-3xs">
                            <span className="text-[11px] font-bold text-zinc-500 uppercase">Self Evaluation Marks</span>
                            <span className="text-2xl font-black text-zinc-900 font-mono mt-2">{analyticsProfile.selfTotal} / {activePastAttemptLog.maxQuestionMarks}M</span>
                          </div>
                          
                          <div className="bg-white border border-zinc-200 p-4 rounded-xl flex flex-col justify-between shadow-3xs">
                            <span className="text-[11px] font-bold text-zinc-500 uppercase">Mentor Evaluation Marks</span>
                            <span className="text-2xl font-black text-indigo-600 font-mono mt-2">{analyticsProfile.mentorTotal} / {activePastAttemptLog.maxQuestionMarks}M</span>
                          </div>

                          <div className="bg-zinc-900 text-white p-4 rounded-xl flex flex-col justify-between shadow-sm">
                            <span className="text-[11px] font-bold text-zinc-400 uppercase">Overall Answer Quality</span>
                            <span className="text-base font-black text-cyan-400 tracking-tight mt-2 block uppercase">{analyticsProfile.qualityRating}</span>
                          </div>
                        </div>

                        {analyticsProfile.weaknesses.length > 0 ? (
                          <div className="bg-rose-50/60 border border-rose-200 rounded-xl p-4 space-y-2">
                            <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 block">Identified Structural Failures & Weaknesses</span>
                            <div className="flex flex-wrap gap-2">
                              {analyticsProfile.weaknesses.map((w, wIdx) => (
                                <span 
                                  key={wIdx}
                                  className={`text-[11px] font-black px-3 py-1 rounded-lg border flex items-center gap-1 shadow-3xs ${w.tag === "EXTREMELY_WEAK" ? "bg-rose-600 border-rose-600 text-white animate-pulse" : "bg-white border-rose-300 text-rose-700"}`}
                                >
                                  {w.tag === "EXTREMELY_WEAK" ? <ShieldAlert size={12} /> : <AlertTriangle size={12} />}
                                  {w.name}: {w.text}
                                </span>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="bg-emerald-50/50 border border-emerald-200 text-emerald-800 text-xs font-bold p-3 rounded-xl flex items-center gap-1.5">
                            <Sparkles size={14} className="text-emerald-500" /> All core answer writing metric components track above satisfactory baseline values.
                          </div>
                        )}

                        {activePastAttemptLog.feedback && (
                          <div className="bg-white border border-zinc-200 p-4 rounded-xl text-xs text-zinc-700 font-medium shadow-3xs leading-relaxed">
                            <span className="text-[10px] block font-black uppercase text-zinc-400 mb-1 tracking-wide">Latest Mentor Feedback / Remarks</span>
                            "{activePastAttemptLog.feedback}"
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <button
                    disabled={currentQuestionIdx === 0}
                    onClick={() => setCurrentQuestionIdx(p => Math.max(0, p - 1))}
                    className="px-5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-zinc-700 font-bold text-xs rounded-xl transition-all shadow-3xs disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
                  >
                    <ChevronLeft size={14} strokeWidth={2.5} /> Previous Question
                  </button>
                  
                  <button
                    disabled={currentQuestionIdx === questionPool.length - 1}
                    onClick={() => setCurrentQuestionIdx(p => Math.min(questionPool.length - 1, p + 1))}
                    className="px-6 py-2 bg-zinc-900 text-white hover:bg-zinc-800 font-black text-xs rounded-xl transition-all shadow-3xs disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
                  >
                    Next Question <ChevronRight size={14} strokeWidth={2.5} />
                  </button>
                </div>

              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-12 text-zinc-400 bg-slate-50/50 rounded-2xl border border-dashed">
                <HelpCircle size={28} className="text-zinc-300 stroke-1.5" />
                <p className="text-xs font-bold text-zinc-700 mt-2">No Matching Mains Data Profiles Mapped</p>
              </div>
            )}
          </div>
        )}

        {!hasLoadedPool && (
          <div className="flex flex-col items-center justify-center text-center py-14 text-zinc-400 space-y-2">
            <div className="text-3xl select-none">✍️</div>
            <p className="text-xs font-bold text-zinc-700">Mains Sandbox Context Blank</p>
          </div>
        )}
      </div>

      {isLogMarksOpen && activeQuestionItem && (
        <div className="fixed inset-0 z-[100000] bg-zinc-950/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-[2rem] w-full max-w-3xl p-6 md:p-8 shadow-[0_24px_60px_rgba(0,0,0,0.15)] space-y-5 relative my-8 text-left animate-in zoom-in-95 duration-200">
            
            <button type="button" onClick={() => setIsLogMarksOpen(false)} className="absolute top-5 right-5 p-1 text-zinc-400 hover:text-zinc-800 cursor-pointer">
              <X size={18} strokeWidth={2.5} />
            </button>

            <div className="border-b pb-3">
              <div className="flex items-center gap-2 text-indigo-600">
                <ClipboardSignature size={18} />
                <h3 className="text-base font-black uppercase tracking-tight">Answer Metrics Progression Logger</h3>
              </div>
              
              <div className="mt-3 bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-[11px] font-medium text-zinc-600 leading-relaxed max-h-[100px] overflow-y-auto select-all">
                <span className="text-[9px] font-black text-indigo-700 block uppercase mb-1">PROMPT FOR ANSWER WRITING EVALUATION (CLICK TO SELECT ALL):</span>
                "Evaluate my answer of this upsc question on following parameters and give me marks and shortcomings. Parameters are demand of question(if i fulfilled the demand asked in question maximum {activeMaxBounds.demand} marks for {activeQuestionItem.maxMarks} marker), content evaluation (if i have given factual accuracy, relevance of content maximum {activeMaxBounds.content}), analysis/explanation(if i fulfilled and gave enough depth and analysis maximum {activeMaxBounds.analysis}), multidimensionality(if multiple angles is included maximum {activeMaxBounds.multi}), Value addition (if i have given correct article, case, committee, examples, case study etc maximum {activeMaxBounds.valueAdd}), Presentation/balance/conclusion (if i have given good structuring, presentation, diagrams, flowchart, and conclusion maximum {activeMaxBounds.presentation}). And give me advice"
              </div>
            </div>

            <div className="space-y-4 overflow-y-auto max-h-[42vh] pr-1">
              <div className="grid grid-cols-12 gap-2 text-center text-[14px] font-black uppercase tracking-wider text-zinc-700 border-b pb-1 font-mono">
                <div className="col-span-6 text-left">Core Parameters Metric Criteria</div>
                <div className="col-span-3 text-indigo-600">Self Score</div>
                <div className="col-span-3 text-emerald-600">Mentor Score</div>
              </div>

              {[
                { key: "demand", label: "1. Demand of Question Fulfilled", max: activeMaxBounds.demand, step: "0.25" },
                { key: "content", label: "2. Content Accuracy & Relevance", max: activeMaxBounds.content, step: "0.25" },
                { key: "analysis", label: "3. Analysis & Explanatory Depth", max: activeMaxBounds.analysis, step: "0.25" },
                { key: "multi", label: "4. Multidimensionality & Framing Angles", max: activeMaxBounds.multi, step: "0.25" },
                { key: "valueAdd", label: "5. Value Addition (Article, Committee, Data)", max: activeMaxBounds.valueAdd, step: "0.25" },
                { key: "presentation", label: "6. Presentation (Headings, Diagrams, Conclusion)", max: activeMaxBounds.presentation, step: "0.25" }
              ].map((param) => (
                <div key={param.key} className="grid grid-cols-12 gap-2 items-center border-b border-zinc-100 pb-2 text-zinc-900 font-bold">
                  <div className="col-span-6 text-xs">
                    <span className="block font-black text-zinc-800">{param.label}</span>
                    <span className="text-[10px] font-mono text-zinc-400 font-medium">Max Limit Bounds: {param.max}M</span>
                  </div>
                  
                  <div className="col-span-3 px-1">
                    <input 
                      type="number"
                      min="0"
                      max={param.max}
                      step={param.step}
                      value={selfScores[param.key]}
                      onKeyDown={(e) => e.preventDefault()}
                      onChange={(e) => setSelfScores(p => ({ ...p, [param.key]: Number(e.target.value) }))}
                      className="w-full font-mono bg-indigo-50/50 focus:bg-white text-indigo-700 font-black border border-indigo-100 rounded-lg p-1.5 text-center outline-none focus:border-indigo-400 text-xs select-none"
                    />
                  </div>

                  <div className="col-span-3 px-1">
                    <input 
                      type="number"
                      min="0"
                      max={param.max}
                      step={param.step}
                      value={mentorScores[param.key]}
                      onKeyDown={(e) => e.preventDefault()}
                      onChange={(e) => setMentorScores(p => ({ ...p, [param.key]: Number(e.target.value) }))}
                      className="w-full font-mono bg-emerald-50/50 focus:bg-white text-emerald-700 font-black border border-emerald-100 rounded-lg p-1.5 text-center outline-none focus:border-emerald-400 text-xs select-none"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-1.5 pt-1">
              <label className="text-[11px] font-black uppercase text-zinc-400 tracking-wide block">Structured Feedback & Performance Remarks</label>
              <textarea
                rows={3}
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Log critical observations, structural bugs, or macro strategy directions here..."
                className="w-full bg-slate-50 focus:bg-white border border-slate-200 rounded-xl p-3 text-xs text-zinc-800 font-semibold outline-none focus:border-indigo-500 shadow-inner resize-none placeholder-zinc-400"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t">
              <button type="button" onClick={() => setIsLogMarksOpen(false)} className="px-4 py-2 border bg-white text-zinc-500 hover:text-zinc-800 rounded-xl text-xs font-bold transition-all cursor-pointer">Cancel</button>
              <button
                type="button"
                disabled={savingLog}
                onClick={handleSaveEvaluationLogData}
                className="px-6 py-2 bg-zinc-900 text-white hover:bg-zinc-800 rounded-xl text-xs font-black transition-all shadow-3xs flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
              >
                {savingLog ? <RefreshCw size={12} className="animate-spin text-cyan-400" /> : <Save size={12} />}
                Save Evaluation Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TestYourMains;