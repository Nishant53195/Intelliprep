// src/dashboard/sections/TestYourPrelims.jsx
import { useState, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../database/dexie";
import useLoginStore from "../../login/store/loginStore";
import AdminQuestionForm from "../../prelims/components/AdminQuestionForm";
import { prelimsQueryService } from "../../prelims/services/prelimsQueryService";
import { firestoreDb } from "../../firebase/firestore/config";
import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";
import { Play, BookOpen, Layers, RefreshCw, ChevronLeft, ChevronRight, CheckCircle2, LogOut, Award, Percent, XCircle, AlertCircle, RotateCcw, Sparkles, TrendingUp, CheckSquare, History } from "lucide-react";

function TestYourPrelims() {
  const user = useLoginStore((state) => state.user);
  const isAdmin = user?.email === "nishant53195@gmail.com";
  
  const [activeChip, setActiveChip] = useState("mcq"); // "mcq" or "pyq"
  const [subSection, setSubSection] = useState("take_test"); // "take_test", "coaching_series", or "admin_creator"
  
  // TRACK 1 & 3 CONFIGURATION LAYER STATES
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [selectedTopicId, setSelectedTopicId] = useState("");
  const [fetchingQuestions, setFetchingQuestions] = useState(false);
  const [questionPool, setQuestionPool] = useState([]); 
  const [activeTopicName, setActiveTopicName] = useState("");
  const [hasLoadedPool, setHasLoadedPool] = useState(false);
  
  // TRACK 2 CONFIGURATION LAYER STATES (Coaching Mock Test Engine)
  const [coachingBundles, setCoachingBundles] = useState([]); 
  const [selectedCoachingBundle, setSelectedCoachingBundle] = useState("");
  const [coachingTestsList, setCoachingTestsList] = useState([]); 
  const [loadingCoachingMetaData, setLoadingCoachingMetaData] = useState(false);

  // RUNTIME WORKSPACE PLAYLOAD CONFIGURATIONS
  const [finalSelectedQuestions, setFinalSelectedQuestions] = useState([]);
  const [testActive, setTestActive] = useState(false);
  const [showSummary, setShowSummary] = useState(false); 
  const [auditModeActive, setAuditModeActive] = useState(false); 

  // RETAKE RECOVERY LOGS MAPS
  const [lastAttemptData, setLastAttemptData] = useState(null);
  const [wrongQuestionsHistoryMap, setWrongQuestionsHistoryMap] = useState({}); 

  // LIVE INTERACTIVE PERFORMANCE TRACKERS
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswersMap, setSelectedAnswersMap] = useState({}); 
  const [questionAnsweredState, setQuestionAnsweredState] = useState({}); 
  const [errorClassificationsMap, setErrorClassificationsMap] = useState({}); 

  // SIMULATOR SCORE METRICS SUMMARY RECORD
  const [testReport, setTestReport] = useState({
    total: 0, attempted: 0, correct: 0, incorrect: 0, omitted: 0, score: 0, accuracy: 0
  });

  const errorCategories = [
    { id: "CONCEPT", label: "Concept Error (Not read)" },
    { id: "MEMORY", label: "Memory (Unable to recall)" },
    { id: "CARELESS", label: "Careless" },
    { id: "ELIMINATION", label: "Elimination Error" },
    { id: "GUESSING", label: "Guessing Error" }
  ];

  /* --------------------------------------------------------------------------
   * SECURITY HOOKS LAYER BLOCKERS
   * -------------------------------------------------------------------------- */
  useEffect(() => {
    if (!testActive) return;
    const handleBeforeUnload = (e) => {
      const msg = "An active simulator run is executing. Leaving or refreshing will erase performance inputs.";
      e.preventDefault(); e.returnValue = msg; return msg;
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [testActive]);

  /* --------------------------------------------------------------------------
   * DEXIE LIVE QUERIES FOR HISTORY & LIST RESOLUTIONS
   * -------------------------------------------------------------------------- */
  const subjectsList = useLiveQuery(async () => {
    const allSubjects = await db.subjects.toArray();
    return allSubjects.filter(subj => subj.type?.toUpperCase() !== "OPTIONAL" && subj.paper?.toUpperCase() !== "OPTIONAL");
  }, []);

  const topicsList = useLiveQuery(async () => {
    if (!selectedSubjectId) return [];
    return await db.topics.where("subjectId").equals(selectedSubjectId).toArray();
  }, [selectedSubjectId]);

  const localCoachingHistoryRecords = useLiveQuery(async () => {
    return await db.coaching_test_prelims.toArray();
  }, [testActive, showSummary]);

  /* --------------------------------------------------------------------------
   * FIRESTORE DYNAMIC INVENTORY FETCH (Coaching Catalog Handshake)
   * -------------------------------------------------------------------------- */
  useEffect(() => {
    if (subSection !== "coaching_series") return;

    const harvestCoachingMetadataFromCloud = async () => {
      setLoadingCoachingMetaData(true);
      try {
        const qBankRef = collection(firestoreDb, "master_questions_bank");
        const coachingQuery = query(qBankRef, where("type", "==", "COACHING_TEST"));
        const snapshot = await getDocs(coachingQuery);
        
        const instancesList = [];
        snapshot.forEach(doc => {
          const item = doc.data();
          if (item.coachingName) {
            instancesList.push(item.coachingName);
          }
        });
        
        const uniqueBundles = Array.from(new Set(instancesList)).sort();
        setCoachingBundles(uniqueBundles);
      } catch (err) {
        console.error("Failed compiling dynamic coaching collections:", err);
      } finally {
        setLoadingCoachingMetaData(false);
      }
    };

    harvestCoachingMetadataFromCloud();
  }, [subSection]);

  const handleSelectCoachingBundleCard = async (bundleName) => {
    setSelectedCoachingBundle(bundleName);
    setLoadingCoachingMetaData(true);
    try {
      const qBankRef = collection(firestoreDb, "master_questions_bank");
      const testQuery = query(
        qBankRef, 
        where("type", "==", "COACHING_TEST"),
        where("coachingName", "==", bundleName)
      );
      const snapshot = await getDocs(testQuery);
      
      const testsMap = {};
      snapshot.forEach(doc => {
        const data = doc.data();
        if (data.testName) {
          if (!testsMap[data.testName]) {
            testsMap[data.testName] = {
              testName: data.testName,
              testType: data.testType || "SUBJECT_TEST",
              questions: []
            };
          }
          testsMap[data.testName].questions.push({ id: doc.id, ...data });
        }
      });
      
      setCoachingTestsList(Object.values(testsMap));
    } catch (err) {
      alert(`Could not compile target provider catalog: ${err.message}`);
    } finally {
      setLoadingCoachingMetaData(false);
    }
  };

  /* --------------------------------------------------------------------------
   * TRACK 1 & 3 LOADING LIFECYCLE HANDSHAKE (MCQ & PYQ Selector Engine)
   * -------------------------------------------------------------------------- */
  const handleLoadSandboxPool = async () => {
    if (!selectedSubjectId || !selectedTopicId) {
      alert("Please specify parameters before launching."); return;
    }
    setFetchingQuestions(true); setHasLoadedPool(false); setShowSummary(false); setLastAttemptData(null); setWrongQuestionsHistoryMap({});
    const activeUserId = user?.uid || "local_user";
    const targetTableStr = activeChip === "pyq" ? "topic_pyq_prelims" : "topic_test_prelims";
    const recordId = `${activeChip}_prac_${selectedSubjectId}_${selectedTopicId}`;

    try {
      let existingRegistryDoc = await db[targetTableStr].get(recordId);

      if (!existingRegistryDoc) {
        const cloudDocRef = doc(firestoreDb, "users", activeUserId, targetTableStr, recordId);
        const cloudSnapshot = await getDoc(cloudDocRef);
        if (cloudSnapshot.exists()) {
          const cloudData = cloudSnapshot.data();
          await db[targetTableStr].put(cloudData);
          existingRegistryDoc = cloudData;
        }
      }

      const fetchedBatch = await prelimsQueryService.fetchSandboxQuestions({
        subjectId: selectedSubjectId, topicId: selectedTopicId, isPyqMode: activeChip === "pyq"
      });
      if (!fetchedBatch || fetchedBatch.length === 0) {
        alert("No records stored matching current schema constraints."); setFetchingQuestions(false); return;
      }

      if (existingRegistryDoc && existingRegistryDoc.Attempts?.length > 0) {
        const lastAttempt = existingRegistryDoc.Attempts[existingRegistryDoc.Attempts.length - 1];
        setLastAttemptData(lastAttempt);
        const tempWrongMap = {};
        if (lastAttempt.wrongQuestion) {
          lastAttempt.wrongQuestion.forEach(wq => { tempWrongMap[wq.questionId] = true; });
        }
        setWrongQuestionsHistoryMap(tempWrongMap);
      } else if (!existingRegistryDoc) {
        await db[targetTableStr].put({
          id: recordId, userId: activeUserId, subjectId: selectedSubjectId, topicId: selectedTopicId,
          maximumMarks: fetchedBatch.length * 2, totalQuestion: fetchedBatch.length, Attempts: []
        });
      }
      const selectedTopicMetadata = await db.topics.get(selectedTopicId);
      setQuestionPool(fetchedBatch);
      setFinalSelectedQuestions(fetchedBatch); // Fixed Bug: Prevents simulator from throwing fatal rendering exception
      setActiveTopicName(selectedTopicMetadata ? selectedTopicMetadata.name : "Selected Module");
      setHasLoadedPool(true);
    } catch (err) {
      alert(`Initialization run error: ${err.message}`);
    } finally { setFetchingQuestions(false); }
  };

  /* --------------------------------------------------------------------------
   * TRACK 2 MOCK TEST LOADER HANDSHAKE
   * -------------------------------------------------------------------------- */
  const handleLoadCoachingTestExecutionWorkspace = async (testItem) => {
    setFetchingQuestions(true); setLastAttemptData(null); setWrongQuestionsHistoryMap({});
    const activeUserId = user?.uid || "local_user";
    const recordId = `coaching_${selectedCoachingBundle.toLowerCase().replace(/\s+/g, '_')}_${testItem.testName.toLowerCase().replace(/\s+/g, '_')}`;
    
    try {
      let existingRecord = await db.coaching_test_prelims.get(recordId);

      if (!existingRecord) {
        const cloudDocRef = doc(firestoreDb, "users", activeUserId, "coaching_test_prelims", recordId);
        const cloudSnapshot = await getDoc(cloudDocRef);
        if (cloudSnapshot.exists()) {
          const cloudData = cloudSnapshot.data();
          await db.coaching_test_prelims.put(cloudData);
          existingRecord = cloudData;
        }
      }

      if (existingRecord && existingRecord.Attempts?.length > 0) {
        const lastAttempt = existingRecord.Attempts[existingRecord.Attempts.length - 1];
        setLastAttemptData(lastAttempt);
        const tempWrongMap = {};
        if (lastAttempt.wrongQuestion) {
          lastAttempt.wrongQuestion.forEach(wq => { tempWrongMap[wq.questionId] = true; });
        }
        setWrongQuestionsHistoryMap(tempWrongMap);
      } else if (!existingRecord) {
        await db.coaching_test_prelims.put({
          id: recordId, userId: activeUserId, coachingName: selectedCoachingBundle, testName: testItem.testName,
          testType: testItem.testType, subjectId: [], maximumMarks: testItem.questions.length * 2,
          totalQuestion: testItem.questions.length, Attempts: []
        });
      }

      setActiveTopicName(`${selectedCoachingBundle} - ${testItem.testName}`);
      setFinalSelectedQuestions(testItem.questions);
      setCurrentQuestionIdx(0);
      setSelectedAnswersMap({});
      setQuestionAnsweredState({});
      setErrorClassificationsMap({});
      setShowSummary(false);
      setAuditModeActive(false);
      setTestActive(true);
    } catch (err) {
      alert(`Failed preparing simulator metrics: ${err.message}`);
    } finally { setFetchingQuestions(false); }
  };

  /* --------------------------------------------------------------------------
   * INTERACTIVE OPTION MUTATION LIFECYCLES
   * -------------------------------------------------------------------------- */
  const handleOptionToggleSelect = (questionItem, optionIdx) => {
    if (subSection === "coaching_series") {
      setSelectedAnswersMap(prev => {
        const currentSelection = prev[questionItem.id];
        if (currentSelection === optionIdx) {
          const nextAnswers = { ...prev };
          delete nextAnswers[questionItem.id]; // Fixed Bug: Prevent reference parsing type crashes
          return nextAnswers;
        } else {
          return { ...prev, [questionItem.id]: optionIdx };
        }
      });
      setQuestionAnsweredState(prev => ({ ...prev, [questionItem.id]: true }));
    } else {
      if (questionAnsweredState[questionItem.id]) return; 
      setSelectedAnswersMap(prev => ({ ...prev, [questionItem.id]: optionIdx }));
      setQuestionAnsweredState(prev => ({ ...prev, [questionItem.id]: true }));
    }
  };

  const handleLogErrorClassification = (questionId, classificationId) => {
    setErrorClassificationsMap(prev => ({ ...prev, [questionId]: classificationId }));
  };

  const handlePreSubmitEvaluationRollup = () => {
    const totalCount = finalSelectedQuestions.length;
    const answeredCount = Object.keys(selectedAnswersMap).length;
    
    let correctCount = 0;
    let incorrectCount = 0;

    finalSelectedQuestions.forEach((q) => {
      const choice = selectedAnswersMap[q.id];
      if (choice === undefined) return;
      if (Number(choice) === Number(q.correctAnswerIndex)) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    });

    const calculatedScore = (correctCount * 2) - (incorrectCount * (2 / 3));
    const accuracyPercentage = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0; // Fixed Bug: Base precision on metrics handled rather than aggregate pool
    const runtimeReportObj = {
      total: totalCount, attempted: answeredCount, correct: correctCount, incorrect: incorrectCount, omitted: totalCount - answeredCount,
      score: Number(calculatedScore.toFixed(2)), accuracy: accuracyPercentage
    };

    setTestReport(runtimeReportObj);

    if (subSection === "coaching_series" && incorrectCount > 0) {
      setAuditModeActive(true);
    } else {
      executeFinalDatabaseCommitTransaction(runtimeReportObj);
    }
  };

  /* --------------------------------------------------------------------------
   * CENTRAL COMMIT TRANSACTION PASS + SCORING SCALE RULE INTEGRATOR
   * -------------------------------------------------------------------------- */
  const executeFinalDatabaseCommitTransaction = async (finalReport) => {
    const timestamp = Date.now();
    const activeUserId = user?.uid || "local_user";
    
    let targetTableStr = "";
    let recordId = "";

    if (subSection === "coaching_series") {
      targetTableStr = "coaching_test_prelims";
      recordId = `coaching_${selectedCoachingBundle.toLowerCase().replace(/\s+/g, '_')}_${activeTopicName.split(' - ')[1].toLowerCase().replace(/\s+/g, '_')}`;
    } else {
      targetTableStr = activeChip === "pyq" ? "topic_pyq_prelims" : "topic_test_prelims";
      recordId = `${activeChip}_prac_${selectedSubjectId}_${selectedTopicId}`;
    }

    const wrongQuestionBatch = [];
    const subjectsInvolved = new Set();
    const topicConfidenceAdjustmentsMap = {};

    finalSelectedQuestions.forEach((q) => {
      const choice = selectedAnswersMap[q.id];
      if (choice === undefined) return;
      if (q.subjectId) subjectsInvolved.add(q.subjectId);

      const targetTopicIdRef = q.topicId || selectedTopicId;
      if (!targetTopicIdRef) return;

      if (!topicConfidenceAdjustmentsMap[targetTopicIdRef]) {
        topicConfidenceAdjustmentsMap[targetTopicIdRef] = { correct: 0, wrong: 0, subjectId: q.subjectId || selectedSubjectId || "" };
      }

      const isCorrectKey = Number(choice) === Number(q.correctAnswerIndex);
      if (isCorrectKey) {
        topicConfidenceAdjustmentsMap[targetTopicIdRef].correct++;
      } else {
        topicConfidenceAdjustmentsMap[targetTopicIdRef].wrong++;
        wrongQuestionBatch.push({
          questionId: q.id,
          subtopicId: q.subtopicId || "",
          errorType: errorClassificationsMap[q.id] || "UNCLASSIFIED"
        });
      }
    });

    try {
      await db.transaction("rw", [db[targetTableStr], db.weak_topics, db.topic_intelligence], async () => {
        const existingRecord = await db[targetTableStr].get(recordId);

        const newAttempt = {
          attemptId: `att_${timestamp}`,
          attemptDate: timestamp,
          attemptedCount: finalReport.attempted,
          correctCount: finalReport.correct,
          wrongCount: finalReport.incorrect,
          obtainedMarks: finalReport.score,
          accuracy: finalReport.accuracy,
          wrongQuestion: wrongQuestionBatch
        };

        const updatedAttempts = existingRecord?.Attempts ? [...existingRecord.Attempts, newAttempt] : [newAttempt];

        if (subSection === "coaching_series") {
          await db.coaching_test_prelims.put({
            id: recordId, userId: activeUserId, coachingName: selectedCoachingBundle,
            testName: activeTopicName.split(' - ')[1], testType: existingRecord?.testType || "SUBJECT_TEST",
            subjectId: Array.from(subjectsInvolved), maximumMarks: finalReport.total * 2,
            totalQuestion: finalReport.total, Attempts: updatedAttempts
          });
        } else {
          await db[targetTableStr].put({
            id: recordId, userId: activeUserId, subjectId: selectedSubjectId, topicId: selectedTopicId,
            maximumMarks: finalReport.total * 2, totalQuestion: finalReport.total, Attempts: updatedAttempts
          });
        }

        for (const [targetTopicIdKey, counts] of Object.entries(topicConfidenceAdjustmentsMap)) {
          let topicIntel = await db.topic_intelligence
            .where("[userId+topicId]")
            .equals([activeUserId, targetTopicIdKey])
            .first();

          if (!topicIntel) {
            topicIntel = await db.topic_intelligence
              .where("topicId")
              .equals(targetTopicIdKey)
              .filter(r => r.userId === activeUserId)
              .first();
          }

          let baseConfidence = topicIntel ? (topicIntel.confidenceScore || 0) : 0;
          let netAdjustmentValue = 0;

          if (subSection === "coaching_series") {
            netAdjustmentValue = (counts.correct * 1) + (counts.wrong * -2);
          } else if (activeChip === "pyq") {
            netAdjustmentValue = (counts.correct * 2) + (counts.wrong * -3);
          } else {
            netAdjustmentValue = (counts.correct * 1) + (counts.wrong * -2);
          }

          const finalizedConfidenceScore = Math.max(0, Math.min(100, baseConfidence + netAdjustmentValue));

          if (topicIntel) {
            await db.topic_intelligence.update(topicIntel.id, {
              confidenceScore: finalizedConfidenceScore,
              updatedAt: new Date()
            });
          } else {
            await db.topic_intelligence.put({
              id: `intel_t_${Date.now()}_${targetTopicIdKey}`,
              userId: activeUserId,
              topicId: targetTopicIdKey,
              subjectId: counts.subjectId,
              completionScore: 0,
              confidenceScore: finalizedConfidenceScore,
              updatedAt: new Date()
            });
          }
        }

        for (const wq of wrongQuestionBatch) {
          const matchingQuestionItem = finalSelectedQuestions.find(f => f.id === wq.questionId);
          if (!matchingQuestionItem || !matchingQuestionItem.topicId) continue;

          const existingWeakness = await db.weak_topics.get({ userId: activeUserId, topicId: matchingQuestionItem.topicId });
          
          let currentMcqErrors = existingWeakness?.mcqErrorCount || 0;
          let currentPyqErrors = existingWeakness?.pyqErrorCount || 0;
          let currentTestErrors = existingWeakness?.testErrorCount || 0;

          if (subSection === "coaching_series") {
            currentTestErrors++;
          } else if (activeChip === "pyq") {
            currentPyqErrors++;
          } else {
            currentMcqErrors++;
          }

          await db.weak_topics.put({
            id: existingWeakness?.id || `weak_node_${matchingQuestionItem.topicId}`,
            userId: activeUserId,
            subjectId: matchingQuestionItem.subjectId || selectedSubjectId,
            topicId: matchingQuestionItem.topicId,
            pyqErrorCount: currentPyqErrors,
            mcqErrorCount: currentMcqErrors,
            testErrorCount: currentTestErrors,
            state: "ACTIVE",
            lastReviewedAt: timestamp,
            nextReviewAt: timestamp + (3 * 24 * 60 * 60 * 1000)
          });
        }
      });

      try {
        const { syncTopicIntelligence } = await import("../../syllabus/services/intelligenceSyncService");
        for (const targetTopicIdKey of Object.keys(topicConfidenceAdjustmentsMap)) {
          await syncTopicIntelligence(targetTopicIdKey, activeUserId);
        }
      } catch (syncErr) {
        console.warn("[Sync Hook Deferred]", syncErr);
      }

      setTestActive(false);
      setAuditModeActive(false);
      setShowSummary(true);
    } catch (err) {
      console.error("Critical submission telemetry validation failed:", err);
      alert("Error committing telemetry logs.");
    }
  };

  const handleForcedExitCancelTest = () => {
    if (window.confirm("Abort session entirely? Performance matrices will be discarded.")) {
      setTestActive(false); setAuditModeActive(false); setQuestionPool([]); setHasLoadedPool(false); setShowSummary(false);
    }
  };

  const activeQuestionItem = finalSelectedQuestions[currentQuestionIdx] || null;
  const auditQuestionsList = finalSelectedQuestions.filter(q => selectedAnswersMap[q.id] !== undefined && Number(selectedAnswersMap[q.id]) !== Number(q.correctAnswerIndex));
  const totalAuditItemsRemaining = auditQuestionsList.filter(q => !errorClassificationsMap[q.id]).length;

  return (
    <div className="space-y-5 text-left font-sans antialiased text-zinc-800">
      
      {!testActive && (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-xl font-black text-zinc-900 tracking-tight">Test Your Prelims Preparation</h2>
            </div>
            
            <div className="flex bg-slate-100 border border-slate-200 p-1 rounded-xl shrink-0 shadow-3xs">
              <button
                type="button"
                onClick={() => { setActiveChip("mcq"); setSubSection("take_test"); setSelectedCoachingBundle(""); }}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${activeChip === "mcq" && subSection !== "admin_creator" ? "bg-white text-indigo-600 shadow-3xs font-black" : "text-zinc-500 hover:text-zinc-800"}`}
              >
                MCQ Engine
              </button>
              <button
                type="button"
                onClick={() => { setActiveChip("pyq"); setSubSection("take_test"); setSelectedCoachingBundle(""); }}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${activeChip === "pyq" && subSection !== "admin_creator" ? "bg-white text-indigo-600 shadow-3xs font-black" : "text-zinc-500 hover:text-zinc-800"}`}
              >
                PYQ Records
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/60 pb-2.5">
            <div className="flex gap-1.5 overflow-x-auto scrollbar-none">
              {activeChip === "mcq" ? (
                <>
                  <button
                    type="button"
                    onClick={() => setSubSection("take_test")}
                    className={`text-xs px-4 py-1.5 font-black rounded-xl border transition-all cursor-pointer ${subSection === "take_test" ? "bg-[#E8EEFF] border-transparent text-indigo-600 shadow-3xs" : "bg-white border-slate-200 text-zinc-500 hover:text-zinc-800"}`}
                  >
                    Topic Wise MCQ Practice
                  </button>
                  <button
                    type="button"
                    onClick={() => { setSubSection("coaching_series"); setSelectedCoachingBundle(""); }}
                    className={`text-xs px-4 py-1.5 font-black rounded-xl border transition-all cursor-pointer ${subSection === "coaching_series" ? "bg-[#E8EEFF] border-transparent text-indigo-600 shadow-3xs" : "bg-white border-slate-200 text-zinc-500 hover:text-zinc-800"}`}
                  >
                    Coaching Test Series
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setSubSection("take_test")}
                  className="text-xs px-4 py-1.5 font-black rounded-xl border bg-[#E8EEFF] border-transparent text-indigo-600 shadow-3xs cursor-pointer"
                >
                  Topic Wise PYQ Practice
                </button>
              )}
            </div>
            
            {isAdmin && (
              <button
                type="button"
                onClick={() => setSubSection(subSection === "admin_creator" ? "take_test" : "admin_creator")}
                className={`px-4 py-1.5 text-xs font-black rounded-xl border transition-all shadow-3xs flex items-center gap-1 cursor-pointer ${subSection === "admin_creator" ? "bg-amber-50 border-amber-200 text-amber-700 font-black" : "bg-white border-amber-200 text-amber-600 hover:bg-amber-50/50"}`}
              >
                {subSection === "admin_creator" ? "Exit Question Creator" : "Add Questions (Admin)"}
              </button>
            )}
          </div>
        </>
      )}

      {/* MAIN DISPLAY STAGING PORT WRAPPER */}
      {!testActive ? (
        <div className="bg-white border border-[#EBEFF8] rounded-[2.2rem] p-6 shadow-[0_8px_24px_rgba(235,240,248,0.35)] min-h-[22rem]">
          {subSection === "admin_creator" && isAdmin ? (
            <AdminQuestionForm onComplete={() => setSubSection("take_test")} />
          ) : subSection === "coaching_series" && activeChip === "mcq" ? (
            
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {!selectedCoachingBundle && (
                <>
                  <div>
                    <h3 className="text-base font-black text-zinc-900 tracking-tight">Select a Test Series</h3>
                  </div>

                  {loadingCoachingMetaData && (
                    <div className="flex items-center gap-2 justify-center py-10 text-xs font-bold text-zinc-400">
                      <RefreshCw size={14} className="animate-spin text-indigo-500" /> Catalog indexing synchronized out-of-band...
                    </div>
                  )}

                  {!loadingCoachingMetaData && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {coachingBundles.map((bundle) => (
                        <div
                          key={bundle}
                          onClick={() => handleSelectCoachingBundleCard(bundle)}
                          className="border-2 border-slate-100 hover:border-indigo-400 bg-slate-50/50 hover:bg-white p-5 rounded-2xl cursor-pointer transition-all shadow-3xs group flex flex-col justify-between"
                        >
                          <div className="text-xl">📚</div>
                          <div className="mt-4">
                            <h2 className="text-xl font-black text-zinc-900 tracking-tight group-hover:text-blue-600">{bundle}</h2>
                            <span className="text-[12px] uppercase font-mono font-bold text-blue-400 block mt-1">Test Bundle</span>
                          </div>
                        </div>
                      ))}
                      {coachingBundles.length === 0 && (
                        <div className="sm:col-span-3 text-center py-10 text-xs font-bold text-zinc-400 bg-slate-50 rounded-2xl border border-dashed">
                          No active simulator catalogs seed values are loaded inside the cloud records. Click Add Questions (Admin).
                        </div>
                      )}
                    </div>
                  )}

                  {localCoachingHistoryRecords && localCoachingHistoryRecords.length > 0 && !loadingCoachingMetaData && (
                    <div className="mt-8 border-t border-slate-150 pt-6 space-y-4 animate-in fade-in duration-300">
                      <div className="flex items-center gap-2 text-zinc-900">
                        <History size={18} className="text-indigo-500" />
                        <h3 className="text-base font-black tracking-tight">Coaching Mock Test History</h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {localCoachingHistoryRecords.map((record) => {
                          if (!record.Attempts || record.Attempts.length === 0) return null;
                          const latestRun = record.Attempts[record.Attempts.length - 1];

                          return (
                            <div key={record.id} className="border border-slate-200 bg-white rounded-3xl p-6 shadow-3xs flex flex-col justify-between space-y-4 hover:shadow-2xs transition-all relative">
                              <div className="space-y-1">
                                <div className="flex items-center justify-between">
                                  <span className="text-[11px] font-black font-mono uppercase bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg tracking-wide border border-indigo-100">
                                    {record.coachingName}
                                  </span>
                                  <span className="text-[13px] font-black text-zinc-700 font-mono tracking-wide">
                                    {new Date(latestRun.attemptDate).toLocaleDateString()}
                                  </span>
                                </div>
                                <h4 className="text-xl font-black text-zinc-900 tracking-tight pt-2 leading-tight">
                                  {record.testName}
                                </h4>
                              </div>

                              <div className="border border-zinc-900/90 rounded-2xl p-4 bg-white shadow-3xs space-y-3">
                                <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-left font-sans">
                                  <div className="space-y-0.5">
                                    <span className="text-[12px] text-zinc-500 font-bold block">Total Questions</span>
                                    <span className="text-base font-black text-zinc-900 font-mono leading-none">{record.totalQuestion}</span>
                                  </div>
                                  <div className="space-y-0.5">
                                    <span className="text-[12px] text-zinc-500 font-bold block">Attempted</span>
                                    <span className="text-base font-black text-blue-600 font-mono leading-none">{latestRun.attemptedCount}</span>
                                  </div>
                                  <div className="space-y-0.5">
                                    <span className="text-[12px] text-zinc-500 font-bold block">Correct Keys</span>
                                    <span className="text-base font-black text-emerald-600 font-mono leading-none">+{latestRun.correctCount}</span>
                                  </div>
                                  <div className="space-y-0.5">
                                    <span className="text-[12px] text-zinc-500 font-bold block">Incorrect Keys</span>
                                    <span className="text-base font-black text-rose-600 font-mono leading-none">-{latestRun.wrongCount}</span>
                                  </div>
                                </div>

                                <div className="pt-3 border-t border-zinc-200 flex justify-between items-center font-sans">
                                  <div>
                                    <span className="text-[11px] text-zinc-500 block font-black uppercase tracking-wide leading-none">SCORE ACCUMULATED</span>
                                    <span className="text-lg font-black text-zinc-900 font-mono block mt-1">
                                      {latestRun.obtainedMarks}/{record.maximumMarks}M
                                    </span>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-[11px] text-zinc-500 block font-black uppercase tracking-wide leading-none">ACCURACY</span>
                                    <span className="text-lg font-black text-blue-600 font-mono block mt-1">{latestRun.accuracy}%</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </>
              )}

              {selectedCoachingBundle && !loadingCoachingMetaData && (
                <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-200">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <button
                      type="button"
                      onClick={() => setSelectedCoachingBundle("")}
                      className="text-xs font-black text-indigo-600 flex items-center gap-1 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {localCoachingHistoryRecords && localCoachingHistoryRecords.length > 0 && !loadingCoachingMetaData && (
                      coachingTestsList.map((test) => {
                        const recordId = `coaching_${selectedCoachingBundle.toLowerCase().replace(/\s+/g, '_')}_${test.testName.toLowerCase().replace(/\s+/g, '_')}`;
                        const matchRecord = localCoachingHistoryRecords?.find(r => r.id === recordId);
                        const pastAttempt = matchRecord?.Attempts?.length > 0 ? matchRecord.Attempts[matchRecord.Attempts.length - 1] : null;

                        return (
                          <div
                            key={test.testName}
                            className="border border-blue-300 bg-white p-5 rounded-2xl shadow-3xs flex flex-col justify-between gap-4 hover:shadow-2xs transition-all"
                          >
                            <div className="space-y-1">
                              <span className="text-[11px] font-black font-mono px-2 py-0.5 bg-green-100 text-green-800 rounded uppercase tracking-wider">
                                {test.testType.replace(/_/g, ' ')}
                              </span>
                             
                              <h2 className="text-xl font-black text-zinc-900 tracking-tight pt-1">{test.testName}</h2>
                              <p className="text-[14px] text-blue-600 font-mono font-bold">{test.questions.length} Questions</p>
                              
                              {pastAttempt && (
                                <div className="mt-2 text-xs bg-zinc-50 border p-3 rounded-xl flex flex-col gap-y-1 text-zinc-700 font-black shadow-3xs">
                                  <span>Accuracy: <strong className="text-blue-600">{pastAttempt.accuracy}%</strong></span>
                                  <span>Score: <strong className="text-zinc-900 font-mono">{pastAttempt.obtainedMarks}/{test.questions.length * 2}M</strong></span>
                                  <span>Correct: <strong className="text-emerald-600">+{pastAttempt.correctCount}</strong></span>
                                  <span>Wrong: <strong className="text-rose-600">-{pastAttempt.wrongCount}</strong></span>
                                </div>
                              )}
                            </div>
                            
                            <button
                              type="button"
                              onClick={() => handleLoadCoachingTestExecutionWorkspace(test)}
                              className={`px-4 py-2 text-white font-black text-xs rounded-xl uppercase tracking-wider transition-all cursor-pointer shadow-3xs shrink-0 ${pastAttempt ? "bg-indigo-600 hover:bg-indigo-700" : "bg-zinc-900 hover:bg-blue-800"}`}
                            >
                              {pastAttempt ? "Reattempt" : "Start Test"}
                            </button>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>

          ) : showSummary ? (
            <div className="space-y-6 text-left animate-in zoom-in-95 duration-200">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <div className="h-10 w-10 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-2xl flex items-center justify-center text-lg">🏆</div>
                <div>
                  <h3 className="text-base font-black text-zinc-900 leading-none">Simulation Matrix Evaluated</h3>
                  <p className="text-xs font-medium text-zinc-500 mt-1 uppercase tracking-wider font-mono">Topic Batch: {activeTopicName}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex flex-col justify-between">
                  <span className="text-[10px] font-black uppercase text-zinc-500 tracking-wider flex items-center gap-1">Total Items</span>
                  <span className="text-2xl font-black text-zinc-900 leading-none mt-3 font-mono">{testReport.total}</span>
                </div>
                <div className="bg-indigo-50/40 border border-indigo-100 p-4 rounded-2xl flex flex-col justify-between">
                  <span className="text-[10px] font-black uppercase text-indigo-500 tracking-wider flex items-center gap-1">Attempted</span>
                  <span className="text-2xl font-black text-indigo-700 leading-none mt-3 font-mono">{testReport.attempted}</span>
                </div>
                <div className="bg-emerald-50/50 border border-emerald-200 p-4 rounded-2xl flex flex-col justify-between">
                  <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wider flex items-center gap-1">Correct</span>
                  <span className="text-2xl font-black text-emerald-600 leading-none mt-3 font-mono">+{testReport.correct}</span>
                </div>
                <div className="bg-rose-50/50 border border-rose-200 p-4 rounded-2xl flex flex-col justify-between">
                  <span className="text-[10px] font-black uppercase text-rose-500 tracking-wider flex items-center gap-1">Incorrect</span>
                  <span className="text-2xl font-black text-rose-500 leading-none mt-3 font-mono">-{testReport.incorrect}</span>
                </div>
                <div className="col-span-2 lg:col-span-1 bg-gradient-to-br from-slate-900 to-indigo-950 p-4 rounded-2xl flex flex-col justify-between shadow-2xs text-white">
                  <span className="text-[10px] font-black uppercase text-indigo-300 tracking-wider flex items-center gap-1">Accuracy</span>
                  <span className="text-2xl font-black text-cyan-400 leading-none mt-3 font-mono">{testReport.accuracy}%</span>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-black text-zinc-900 tracking-tight">Cumulative UPSC Score Calculation</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed font-medium">Calculated via standard GS parameters: +2.00 for Correct, -0.67 for Incorrect. Omitted items are score-neutral.</p>
                </div>
                <div className="bg-white border border-slate-200 px-6 py-3.5 rounded-xl text-center shadow-3xs shrink-0 flex flex-col justify-center">
                  <span className="text-[10px] font-black uppercase text-zinc-500 tracking-wider block">Total Marks Earned</span>
                  <span className={`text-3xl font-black block mt-0.5 font-mono leading-none ${testReport.score >= 0 ? "text-indigo-600" : "text-rose-600"}`}>{testReport.score}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={subSection === "coaching_series" ? () => setSubSection("coaching_series") : handleLoadSandboxPool}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-xl uppercase tracking-wider transition-all shadow-3xs flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw size={13} /> Return to Selector Workspace
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in duration-200 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 border border-slate-200/60 p-4 rounded-2xl shadow-3xs">
                <div className="space-y-1.5">
                  <label className="text-[12px] font-black text-zinc-700 uppercase tracking-wide flex items-center gap-1">
                    <BookOpen size={16} className="text-indigo-500" /> 1. Select Subject
                  </label>
                  <select
                    value={selectedSubjectId}
                    onChange={(e) => setSelectedSubjectId(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-zinc-700 outline-none focus:border-indigo-500 shadow-3xs cursor-pointer"
                  >
                    <option value="">-- Click to query GS core subjects --</option>
                    {subjectsList?.map((subj) => <option key={subj.id} value={subj.id}>{subj.name}</option>)}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[12px] font-black text-zinc-700 uppercase tracking-wide flex items-center gap-1">
                    <Layers size={15} className="text-indigo-500" /> 2. Select Topic
                  </label>
                  <select
                    value={selectedTopicId}
                    disabled={!selectedSubjectId || topicsList?.length === 0}
                    onChange={(e) => setSelectedTopicId(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-zinc-700 outline-none focus:border-indigo-500 shadow-3xs disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <option value="">-- Choose topic --</option>
                    {topicsList?.map((top) => <option key={top.id} value={top.id}>{top.name}</option>)}
                  </select>
                </div>

                <div className="md:col-span-2 pt-2 flex justify-end">
                  <button
                    type="button"
                    disabled={fetchingQuestions || !selectedSubjectId || !selectedTopicId}
                    onClick={handleLoadSandboxPool}
                    className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 text-white hover:bg-zinc-800 disabled:bg-slate-100 disabled:text-zinc-400 font-black text-xs rounded-xl tracking-wide uppercase transition-all shadow-3xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {fetchingQuestions ? (
                      <span className="flex items-center gap-2">
                        <RefreshCw size={13} className="animate-spin text-cyan-400" /> Synchronizing Cloud Repositories...
                      </span>
                    ) : "Load Questions"}
                  </button>
                </div>
              </div>

              {hasLoadedPool && (
                <div className="space-y-4">
                  {lastAttemptData && (
                    <div className="bg-gradient-to-br from-[#F4F7FF] via-white to-transparent border border-indigo-100 p-5 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-3xs animate-in slide-in-from-top-3 duration-200">
                      <div className="space-y-1">
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-md tracking-wider flex items-center gap-1 w-fit">
                          <TrendingUp size={11} /> Previous Attempt Found
                        </span>
                        <h4 className="text-sm font-black text-zinc-900 tracking-tight pt-1">
                          Last evaluated on {new Date(lastAttemptData.attemptDate).toLocaleDateString()}
                        </h4>
                        <p className="text-xs text-zinc-500 font-medium font-sans">
                          Historical Accuracy: <span className="text-indigo-600 font-bold">{lastAttemptData.accuracy}%</span> | Obtained Marks: <span className="text-indigo-600 font-bold font-mono">{lastAttemptData.obtainedMarks}M</span>
                        </p>
                      </div>
                      <div className="flex gap-2 font-mono text-xs font-bold text-zinc-500 self-stretch sm:self-auto justify-start sm:justify-end">
                        <div className="bg-white border px-3 py-1.5 rounded-xl text-center min-w-[70px]">
                          <span className="text-[9px] block text-zinc-400 uppercase font-black font-sans leading-none">Correct</span>
                          <span className="text-emerald-600 font-black text-sm block mt-1">+{lastAttemptData.correctCount}</span>
                        </div>
                        <div className="bg-white border px-3 py-1.5 rounded-xl text-center min-w-[70px]">
                          <span className="text-[9px] block text-zinc-400 uppercase font-black font-sans leading-none">Wrong</span>
                          <span className="text-rose-500 font-black text-sm block mt-1">-{lastAttemptData.wrongCount}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="border border-indigo-100 bg-gradient-to-r from-indigo-50/20 to-transparent rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-3xs animate-in zoom-in-95 duration-150">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-md tracking-wider"> ({activeChip.toUpperCase()})</span>
                      <h4 className="text-base font-black text-zinc-900 tracking-tight leading-snug pt-1">{activeTopicName}</h4>
                    </div>
                    <div className="bg-white border border-slate-200 px-5 py-3 rounded-2xl text-center shadow-3xs shrink-0 flex flex-col items-center justify-center min-w-[130px]">
                      <span className="text-[10px] font-black text-zinc-400 uppercase tracking-wider block">Practice</span>
                      <span className="text-xl font-black text-indigo-600 block mt-1 font-mono">{questionPool.length} MCQs</span>
                    </div>
                    <button
                      type="button"
                      onClick={async () => {
                        if (subSection !== "coaching_series" && selectedTopicId) {
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
                            alert("🔒 Cannot start test! This topic must be marked 100% complete in your syllabus configuration before practice runs can be initiated.");
                            return;
                          }
                        }

                        const randomDeck = [...questionPool];
                        for (let i = randomDeck.length - 1; i > 0; i--) {
                          const j = Math.floor(Math.random() * (i + 1));
                          [randomDeck[i], randomDeck[j]] = [randomDeck[j], randomDeck[i]];
                        }
                        setFinalSelectedQuestions(randomDeck);
                        setCurrentQuestionIdx(0);
                        setSelectedAnswersMap({}); 
                        setQuestionAnsweredState({});
                        setErrorClassificationsMap({});
                        setShowSummary(false);
                        setTestActive(true);
                      }}
                      className="px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black text-xs rounded-xl tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
                    >
                      <Play size={12} fill="currentColor" /> {lastAttemptData ? "Reattempt" : "Attempt"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : auditModeActive ? (
        
        <div className="fixed inset-0 z-[100000] bg-[#FFF5F5] w-screen h-screen overflow-y-auto p-4 md:p-8 flex flex-col justify-start text-left select-none animate-in fade-in duration-200">
          <div className="w-full max-w-4xl mx-auto bg-white border border-rose-200 rounded-[2.5rem] p-6 md:p-10 shadow-[0_20px_50px_rgba(220,38,38,0.15)] space-y-6">
            
            <div className="border-b border-rose-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center text-lg shadow-md animate-pulse">⚠️</div>
                <div>
                  <h3 className="text-base font-black text-zinc-900 tracking-tight uppercase leading-none">Compulsory Mistakes Classification</h3>
                  <p className="text-xs font-bold text-rose-600 mt-1 uppercase tracking-wider font-mono">
                    {totalAuditItemsRemaining} of {auditQuestionsList.length} Wrong Answers
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-black px-3 py-1 bg-rose-100 text-rose-700 border border-rose-200 rounded-xl uppercase tracking-wider">Mandatory</span>
            </div>

            <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin">
              {auditQuestionsList.map((q, idx) => {
                const assignedTag = errorClassificationsMap[q.id];
                return (
                  <div key={q.id} className={`border p-5 rounded-2xl transition-all space-y-4 text-left ${assignedTag ? "border-slate-200 bg-slate-50/50" : "border-rose-300 bg-white ring-2 ring-rose-50 animate-in slide-in-from-left-2"}`}>
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="text-[10px] font-mono font-black uppercase tracking-wider text-zinc-400">Wrong Answer #{idx + 1}</span>
                      {assignedTag ? (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200 font-black uppercase px-2 py-0.5 rounded flex items-center gap-1">
                          <CheckSquare size={10} /> Categorized: {errorCategories.find(c => c.id === assignedTag)?.label}
                        </span>
                      ) : (
                        <span className="text-[10px] bg-rose-100 text-rose-800 font-black uppercase px-2 py-0.5 rounded tracking-wide animate-bounce">Awaiting</span>
                      )}
                    </div>

                    <div className="text-sm font-bold text-zinc-900 leading-relaxed font-sans" dangerouslySetInnerHTML={{ __html: q.questionText }} />

                    <div className="flex flex-wrap gap-2 pt-2">
                      {errorCategories.map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => handleLogErrorClassification(q.id, cat.id)}
                          className={`text-[11px] font-bold px-3 py-2 rounded-xl border transition-all cursor-pointer ${errorClassificationsMap[q.id] === cat.id ? "bg-rose-600 border-rose-600 text-white font-black shadow-sm" : "bg-white border-slate-200 text-zinc-600 hover:bg-slate-100"}`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-slate-100 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs font-semibold text-zinc-400 max-w-sm">Every failed response must carry a classified root cause tag to map your weakness logs perfectly across your syllabus grid.</p>
              <button
                type="button"
                disabled={totalAuditItemsRemaining > 0}
                onClick={() => executeFinalDatabaseCommitTransaction(testReport)}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 text-white font-black text-xs rounded-xl uppercase tracking-widest transition-all shadow-md disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                Conclude Submission
              </button>
            </div>

          </div>
        </div>

      ) : (
        <div className="fixed inset-0 z-[99999] bg-[#FAFBFD] w-screen h-screen overflow-y-auto px-4 py-6 md:p-8 flex flex-col justify-start text-left select-none animate-in fade-in duration-200">
          <div className="w-full max-w-7xl mx-auto space-y-6 flex flex-col justify-start">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-indigo-600 text-white text-base font-black flex items-center justify-center shadow-md">⚖️</div>
                <div>
                  <h3 className="text-sm font-black text-zinc-900 tracking-tight uppercase leading-none">TEST WORKSPACE</h3>
                  <p className="text-[11px] font-bold font-mono text-indigo-500 uppercase tracking-wider mt-1">{activeTopicName}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleForcedExitCancelTest}
                className="px-3 py-2 text-[13px] font-black bg-white border border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 text-zinc-700 rounded-xl transition-all shadow-3xs flex items-center gap-1 cursor-pointer uppercase tracking-wider"
              >
                <LogOut size={14} /> Quit 
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
              
              <div className="lg:col-span-3 bg-white border border-[#EBEFF8] rounded-[2.2rem] p-6 md:p-8 shadow-[0_12px_35px_rgba(223,230,245,0.5)] flex flex-col justify-between min-h-[460px]">
                {activeQuestionItem ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="text-xs font-mono font-black uppercase text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-100 tracking-wider">
                        Question No. {currentQuestionIdx + 1}/{finalSelectedQuestions.length}
                      </span>
                      {subSection !== "coaching_series" && questionAnsweredState[activeQuestionItem.id] && (
                        <span className="text-xs font-black uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                          <CheckCircle2 size={11} /> Response Evaluated
                        </span>
                      )}
                    </div>

                    <div className="text-left pt-2">
                      <div className="text-[17px] font-bold text-zinc-900 leading-relaxed font-sans tracking-tight" dangerouslySetInnerHTML={{ __html: activeQuestionItem.questionText }} />
                    </div>

                    <div className="space-y-4 pt-4">
                      {activeQuestionItem.options?.map((optionText, oIdx) => {
                        if (!optionText) return null;
                        
                        const isThisOptionSelected = selectedAnswersMap[activeQuestionItem.id] === oIdx;
                        const isThisOptionTrueAnswer = Number(oIdx) === Number(activeQuestionItem.correctAnswerIndex);
                        const hasUserAnsweredQuestion = !!questionAnsweredState[activeQuestionItem.id];

                        let containerStyleRules = "bg-white border-slate-200/80 text-zinc-700 hover:bg-slate-50";
                        let badgeStyleRules = "bg-slate-50 text-zinc-500 font-black border-slate-200";

                        if (subSection !== "coaching_series" && hasUserAnsweredQuestion) {
                          if (isThisOptionTrueAnswer) {
                            containerStyleRules = "bg-emerald-50 border-emerald-500 text-emerald-950 font-black shadow-3xs";
                            badgeStyleRules = "bg-emerald-600 border-emerald-600 text-white font-black";
                          } else if (isThisOptionSelected && !isThisOptionTrueAnswer) {
                            containerStyleRules = "bg-rose-50 border-rose-400 text-rose-950 font-semibold";
                            badgeStyleRules = "bg-rose-500 border-rose-400 text-white font-black";
                          } else {
                            containerStyleRules = "bg-white border-slate-100 text-zinc-400 opacity-60 pointer-events-none";
                          }
                        } else {
                          if (isThisOptionSelected) {
                            containerStyleRules = "bg-indigo-50 border-indigo-600 text-indigo-950 font-black";
                            badgeStyleRules = "bg-indigo-600 border-indigo-600 text-white font-black";
                          }
                        }

                        return (
                          <div
                            key={oIdx}
                            onClick={() => handleOptionToggleSelect(activeQuestionItem, oIdx)}
                            className={`w-full border-2 p-5 rounded-2xl flex items-center gap-4 transition-all text-left ${containerStyleRules} ${subSection !== "coaching_series" && hasUserAnsweredQuestion ? "cursor-default" : "cursor-pointer"}`}
                          >
                            <div className={`h-8 w-8 rounded-xl border-2 flex items-center justify-center font-mono text-sm tracking-wide shrink-0 transition-colors ${badgeStyleRules}`}>
                              {String.fromCharCode(65 + oIdx)}
                            </div>
                            <div className="text-[15px] font-bold leading-relaxed" dangerouslySetInnerHTML={{ __html: optionText }} />
                          </div>
                        );
                      })}
                    </div>

                    {subSection !== "coaching_series" && questionAnsweredState[activeQuestionItem.id] && lastAttemptData && (
                      <div className="animate-in fade-in zoom-in-95 duration-200">
                        {(() => {
                          const userChoice = selectedAnswersMap[activeQuestionItem.id];
                          const isCorrectThisTime = Number(userChoice) === Number(activeQuestionItem.correctAnswerIndex);
                          const wasIncorrectLastTime = !!wrongQuestionsHistoryMap[activeQuestionItem.id];

                          if (!isCorrectThisTime && !wasIncorrectLastTime) {
                            return (
                              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-center gap-2 text-amber-800 text-xs font-bold shadow-3xs">
                                <AlertCircle className="text-amber-500 shrink-0" size={14} />
                                <span>Performance Decay: Last attempt you answered this item correctly. Review cognitive variables.</span>
                              </div>
                            );
                          }
                          if (isCorrectThisTime && wasIncorrectLastTime) {
                            return (
                              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-center gap-2 text-emerald-800 text-xs font-black shadow-3xs">
                                <Sparkles className="text-emerald-500 shrink-0 animate-bounce" size={14} />
                                <span>Great!! Last time you made a mistake on this question. Vulnerability recovered successfully.</span>
                              </div>
                            );
                          }
                          return null;
                        })()}
                      </div>
                    )}

                    {subSection !== "coaching_series" && questionAnsweredState[activeQuestionItem.id] && 
                     Number(selectedAnswersMap[activeQuestionItem.id]) !== Number(activeQuestionItem.correctAnswerIndex) && 
                     selectedAnswersMap[activeQuestionItem.id] !== undefined && (
                      <div className="bg-rose-50/40 border border-rose-200 p-5 rounded-2xl space-y-3 animate-in slide-in-from-top-2 duration-200 mt-6 text-left">
                        <div>
                          <h4 className="text-xs font-black uppercase text-rose-700 tracking-wider flex items-center gap-1">⚠️ Response Conflict: Map Error Classification</h4>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {errorCategories.map((cat) => (
                            <button
                              key={cat.id}
                              type="button"
                              onClick={() => handleLogErrorClassification(activeQuestionItem.id, cat.id)}
                              className={`text-[11px] font-bold px-3 py-2 rounded-xl border transition-all cursor-pointer ${errorClassificationsMap[activeQuestionItem.id] === cat.id ? "bg-rose-600 border-rose-600 text-white font-black shadow-sm" : "bg-white border-slate-200 text-zinc-600 hover:bg-slate-100"}`}
                            >
                              {cat.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                ) : (
                  <div className="text-center py-12 text-zinc-400 italic">No nodes loaded.</div>
                )}

                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between shrink-0">
                  <button
                    disabled={currentQuestionIdx === 0}
                    onClick={() => setCurrentQuestionIdx(p => Math.max(0, p - 1))}
                    className="px-5 py-2.5 border border-slate-200 bg-white text-zinc-600 hover:bg-slate-50 font-bold text-xs rounded-xl transition-all shadow-3xs flex items-center gap-1 cursor-pointer"
                  >
                    <ChevronLeft size={14} strokeWidth={2.5} /> Previous
                  </button>
                  
                  <button
                    disabled={currentQuestionIdx === finalSelectedQuestions.length - 1}
                    onClick={() => setCurrentQuestionIdx(p => Math.min(finalSelectedQuestions.length - 1, p + 1))}
                    className="px-6 py-2.5 bg-slate-900 text-white hover:bg-zinc-800 font-black text-xs rounded-xl transition-all shadow-3xs flex items-center gap-1 cursor-pointer"
                  >
                    Next <ChevronRight size={14} strokeWidth={2.5} />
                  </button>
                </div>
              </div>

              <div className="bg-white border border-[#EBEFF8] rounded-[2.25rem] p-6 shadow-[0_12px_35px_rgba(223,230,245,0.5)] flex flex-col justify-between min-h-[350px] h-fit lg:sticky lg:top-6">
                <div className="space-y-4">
                  <div className="border-b border-slate-50 pb-2">
                    <h4 className="text-xs font-black uppercase text-zinc-500 tracking-wider">Question Matrix Palette</h4>
                  </div>

                  <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-4 gap-2.5 max-h-[260px] overflow-y-auto pr-1">
                    {finalSelectedQuestions.map((q, idx) => {
                      const isCurrentIdx = currentQuestionIdx === idx;
                      const hasUserAnswered = selectedAnswersMap[q.id] !== undefined;
                      const isLockVerified = !!questionAnsweredState[q.id];
                      const isUserAnswerCorrect = isLockVerified && Number(selectedAnswersMap[q.id]) === Number(q.correctAnswerIndex);
                      
                      let pinStyleClasses = "bg-slate-50 border-slate-200 text-zinc-600 hover:bg-slate-100";
                      
                      if (isCurrentIdx) {
                        pinStyleClasses = "bg-indigo-600 border-indigo-600 text-white shadow-3xs ring-4 ring-indigo-50";
                      } else if (subSection === "coaching_series") {
                        if (hasUserAnswered) pinStyleClasses = "bg-indigo-950 border-indigo-900 text-white font-bold ring-2 ring-indigo-100";
                      } else if (isLockVerified) {
                        pinStyleClasses = isUserAnswerCorrect ? "bg-emerald-500 border-emerald-500 text-white font-black" : "bg-rose-500 border-rose-500 text-white font-black";
                      }
                      
                      return (
                        <button
                          key={q.id}
                          onClick={() => setCurrentQuestionIdx(idx)}
                          className={`h-11 w-11 rounded-xl border-2 flex items-center justify-center font-mono text-sm font-black tracking-tight transition-all cursor-pointer ${pinStyleClasses}`}
                        >
                          {String(idx + 1).padStart(2, '0')}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={handlePreSubmitEvaluationRollup}
                    className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs rounded-xl tracking-wider uppercase transition-all shadow-md hover:scale-102 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    Submit Test Paper
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TestYourPrelims;