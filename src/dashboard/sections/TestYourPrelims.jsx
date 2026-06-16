// src/dashboard/sections/TestYourPrelims.jsx
import { useState, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../database/dexie";
import useLoginStore from "../../login/store/loginStore";
import AdminQuestionForm from "../../prelims/components/AdminQuestionForm";
import { prelimsQueryService } from "../../prelims/services/prelimsQueryService";
import { Play, BookOpen, Layers, ShieldAlert, RefreshCw, ChevronLeft, ChevronRight, CheckCircle2, LogOut, Award, Percent, XCircle, AlertCircle, RotateCcw } from "lucide-react";

function TestYourPrelims() {
  const user = useLoginStore((state) => state.user);
  const isAdmin = user?.email === "nishant53195@gmail.com";
  
  const [activeChip, setActiveChip] = useState("mcq"); // "mcq" or "pyq"
  const [subSection, setSubSection] = useState("take_test"); // "take_test", "coaching_series", or "admin_creator"
  
  // SANDBOX CONFIGURATION INTERFACE STATES
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [selectedTopicId, setSelectedTopicId] = useState("");
  const [fetchingQuestions, setFetchingQuestions] = useState(false);
  
  // PERSISTENT DATA POOL STATES
  const [questionPool, setQuestionPool] = useState([]); 
  const [activeTopicName, setActiveTopicName] = useState("");
  const [hasLoadedPool, setHasLoadedPool] = useState(false);
  
  // RUNTIME CONFIGURATION STATES
  const [finalSelectedQuestions, setFinalSelectedQuestions] = useState([]);
  const [testActive, setTestActive] = useState(false);
  const [showSummary, setShowSummary] = useState(false); 

  // ACTIVE LIVE TEST EXECUTION RUNTIME STATES
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  
  // PRACTICE INTERACTIVE LIVE TRACKING STATES
  const [selectedAnswersMap, setSelectedAnswersMap] = useState({}); // { [questionId]: chosenOptionIdx }
  const [questionAnsweredState, setQuestionAnsweredState] = useState({}); // { [questionId]: boolean }
  const [errorClassificationsMap, setErrorClassificationsMap] = useState({}); // { [questionId]: string }

  // CACHED REPORT METRICS STATE FOR THE CURRENT ATTEMPT
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
   * EXCLUSIVE FULL-SCREEN SECURITY HOOKS
   * -------------------------------------------------------------------------- */
  useEffect(() => {
    if (!testActive) return;

    const handleBeforeUnload = (e) => {
      const msg = "An active exam is running. Leaving or refreshing will cause your test progress to remain unfulfilled and lost.";
      e.preventDefault();
      e.returnValue = msg;
      return msg;
    };

    const handlePopStateHistoryBlock = (e) => {
      window.history.pushState(null, "", window.location.pathname);
      
      if (window.confirm("Warning: Hitting the browser Back/Forward navigation will permanently drop this examination run. Progress will be unfulfilled. Abort test?")) {
        setTestActive(false);
        setQuestionPool([]);
        setHasLoadedPool(false);
      }
    };

    window.history.pushState(null, "", window.location.pathname);

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopStateHistoryBlock);

    try {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      }
    } catch (err) {
      console.warn("Native hardware full screen trigger bypassed:", err);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopStateHistoryBlock);
      
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    };
  }, [testActive]);

  /* --------------------------------------------------------------------------
   * DEXIE LIVE QUERY CASCADES: Subject -> Topic
   * -------------------------------------------------------------------------- */
  const subjectsList = useLiveQuery(async () => {
    const allSubjects = await db.subjects.toArray();
    return allSubjects.filter(subj => subj.type?.toUpperCase() !== "OPTIONAL" && subj.paper?.toUpperCase() !== "OPTIONAL");
  }, []);

  const topicsList = useLiveQuery(async () => {
    if (!selectedSubjectId) return [];
    return await db.topics.where("subjectId").equals(selectedSubjectId).toArray();
  }, [selectedSubjectId]);

  useEffect(() => {
    setSelectedTopicId("");
    setQuestionPool([]);
    setHasLoadedPool(false);
    setShowSummary(false);
  }, [selectedSubjectId]);

  useEffect(() => {
    setQuestionPool([]);
    setHasLoadedPool(false);
    setShowSummary(false);
  }, [selectedTopicId, activeChip]);

  /* --------------------------------------------------------------------------
   * DISPATCH POOL HARVESTER
   * -------------------------------------------------------------------------- */
  const handleLoadSandboxPool = async () => {
    if (!selectedSubjectId || !selectedTopicId) {
      alert("Please specify both Subject and Topic parameters before initializing sandbox fields.");
      return;
    }

    setFetchingQuestions(true);
    setHasLoadedPool(false);
    setShowSummary(false);
    try {
      const fullFetchedBatch = await prelimsQueryService.fetchSandboxQuestions({
        subjectId: selectedSubjectId,
        topicId: selectedTopicId,
        isPyqMode: activeChip === "pyq"
      });

      const selectedTopicMetadata = await db.topics.get(selectedTopicId);
      
      setQuestionPool(fullFetchedBatch);
      setActiveTopicName(selectedTopicMetadata ? selectedTopicMetadata.name : "Selected Module");
      setHasLoadedPool(true);
    } catch (err) {
      alert(`Could not harvest target cloud parameters: ${err.message}`);
    } finally {
      setFetchingQuestions(false);
    }
  };

  /* --------------------------------------------------------------------------
   * INITIALIZE PRACTICE DECK (Loads all topic questions automatically)
   * -------------------------------------------------------------------------- */
  const handleBeginAdaptiveTest = () => {
    if (questionPool.length === 0) return;
    
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
  };

  /* --------------------------------------------------------------------------
   * INTERACTIVE OPTION SELECTION LOGIC
   * -------------------------------------------------------------------------- */
  const handleOptionToggleSelect = (questionItem, optionIdx) => {
    // If already answered, lock the selection to maintain practice integrity
    if (questionAnsweredState[questionItem.id]) return;

    setSelectedAnswersMap(prev => ({ ...prev, [questionItem.id]: optionIdx }));
    setQuestionAnsweredState(prev => ({ ...prev, [questionItem.id]: true }));
  };

  const handleLogErrorClassification = (questionId, classificationId) => {
    setErrorClassificationsMap(prev => ({ ...prev, [questionId]: classificationId }));
  };

  /* --------------------------------------------------------------------------
   * FINALIZE RUNTIME PRACTICE TELEMETRY LOGS
   * -------------------------------------------------------------------------- */
  const handleFinishAndSubmitTest = async () => {
    const totalCount = finalSelectedQuestions.length;
    const answeredCount = Object.keys(selectedAnswersMap).length;
    
    if (!window.confirm(`Are you sure you want to conclude this testing window? You have answered ${answeredCount} out of ${totalCount} questions.`)) return;

    let correctCount = 0;
    let incorrectCount = 0;
    let omittedCount = totalCount - answeredCount;
    const testId = `test_run_${Date.now()}`;
    const timestamp = Date.now();
    const questionLogBatch = [];

    finalSelectedQuestions.forEach((q) => {
      const userChoice = selectedAnswersMap[q.id];
      const isItemCorrect = userChoice !== undefined && Number(userChoice) === Number(q.correctAnswerIndex);
      
      if (userChoice === undefined) {
        questionLogBatch.push({
          id: `qlog_${Date.now()}_${q.id}`, userId: user?.uid || "anon", testId, questionId: q.id,
          subjectId: selectedSubjectId, topicId: selectedTopicId, isCorrect: false, status: "OMITTED", errorType: null
        });
      } else if (isItemCorrect) {
        correctCount++;
      } else {
        incorrectCount++;
        questionLogBatch.push({
          id: `qlog_${Date.now()}_${q.id}`, userId: user?.uid || "anon", testId, questionId: q.id,
          subjectId: selectedSubjectId, topicId: selectedTopicId, isCorrect: false, status: "INCORRECT",
          errorType: errorClassificationsMap[q.id] || "UNCLASSIFIED"
        });
      }
    });

    const calculatedScore = (correctCount * 2) - (incorrectCount * (2 / 3));
    const accuracyPercentage = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

    setTestReport({
      total: totalCount, attempted: answeredCount, correct: correctCount, incorrect: incorrectCount, omitted: omittedCount,
      score: Number(calculatedScore.toFixed(2)), accuracy: accuracyPercentage
    });

    try {
      if (db.test_history) {
        await db.test_history.put({
          id: testId, userId: user?.uid || "anon", subjectId: selectedSubjectId, topicId: selectedTopicId,
          topicName: activeTopicName, testType: activeChip.toUpperCase(), totalQuestions: totalCount,
          correctCount, incorrectCount, omittedCount, accuracy: accuracyPercentage, score: calculatedScore, timestamp
        });
      }
      if (questionLogBatch.length > 0 && db.question_logs) {
        await db.question_logs.bulkPut(questionLogBatch);
      }
    } catch (err) {
      console.warn("Analytics writing postponed:", err);
    }

    setTestActive(false);
    setShowSummary(true);
  };

  const handleForcedExitCancelTest = () => {
    if (window.confirm("Abort this practice run entirely? Current inputs will be discarded and marked unfulfilled.")) {
      setTestActive(false);
      setQuestionPool([]);
      setHasLoadedPool(false);
      setShowSummary(false);
    }
  };

  const activeQuestionItem = finalSelectedQuestions[currentQuestionIdx] || null;

  return (
    <div className="space-y-5 text-left font-sans antialiased text-slate-800">
      
      {/* STANDARD CONFIGURATION DASHBOARD HEADER */}
      {!testActive && (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-xl font-black text-[#111625] tracking-tight">Adaptive Testing Sandbox</h2>
              <p className="text-xs font-semibold text-slate-400 mt-0.5">Run adaptive question suites or record official custom test scripts.</p>
            </div>
            
            <div className="flex bg-slate-100 border border-slate-200 p-1 rounded-xl shrink-0 shadow-3xs">
              <button
                type="button"
                onClick={() => { setActiveChip("mcq"); if (subSection === "admin_creator") setSubSection("take_test"); }}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${activeChip === "mcq" && subSection !== "admin_creator" ? "bg-white text-indigo-600 shadow-3xs font-black" : "text-slate-500 hover:text-slate-800"}`}
              >
                MCQ Engine
              </button>
              <button
                type="button"
                onClick={() => { setActiveChip("pyq"); if (subSection === "admin_creator") setSubSection("take_test"); }}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${activeChip === "pyq" && subSection !== "admin_creator" ? "bg-white border border-slate-200 text-indigo-600 shadow-3xs font-black" : "text-slate-500 hover:text-slate-800"}`}
              >
                PYQ Records
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/60 pb-2.5">
            <div className="flex gap-1.5 overflow-x-auto scrollbar-none">
              <button
                type="button"
                onClick={() => setSubSection("take_test")}
                className={`text-xs px-4 py-1.5 font-black rounded-xl border transition-all cursor-pointer ${
                  subSection === "take_test"
                    ? "bg-[#E8EEFF] border-transparent text-indigo-600 shadow-3xs"
                    : "bg-white border-slate-200 text-slate-500 hover:text-slate-800"
                }`}
              >
                Topic Wise MCQ Practice
              </button>
              
              <button
                type="button"
                onClick={() => setSubSection("coaching_series")}
                className={`text-xs px-4 py-1.5 font-black rounded-xl border transition-all cursor-pointer ${
                  subSection === "coaching_series"
                    ? "bg-[#E8EEFF] border-transparent text-indigo-600 shadow-3xs"
                    : "bg-white border-slate-200 text-slate-500 hover:text-slate-800"
                }`}
              >
                Coaching Test Series
              </button>
            </div>
            
            {isAdmin && (
              <button
                type="button"
                onClick={() => setSubSection(subSection === "admin_creator" ? "take_test" : "admin_creator")}
                className={`px-4 py-1.5 text-xs font-black rounded-xl border transition-all shadow-3xs flex items-center gap-1 cursor-pointer ${
                  subSection === "admin_creator"
                    ? "bg-amber-50 border-amber-200 text-amber-700 font-black"
                    : "bg-white border-amber-200 text-amber-600 hover:bg-amber-50/50"
                }`}
              >
                {subSection === "admin_creator" ? "Exit Question Creator" : "Add Questions (Admin)"}
              </button>
            )}
          </div>
        </>
      )}

      {/* MAIN CONFIGURATION BLOCK PORT WRAPPER */}
      {!testActive ? (
        <div className="bg-white border border-[#EBEFF8] rounded-[2rem] p-6 shadow-[0_8px_24px_rgba(235,240,248,0.35)] min-h-[22rem]">
          {subSection === "admin_creator" && isAdmin ? (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="bg-[#FFF8F2] border border-[#FFEADA] rounded-xl p-3 flex items-center gap-2 text-[#D96B27]">
                <span className="text-xs shrink-0">⚠️</span>
                <span className="text-[11px] font-black uppercase tracking-wider">Authorized Mode: Seeding Question Pool registries.</span>
              </div>
              <AdminQuestionForm onComplete={() => setSubSection("take_test")} />
            </div>
          ) : subSection === "coaching_series" ? (
            <div className="flex flex-col items-center justify-center text-center py-12 text-slate-400 space-y-2 animate-in fade-in duration-200">
              <div className="text-3xl select-none">🎯</div>
              <p className="text-sm font-black text-slate-800">Coaching Mock Test Infrastructure</p>
              <p className="text-xs text-slate-400 font-medium max-w-sm leading-relaxed">Integrated premium coaching test series blueprints and multi-institute tracking blocks will render here.</p>
            </div>
          ) : showSummary ? (
            /* POST-SUBMIT PERFORMANCE SUMMARY VIEWPORT CARD */
            <div className="space-y-6 text-left animate-in zoom-in-95 duration-200">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <div className="h-10 w-10 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-2xl flex items-center justify-center text-lg">🏆</div>
                <div>
                  <h3 className="text-base font-black text-slate-900 leading-none">Simulation Matrix Evaluated</h3>
                  <p className="text-xs font-medium text-slate-400 mt-1 uppercase tracking-wider font-mono">Topic Batch: {activeTopicName}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex flex-col justify-between">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1">Total Items</span>
                  <span className="text-2xl font-black text-slate-800 leading-none mt-3 font-mono">{testReport.total}</span>
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
                  <h4 className="text-sm font-black text-slate-800 tracking-tight">Cumulative UPSC Score Calculation</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">Calculated via standard GS parameters: +2.00 for Correct, -0.67 for Incorrect. Omitted items are score-neutral.</p>
                </div>
                <div className="bg-white border border-slate-200 px-6 py-3.5 rounded-xl text-center shadow-3xs shrink-0 flex flex-col justify-center">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Total Marks Earned</span>
                  <span className={`text-3xl font-black block mt-0.5 font-mono leading-none ${testReport.score >= 0 ? "text-indigo-600" : "text-rose-600"}`}>{testReport.score}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={handleLoadSandboxPool}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-xl uppercase tracking-wider transition-all shadow-3xs flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw size={13} /> Re-Initialize Sandbox Pool
                </button>
              </div>
            </div>
          ) : (
            /* CONFIGURATION PANEL SELECTION VIEWPORT */
            <div className="space-y-6 animate-in fade-in duration-200 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 border border-slate-200/60 p-4 rounded-2xl shadow-3xs">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-wide flex items-center gap-1">
                    <BookOpen size={12} className="text-indigo-500" /> 1. Select Subject Allocation
                  </label>
                  <select
                    value={selectedSubjectId}
                    onChange={(e) => setSelectedSubjectId(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 outline-none focus:border-indigo-500 shadow-3xs cursor-pointer"
                  >
                    <option value="">-- Click to query GS core subjects --</option>
                    {subjectsList?.map((subj) => (
                      <option key={subj.id} value={subj.id}>{subj.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-wide flex items-center gap-1">
                    <Layers size={12} className="text-indigo-500" /> 2. Select Syllabus Topic Chapter
                  </label>
                  <select
                    value={selectedTopicId}
                    disabled={!selectedSubjectId || topicsList?.length === 0}
                    onChange={(e) => setSelectedTopicId(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 outline-none focus:border-indigo-500 shadow-3xs disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <option value="">-- Choose topic classification --</option>
                    {topicsList?.map((top) => (
                      <option key={top.id} value={top.id}>{top.name}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2 pt-2 flex justify-end">
                  <button
                    type="button"
                    disabled={fetchingQuestions || !selectedSubjectId || !selectedTopicId}
                    onClick={handleLoadSandboxPool}
                    className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 text-white hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-400 font-black text-xs rounded-xl tracking-wide uppercase transition-all shadow-3xs cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    {fetchingQuestions ? (
                      <span className="flex items-center gap-2">
                        <RefreshCw size={13} className="animate-spin text-cyan-400" /> Harvesting Cloud Inventory...
                      </span>
                    ) : (
                      "Load Sandbox Questions"
                    )}
                  </button>
                </div>
              </div>

              {hasLoadedPool && (
                <div className="border border-indigo-100 bg-gradient-to-r from-indigo-50/20 to-transparent rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-3xs animate-in zoom-in-95 duration-150">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-md tracking-wider">
                      Repository Linked ({activeChip.toUpperCase()})
                    </span>
                    <h4 className="text-base font-black text-slate-900 tracking-tight leading-snug pt-1">
                      {activeTopicName}
                    </h4>
                    <p className="text-xs text-slate-400 font-mono">Practice execution parameters initialized. Total pool contents will load sequentially.</p>
                  </div>
                  
                  <div className="bg-white border border-slate-200 px-5 py-3 rounded-2xl text-center shadow-3xs shrink-0 flex flex-col items-center justify-center min-w-[130px]">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Practice Batch</span>
                    <span className="text-xl font-black text-indigo-600 block mt-1 font-mono">{questionPool.length} MCQ Nodes</span>
                  </div>

                  {questionPool.length > 0 ? (
                    <button
                      type="button"
                      onClick={handleBeginAdaptiveTest}
                      className="px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black text-xs rounded-xl tracking-wider uppercase transition-all shadow-md hover:scale-102 active:scale-98 flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
                    >
                      <Play size={12} fill="currentColor" /> Begin Practice Deck
                    </button>
                  ) : (
                    <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 p-4 rounded-xl text-amber-700 text-xs font-medium">
                      <span className="text-lg">⚠️</span>
                      <p className="leading-relaxed">No matching testing data objects are stored inside the central Cloud registries yet.</p>
                    </div>
                  )}
                </div>
              )}

              {!hasLoadedPool && (
                <div className="flex flex-col items-center justify-center text-center py-10 text-slate-400 space-y-2">
                  <div className="text-3xl select-none">🧪</div>
                  <p className="text-xs font-bold text-slate-700">Sandbox Environment Uninitialized</p>
                  <p className="text-[11px] max-w-xs leading-relaxed">Specify your desired GS Subject and Topic categories above and click load to compile a timed sandbox environment.</p>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* ====================================================================
         * ISOLATED TRIPLE-LOCKED ABSOLUTE FULL-SCREEN INTERACTIVE TESTING WORKSPACE
         * ==================================================================== */
        <div className="fixed inset-0 z-[99999] bg-[#FAFBFD] w-screen h-screen overflow-y-auto px-4 py-6 md:p-8 flex flex-col justify-start text-left select-none animate-in fade-in duration-200">
          <div className="w-full max-w-7xl mx-auto space-y-6 flex flex-col justify-start">
            
            {/* SECURE TOP SUB-BAR STICK STRIP */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-indigo-600 text-white text-base font-black flex items-center justify-center shadow-md">⚖️</div>
                <div>
                  <h3 className="text-sm font-black text-slate-900 tracking-tight uppercase leading-none">SECURED SANDBOX EXAMINATION CONTEXT</h3>
                  <p className="text-[11px] font-bold font-mono text-indigo-500 uppercase tracking-wider mt-1">Active Session Topic: {activeTopicName}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleForcedExitCancelTest}
                className="px-3 py-2 text-[10px] font-black bg-white border border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 text-slate-500 rounded-xl transition-all shadow-3xs flex items-center gap-1 cursor-pointer uppercase tracking-wider"
              >
                <LogOut size={12} /> Terminate Exam
              </button>
            </div>

            {/* SPLIT LAYOUT HOUSING CONTAINER PANELS */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
              
              {/* LEFT COLUMN PANEL: ACTIVE VIEW QUESTION ELEMENT */}
              <div className="lg:col-span-3 bg-white border border-[#EBEFF8] rounded-[2rem] p-6 md:p-8 shadow-[0_12px_35px_rgba(223,230,245,0.5)] flex flex-col justify-between min-h-[460px]">
                {activeQuestionItem ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="text-xs font-mono font-black uppercase text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-100 tracking-wider">
                        Question Node {currentQuestionIdx + 1} of {finalSelectedQuestions.length}
                      </span>
                      {questionAnsweredState[activeQuestionItem.id] && (
                        <span className="text-xs font-black uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                          <CheckCircle2 size={11} /> Response Evaluated
                        </span>
                      )}
                    </div>

                    <div className="text-left pt-2">
                      <div 
                        className="text-[17px] font-bold text-slate-900 leading-relaxed font-sans tracking-tight"
                        dangerouslySetInnerHTML={{ __html: activeQuestionItem.questionText }}
                      />
                    </div>

                    {/* INTERACTIVE CHOICE RENDERS WITH REAL-TIME FEEDBACK COLOR FLIPS */}
                    <div className="space-y-4 pt-4">
                      {activeQuestionItem.options?.map((optionText, oIdx) => {
                        if (!optionText) return null;
                        
                        const isThisOptionSelected = selectedAnswersMap[activeQuestionItem.id] === oIdx;
                        const isThisOptionTrueAnswer = Number(oIdx) === Number(activeQuestionItem.correctAnswerIndex);
                        const hasUserAnsweredQuestion = !!questionAnsweredState[activeQuestionItem.id];

                        let containerStyleRules = "bg-white border-slate-200/80 text-slate-700 hover:bg-slate-50";
                        let badgeStyleRules = "bg-slate-50 text-slate-500 font-black border-slate-200";

                        if (hasUserAnsweredQuestion) {
                          if (isThisOptionTrueAnswer) {
                            // Highlight true option green always after evaluation selection fires
                            containerStyleRules = "bg-emerald-50 border-emerald-500 text-emerald-950 font-black shadow-3xs";
                            badgeStyleRules = "bg-emerald-600 border-emerald-600 text-white font-black";
                          } else if (isThisOptionSelected && !isThisOptionTrueAnswer) {
                            // Highlight chosen wrong choice red flag layout borders
                            containerStyleRules = "bg-rose-50 border-rose-400 text-rose-950 font-semibold";
                            badgeStyleRules = "bg-rose-500 border-rose-400 text-white font-black";
                          } else {
                            containerStyleRules = "bg-white border-slate-100 text-slate-400 opacity-60 pointer-events-none";
                          }
                        }

                        return (
                          <div
                            key={oIdx}
                            onClick={() => handleOptionToggleSelect(activeQuestionItem, oIdx)}
                            className={`w-full border-2 p-5 rounded-2xl flex items-center gap-4 transition-all text-left ${containerStyleRules} ${hasUserAnsweredQuestion ? "cursor-default" : "cursor-pointer"}`}
                          >
                            <div className={`h-8 w-8 rounded-xl border-2 flex items-center justify-center font-mono text-sm tracking-wide shrink-0 transition-colors ${badgeStyleRules}`}>
                              {String.fromCharCode(65 + oIdx)}
                            </div>
                            <div 
                              className="text-[15px] font-bold leading-relaxed"
                              dangerouslySetInnerHTML={{ __html: optionText }}
                            />
                          </div>
                        );
                      })}
                    </div>

                    {/* INLINE ERROR CLASSIFICATION COMPONENT ACCORDION DRAWER (Only fires if chosen index is incorrect) */}
                    {questionAnsweredState[activeQuestionItem.id] && 
                     Number(selectedAnswersMap[activeQuestionItem.id]) !== Number(activeQuestionItem.correctAnswerIndex) && 
                     selectedAnswersMap[activeQuestionItem.id] !== undefined && (
                      <div className="bg-rose-50/40 border border-rose-200 p-5 rounded-2xl space-y-3 animate-in slide-in-from-top-2 duration-200 mt-6 text-left">
                        <div>
                          <h4 className="text-xs font-black uppercase text-rose-700 tracking-wider flex items-center gap-1">
                            ⚠️ Response Conflict: Map Error Classification Indices
                          </h4>
                          <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Isolate conceptual slips or technical execution errors to fix cognitive bugs.</p>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-1">
                          {errorCategories.map((cat) => {
                            const isCategorySelected = errorClassificationsMap[activeQuestionItem.id] === cat.id;
                            return (
                              <button
                                key={cat.id}
                                type="button"
                                onClick={() => handleLogErrorClassification(activeQuestionItem.id, cat.id)}
                                className={`text-[11px] font-bold px-3 py-2 rounded-xl border transition-all cursor-pointer ${
                                  isCategorySelected
                                    ? "bg-rose-600 border-rose-600 text-white font-black shadow-sm scale-102"
                                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100"
                                }`}
                              >
                                {cat.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-400 italic">No available question payloads mapped inside memory hooks.</div>
                )}

                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between shrink-0">
                  <button
                    disabled={currentQuestionIdx === 0}
                    onClick={() => setCurrentQuestionIdx(p => Math.max(0, p - 1))}
                    className="px-5 py-2.5 border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 font-bold text-xs rounded-xl transition-all shadow-3xs disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
                  >
                    <ChevronLeft size={14} strokeWidth={2.5} /> Previous
                  </button>
                  
                  <button
                    disabled={currentQuestionIdx === finalSelectedQuestions.length - 1}
                    onClick={() => setCurrentQuestionIdx(p => Math.min(finalSelectedQuestions.length - 1, p + 1))}
                    className="px-6 py-2.5 bg-slate-900 text-white hover:bg-slate-800 font-black text-xs rounded-xl transition-all shadow-3xs disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
                  >
                    Next <ChevronRight size={14} strokeWidth={2.5} />
                  </button>
                </div>
              </div>

              {/* RIGHT COLUMN PANEL: RUNTIME QUESTION PALETTE MATRIX */}
              <div className="bg-white border border-[#EBEFF8] rounded-[2.25rem] p-6 shadow-[0_12px_35px_rgba(223,230,245,0.5)] flex flex-col justify-between min-h-[350px] h-fit lg:sticky lg:top-6">
                <div className="space-y-4">
                  <div className="border-b border-slate-50 pb-2">
                    <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider">Question Matrix</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5 font-medium">Quick-jump tracker pins.</p>
                  </div>

                  <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-4 gap-2.5 max-h-[260px] overflow-y-auto pr-1">
                    {finalSelectedQuestions.map((q, idx) => {
                      const isCurrentIdx = currentQuestionIdx === idx;
                      const hasUserAnswered = !!questionAnsweredState[q.id];
                      const isUserAnswerCorrect = hasUserAnswered && Number(selectedAnswersMap[q.id]) === Number(q.correctAnswerIndex);
                      
                      let pinStyleClasses = "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100";
                      
                      if (isCurrentIdx) {
                        pinStyleClasses = "bg-indigo-600 border-indigo-600 text-white shadow-3xs ring-4 ring-indigo-50";
                      } else if (hasUserAnswered) {
                        pinStyleClasses = isUserAnswerCorrect
                          ? "bg-emerald-500 border-emerald-500 text-white font-black"
                          : "bg-rose-500 border-rose-500 text-white font-black";
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
                    onClick={handleFinishAndSubmitTest}
                    className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs rounded-xl tracking-wider uppercase transition-all shadow-md hover:scale-102 active:scale-98 flex items-center justify-center gap-1.5 cursor-pointer"
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