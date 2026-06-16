// src/dashboard/sections/TestYourMains.jsx
import { useState, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../database/dexie";
import useLoginStore from "../../login/store/loginStore";
import { mainsQueryService } from "../../mains/services/mainsQueryService";
import { BookOpen, Layers, RefreshCw, HelpCircle, Award, FileText, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";

function TestYourMains() {
  const user = useLoginStore((state) => state.user);
  
  // CONFIGURATION INTERFACE STATES
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [selectedTopicId, setSelectedTopicId] = useState("");
  const [fetchingQuestions, setFetchingQuestions] = useState(false);
  
  // RUNTIME DATA POOL STATES
  const [questionsList, setQuestionsList] = useState([]);
  const [activeTopicName, setActiveTopicName] = useState("");
  const [hasLoadedQuestions, setHasLoadedQuestions] = useState(false);

  // USER MARKS LOGGING DRAWER STATES
  const [expandedMarksDrawer, setExpandedMarksDrawer] = useState({}); // { [questionId]: boolean }
  const [userMarksInput, setUserMarksInput] = useState({}); // { [questionId]: scoreNum }
  const [loggedQuestionsMap, setLoggedQuestionsMap] = useState(new Set()); // Tracking submitted tokens cleanly

  /* --------------------------------------------------------------------------
   * DEXIE LIVE QUERY CASCADES: Subject -> Topic (Gated for GS Cores Only)
   * -------------------------------------------------------------------------- */
  const subjectsList = useLiveQuery(async () => {
    const allSubjects = await db.subjects.toArray();
    // STRICT FILTER: Meticulously block Optional subjects from showing up in the selection deck
    return allSubjects.filter(subj => subj.type?.toUpperCase() !== "OPTIONAL" && subj.paper?.toUpperCase() !== "OPTIONAL");
  }, []);

  const topicsList = useLiveQuery(async () => {
    if (!selectedSubjectId) return [];
    return await db.topics.where("subjectId").equals(selectedSubjectId).toArray();
  }, [selectedSubjectId]);

  // Reset trailing parameters on configuration updates
  useEffect(() => {
    setSelectedTopicId("");
    setQuestionsList([]);
    setHasLoadedQuestions(false);
    setLoggedQuestionsMap(new Set());
  }, [selectedSubjectId]);

  useEffect(() => {
    setQuestionsList([]);
    setHasLoadedQuestions(false);
    setLoggedQuestionsMap(new Set());
  }, [selectedTopicId]);

  /* --------------------------------------------------------------------------
   * BATCH RECOVERY HARVESTER TRIGGER
   * -------------------------------------------------------------------------- */
  const handleLoadMainsSandbox = async () => {
    if (!selectedSubjectId || !selectedTopicId) {
      alert("Please specify both Subject and Topic parameters before initializing sandbox fields.");
      return;
    }

    setFetchingQuestions(true);
    setHasLoadedQuestions(false);
    setLoggedQuestionsMap(new Set());
    try {
      const descriptiveBatch = await mainsQueryService.fetchMainsQuestions({
        subjectId: selectedSubjectId,
        topicId: selectedTopicId
      });

      const selectedTopicMetadata = await db.topics.get(selectedTopicId);
      
      setQuestionsList(descriptiveBatch);
      setActiveTopicName(selectedTopicMetadata ? selectedTopicMetadata.name : "Selected Module");
      setHasLoadedQuestions(true);
    } catch (err) {
      alert(`Could not compile target parameters: ${err.message}`);
    } finally {
      setFetchingQuestions(false);
    }
  };

  /* --------------------------------------------------------------------------
   * INDIVIDUAL QUESTION MARKS COMMIT CONTROL LIFE CYCLE
   * -------------------------------------------------------------------------- */
  const toggleInlineMarksDrawer = (qId) => {
    setExpandedMarksDrawer(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleCommitQuestionScore = async (qItem) => {
    const rawScore = userMarksInput[qItem.id];
    if (rawScore === undefined || rawScore === "") {
      alert("Please enter a numeric score value before logging metrics.");
      return;
    }

    const numericalScore = Number(rawScore);
    const maxMarksAllowed = Number(qItem.maxMarks || 15);

    if (isNaN(numericalScore) || numericalScore < 0 || numericalScore > maxMarksAllowed) {
      alert(`Validation Error: Score must be a valid number between 0 and the maximum awardable limit of ${maxMarksAllowed} marks.`);
      return;
    }

    try {
      // 1. Log structural telemetry metrics down to local dexie repositories
      if (db.mains_tests) {
        await db.mains_tests.put({
          id: `mains_log_${Date.now()}_${qItem.id}`,
          userId: user?.uid || "anon_user",
          subjectId: selectedSubjectId,
          topicId: selectedTopicId,
          questionId: qItem.id,
          maxMarks: maxMarksAllowed,
          marksObtained: numericalScore,
          createdAt: new Date()
        });
      }

      // 2. Snap selection map token to flag the item row grey safely
      setLoggedQuestionsMap(prev => {
        const updated = new Set(prev);
        updated.add(qItem.id);
        return updated;
      });

      // 3. Close drawer accordion smoothly
      setExpandedMarksDrawer(prev => ({ ...prev, [qItem.id]: false }));
      alert("Performance score log committed successfully to the local telemetry registry database!");
    } catch (err) {
      console.error("[Mains Evaluation Engine] DB Write Bottlenecked:", err);
      alert("System Error committing evaluation payload rows.");
    }
  };

  return (
    <div className="space-y-5 text-left font-sans antialiased text-slate-800">
      
      {/* HEADER SEGMENT */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-xl font-black text-[#111625] tracking-tight">Test Your Mains</h2>
        <p className="text-xs font-semibold text-slate-400 mt-0.5">Evaluate multi-dimensional framing limits against descriptive evaluation indexes.</p>
      </div>

      {/* CONFIGURATION SELECTORS DRAWER GRID */}
      <div className="bg-white border border-[#EBEFF8] rounded-[2rem] p-6 shadow-[0_8px_24px_rgba(235,240,248,0.35)] space-y-6">
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
                <option key={subj.id} value={subj.id}>
                  {subj.name} ({subj.paper?.toUpperCase()})
                </option>
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
              onClick={handleLoadMainsSandbox}
              className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 text-white hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-400 font-black text-xs rounded-xl tracking-wide uppercase transition-all shadow-3xs cursor-pointer flex items-center justify-center gap-1.5"
            >
              {fetchingQuestions ? (
                <span className="flex items-center gap-2">
                  <RefreshCw size={13} className="animate-spin text-cyan-400" /> Harvesting Descriptive Inventory...
                </span>
              ) : (
                "Load Sandbox Questions"
              )}
            </button>
          </div>
        </div>

        {/* DYNAMIC RESULTS PORT DISPLAY BLOCK LAYER */}
        {hasLoadedQuestions && (
          <div className="space-y-4 animate-in fade-in duration-200">
            
            {/* CAPACITY SUB-BAR OVERLAY STRIP */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 pb-3.5 gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-purple-50 border border-purple-100 text-purple-700 rounded-md tracking-wider">
                  Descriptive Logs Loaded (Mains)
                </span>
                <h4 className="text-base font-black text-slate-900 tracking-tight leading-snug pt-1">
                  {activeTopicName}
                </h4>
              </div>
              <div className="bg-slate-50 border border-slate-200 px-4 py-1.5 rounded-xl font-mono text-xs font-black text-slate-700 shadow-2xs shrink-0">
                {questionsList.length} Questions Found
              </div>
            </div>

            {/* DYNAMIC LIST INTERFACE STREAM GRID MAP */}
            {questionsList.length > 0 ? (
              <div className="space-y-4 pt-1">
                {questionsList.map((q, idx) => {
                  const isDrawerOpen = !!expandedMarksDrawer[q.id];
                  const isItemLoggedAlready = loggedQuestionsMap.has(q.id);
                  
                  return (
                    <div 
                      key={q.id} 
                      className={`border rounded-2xl p-5 md:p-6 transition-all shadow-3xs bg-white ${
                        isItemLoggedAlready ? "border-slate-100 opacity-50 bg-slate-50/40 shadow-none" : "border-[#EBEFF8] hover:border-slate-300"
                      }`}
                    >
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-50 pb-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-mono font-black text-slate-500 bg-slate-100 border px-2 py-0.5 rounded-md">
                            Question #{String(idx + 1).padStart(2, '0')}
                          </span>
                          {q.year && (
                            <span className="text-[10px] font-mono font-black text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md">
                              UPSC {q.year}
                            </span>
                          )}
                          <span className="text-[10px] font-mono font-black text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-md">
                            Weight: {q.maxMarks || 15}M
                          </span>
                          {q.wordCountAllowed && (
                            <span className="text-[10px] font-mono font-black text-slate-500 bg-slate-50 border px-1.5 py-0.5 rounded-md">
                              Limit: {q.wordCountAllowed} Words
                            </span>
                          )}
                        </div>

                        {isItemLoggedAlready && (
                          <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                            ✓ Marks Logged
                          </span>
                        )}
                      </div>

                      {/* QUESTION RICH STATEMENT */}
                      <div className="text-left pt-4 pb-2">
                        <div 
                          className="text-[15px] font-bold text-slate-800 leading-relaxed font-sans tracking-tight"
                          dangerouslySetInnerHTML={{ __html: q.questionText }}
                        />
                      </div>

                      {/* KEYWORDS BADGES CLUSTER NODE */}
                      {q.keywords && q.keywords.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-2 pb-1">
                          {q.keywords.map((kw, kIdx) => (
                            <span key={kIdx} className="text-[9px] font-bold tracking-wide uppercase px-2 py-0.5 bg-slate-100 text-slate-500 rounded border border-transparent">
                              {kw}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* ACTION BUTTON TRIGGER BAR */}
                      {!isItemLoggedAlready && (
                        <div className="mt-4 pt-3 border-t border-slate-50 flex justify-end">
                          <button
                            type="button"
                            onClick={() => toggleInlineMarksDrawer(q.id)}
                            className="px-4 py-1.5 border border-slate-200 hover:border-slate-300 text-slate-700 font-black text-xs rounded-xl transition-all shadow-3xs flex items-center gap-1 cursor-pointer"
                          >
                            <Award size={13} className="text-indigo-500" /> 
                            Submit Marks 
                            {isDrawerOpen ? <ChevronUp size={12} className="ml-0.5" /> : <ChevronDown size={12} className="ml-0.5" />}
                          </button>
                        </div>
                      )}

                      {/* COLLAPSIBLE ACCORDION LOG DRAWER */}
                      {isDrawerOpen && (
                        <div className="mt-4 pt-4 border-t border-dashed border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50/50 p-4 rounded-xl animate-in slide-in-from-top-2 duration-150 text-left">
                          <div className="sm:col-span-2 space-y-1">
                            <h5 className="text-xs font-black text-slate-800 tracking-tight flex items-center gap-1">
                              <FileText size={12} className="text-slate-400" /> Self-Evaluation Entry Panel
                            </h5>
                            <p className="text-[11px] text-slate-400 font-medium leading-normal">
                              Grade your handwritten script structural format objectively based on standard answer model guidelines.
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="relative flex-1">
                              <input
                                type="number"
                                min="0"
                                step="0.5"
                                max={q.maxMarks || 15}
                                placeholder="Score"
                                value={userMarksInput[q.id] || ""}
                                onChange={(e) => setUserMarksInput(prev => ({ ...prev, [q.id]: e.target.value }))}
                                className="w-full bg-white border border-slate-200 rounded-xl pl-4 pr-10 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-500 shadow-3xs"
                              />
                              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[10px] font-black text-slate-400">
                                /{q.maxMarks || 15}M
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleCommitQuestionScore(q)}
                              className="px-3 py-2 bg-indigo-600 text-white hover:bg-indigo-700 font-black text-xs rounded-xl shadow-md cursor-pointer transition-all"
                            >
                              Log
                            </button>
                          </div>
                        </div>
                      )}

                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 p-4 rounded-xl text-amber-700 text-xs font-medium">
                <span className="text-lg">⚠️</span>
                <p className="leading-relaxed">No matching descriptive questions are available for this topic classification inside the cloud bank yet.</p>
              </div>
            )}

          </div>
        )}

        {/* UNINITIALIZED PLACEHOLDER */}
        {!hasLoadedQuestions && (
          <div className="flex flex-col items-center justify-center text-center py-12 text-slate-400 space-y-2">
            <div className="text-3xl select-none">🔬</div>
            <p className="text-xs font-bold text-slate-700">Sandbox Workspace Uninitialized</p>
            <p className="text-[11px] max-w-xs leading-relaxed">Specify your desired descriptive GS Paper classification indices above and click load to initialize evaluation logs.</p>
          </div>
        )}

      </div>

    </div>
  );
}

export default TestYourMains;