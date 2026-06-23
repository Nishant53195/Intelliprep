// src/prelims/components/AdminQuestionForm.jsx
import React, { useState, useEffect, useRef } from "react";
import { db } from "../../database/dexie";
import gsSyllabus from "../../constants/gsSyllabus";
import useLoginStore from "../../login/store/loginStore";
import { Send, Bold, Italic, List, CheckCircle, FileJson, ChevronLeft, ChevronRight, PlusCircle, Trash2 } from "lucide-react";

function AdminQuestionForm({ onComplete }) {
  const user = useLoginStore((state) => state.user);
  
  // MCQ_PRELIMS, PYQ_PRELIMS, PYQ_MAINS, COACHING_TEST
  const [questionType, setQuestionType] = useState("MCQ_PRELIMS"); 
  const [importJsonText, setImportJsonText] = useState("");
  const [showImportArea, setShowImportArea] = useState(false);
  
  // CAROUSEL QUEUE MANAGEMENT STATES
  const [questionQueue, setQuestionQueue] = useState([
    {
      paperTag: "", subjectTag: "", topicTag: "", subtopicTag: "",
      questionText: "", options: ["", "", "", ""], correctAnswerIndex: 0, explanation: "",
      year: new Date().getFullYear(), difficulty: "MEDIUM", keywords: "", maxMarks: 15, wordCountAllowed: 250,
      coachingName: "", testName: "", testType: "SUBJECT_TEST"
    }
  ]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [availableTopics, setAvailableTopics] = useState([]);
  const [availableSubtopics, setAvailableSubtopics] = useState([]);

  // Rich Text Editor DOM Node References
  const questionEditorRef = useRef(null);
  const explanationEditorRef = useRef(null);
  const optionRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const activeQuestion = questionQueue[currentIdx] || {};

  // Hydrate DOM Rich Text Node Views whenever index cursor pointers shift positions
  useEffect(() => {
    if (questionEditorRef.current) {
      questionEditorRef.current.innerHTML = activeQuestion.questionText || "";
    }
    if (explanationEditorRef.current) {
      explanationEditorRef.current.innerHTML = activeQuestion.explanation || "";
    }
    optionRefs.forEach((ref, idx) => {
      if (ref.current) {
        ref.current.innerHTML = activeQuestion.options?.[idx] || "";
      }
    });
  }, [currentIdx, questionType, questionQueue]);

  // Cascade 1: Papers -> Subjects
  useEffect(() => {
    if (!activeQuestion.paperTag) {
      setAvailableSubjects([]);
      return;
    }
    const filtered = gsSyllabus.filter(s => s.paper === activeQuestion.paperTag);
    setAvailableSubjects(filtered);
  }, [activeQuestion.paperTag]);

  // Cascade 2: Subjects -> Topics
  useEffect(() => {
    if (!activeQuestion.subjectTag) {
      setAvailableTopics([]);
      return;
    }
    const selectedSubj = availableSubjects.find(s => s.id === activeQuestion.subjectTag);
    setAvailableTopics(selectedSubj?.topics || []);
  }, [activeQuestion.subjectTag, availableSubjects]);

  // Cascade 3: Topics -> Subtopics (FULLY REWRITTEN TO INTERCEPT COMPOSITE KEY MAPS)
  useEffect(() => {
    if (!activeQuestion.topicTag || !activeQuestion.subjectTag) {
      setAvailableSubtopics([]);
      return;
    }
    const selectedTopic = availableTopics.find(t => t.id === activeQuestion.topicTag);
    const rawSubtopics = selectedTopic?.subtopics || [];

    // Map structural elements to generate composite IDs exactly matching normalizeSyllabus.js
    const normalizedSubtopicsForDropdown = rawSubtopics.map((st, index) => {
      const safeSubtopicId = st.id 
        ? `${activeQuestion.subjectTag}-${activeQuestion.topicTag}-${st.id}` 
        : `${activeQuestion.topicTag}-subtopic-${index}`;

      return {
        ...st,
        id: safeSubtopicId // Enforce tracking structural alignment
      };
    });

    setAvailableSubtopics(normalizedSubtopicsForDropdown);
  }, [activeQuestion.topicTag, activeQuestion.subjectTag, availableTopics]);

  // Unified nested state array mutation updater channel
  const updateActiveQueueItem = (fields) => {
    setQuestionQueue(prev => {
      const updated = [...prev];
      updated[currentIdx] = { ...updated[currentIdx], ...fields };
      return updated;
    });
  };

  // Inline Native HTML Executive Document styling rules controller
  const applyStyleInline = (e, command) => {
    e.preventDefault();
    document.execCommand(command, false, null);
  };

  const handleRichChange = (field, ref, optionIdx = null) => {
    if (!ref.current) return;
    const innerHtmlValue = ref.current.innerHTML;
         
    if (optionIdx !== null) {
      const updatedOptions = [...(activeQuestion.options || ["", "", "", ""])];
      updatedOptions[optionIdx] = innerHtmlValue;
      updateActiveQueueItem({ options: updatedOptions });
    } else {
      updateActiveQueueItem({ [field]: innerHtmlValue });
    }
  };

  // BULK IMPORT PARSING HANDSHAKE ENGINE
  const handleBulkImportJson = () => {
    if (!importJsonText.trim()) {
      alert("Please paste a valid JSON structure array string first.");
      return;
    }
    try {
      const parsedData = JSON.parse(importJsonText.trim());
      const standardArrayData = Array.isArray(parsedData) ? parsedData : [parsedData];
      
      const structuralQueueElements = standardArrayData.map(item => {
        const paperTag = item.paperTag || item.paper || "";
        const subjectTag = item.subjectTag || item.subjectId || "";
        const topicTag = item.topicTag || item.topicId || "";
        let subtopicTag = item.subtopicTag || item.subtopicId || "";

        // If the imported subtopic id is a simple short raw key instead of a unified composite format, normalize it
        if (subtopicTag && subjectTag && topicTag && !subtopicTag.includes(topicTag)) {
          subtopicTag = `${subjectTag}-${topicTag}-${subtopicTag}`;
        }

        return {
          paperTag,
          subjectTag,
          topicTag,
          subtopicTag,
          questionText: item.questionText || item.question || "",
          options: Array.isArray(item.options) ? [...item.options, "", "", ""].slice(0, 4) : ["", "", "", ""],
          correctAnswerIndex: item.correctAnswerIndex !== undefined ? Number(item.correctAnswerIndex) : 0,
          explanation: item.explanation || "",
          year: item.year ? Number(item.year) : new Date().getFullYear(),
          difficulty: item.difficulty || "MEDIUM",
          keywords: Array.isArray(item.keywords) ? item.keywords.join(", ") : (item.keywords || ""),
          maxMarks: item.maxMarks ? Number(item.maxMarks) : 15,
          wordCountAllowed: item.wordCountAllowed || item.wordCount || 250,
          coachingName: item.coachingName || "",
          testName: item.testName || "",
          testType: item.testType || "SUBJECT_TEST"
        };
      });

      setQuestionQueue(structuralQueueElements);
      setCurrentIdx(0);
      setShowImportArea(false);
      setImportJsonText("");
      alert(`Successfully populated queue grid! Imported ${structuralQueueElements.length} rows inside ${questionType} context template.`);
    } catch (parseErr) {
      console.error("JSON Validation Parsing failed entirely:", parseErr);
      alert(`Invalid JSON format array error: ${parseErr.message}. Make sure your strings escape spacing tags.`);
    }
  };

  const handleAddNewEmptyCard = () => {
    setQuestionQueue(prev => [
      ...prev,
      {
        paperTag: "", subjectTag: "", topicTag: "", subtopicTag: "",
        questionText: "", options: ["", "", "", ""], correctAnswerIndex: 0, explanation: "",
        year: new Date().getFullYear(), difficulty: "MEDIUM", keywords: "", maxMarks: 15, wordCountAllowed: 250,
        coachingName: "", testName: "", testType: "SUBJECT_TEST"
      }
    ]);
    setCurrentIdx(questionQueue.length);
  };

  const handleDeleteActiveCard = () => {
    if (questionQueue.length === 1) {
      setQuestionQueue([
        {
          paperTag: "", subjectTag: "", topicTag: "", subtopicTag: "",
          questionText: "", options: ["", "", "", ""], correctAnswerIndex: 0, explanation: "",
          year: new Date().getFullYear(), difficulty: "MEDIUM", keywords: "", maxMarks: 15, wordCountAllowed: 250,
          coachingName: "", testName: "", testType: "SUBJECT_TEST"
        }
      ]);
      return;
    }
    setQuestionQueue(prev => prev.filter((_, i) => i !== currentIdx));
    setCurrentIdx(p => (p > 0 ? p - 1 : 0));
  };

  const handleSubmitAllQueueItems = async (e) => {
    e.preventDefault();
    
    for (let i = 0; i < questionQueue.length; i++) {
      const cleanText = (questionQueue[i].questionText || "").replace(/<[^>]*>/g, '').trim();
      if (!cleanText || questionQueue[i].questionText === "<br>") {
        alert(`Validation Failure: Card #${i + 1} Question frame text statement is empty.`);
        setCurrentIdx(i);
        return;
      }
    }

    try {
      let targetTable = "pyqs"; 
      
      const processedBatchPayloads = questionQueue.map((q, idx) => {
        let payload = {
          id: `q_${Date.now()}_${idx}_${crypto.randomUUID()}`,
          type: questionType,
          paper: q.paperTag,
          subjectId: q.subjectTag,
          topicId: q.topicTag,
          subtopicId: q.subtopicTag,
          questionText: q.questionText,
          createdBy: user?.email || "local_user",
          createdAt: new Date()
        };

        if (questionType === "MCQ_PRELIMS" || questionType === "PYQ_PRELIMS" || questionType === "COACHING_TEST") {
          payload = {
            ...payload,
            options: q.options,
            correctAnswerIndex: Number(q.correctAnswerIndex),
            explanation: q.explanation,
            difficulty: q.difficulty,
            year: questionType === "PYQ_PRELIMS" ? Number(q.year) : null
          };
          
          if (questionType === "COACHING_TEST") {
            payload.coachingName = q.coachingName;
            payload.testName = q.testName;
            payload.testType = q.testType;
          }
        } else if (questionType === "PYQ_MAINS") {
          payload = {
            ...payload,
            year: Number(q.year),
            maxMarks: Number(q.maxMarks),
            wordCountAllowed: Number(q.wordCountAllowed),
            keywords: q.keywords.split(",").map(k => k.trim()).filter(Boolean)
          };
        }
        return payload;
      });

      for (const questionObject of processedBatchPayloads) {
        await db[targetTable].put(questionObject);
      }

      try {
        const { syncEngine } = await import("../../database/services/syncEngine");
        await syncEngine.pushLocalChangesToCloud(user.uid);
      } catch (syncErr) {
        console.warn("[Question Auto-Push] Batch push upload bottlenecked:", syncErr);
      }

      alert(`Success! Successfully uploaded ${processedBatchPayloads.length} question logs into Cloud Inventory Registry.`);
            
      setQuestionQueue([
        {
          paperTag: "", subjectTag: "", topicTag: "", subtopicTag: "",
          questionText: "", options: ["", "", "", ""], correctAnswerIndex: 0, explanation: "",
          year: new Date().getFullYear(), difficulty: "MEDIUM", keywords: "", maxMarks: 15, wordCountAllowed: 250,
          coachingName: "", testName: "", testType: "SUBJECT_TEST"
        }
      ]);
      setCurrentIdx(0);
      if (onComplete) onComplete();
    } catch (err) {
      console.error("Batch submission database failure:", err);
      alert(`Could not compile target queue parameters: ${err.message}`);
    }
  };

  return (
    <div className="space-y-5 text-left font-sans antialiased text-slate-700 w-full relative">
      
      {/* BULK ENTRY CONTROLS BAR CONTROL LAYER */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 border border-slate-200 p-3 rounded-2xl shadow-3xs">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowImportArea(!showImportArea)}
            className="px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm cursor-pointer transition-colors"
          >
            <FileJson size={13} className="text-cyan-400" /> Bulk JSON Import
          </button>
          <button
            type="button"
            onClick={handleAddNewEmptyCard}
            className="px-3.5 py-2 border bg-white text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-3xs cursor-pointer transition-colors"
          >
            <PlusCircle size={13} className="text-indigo-500" /> Insert Card
          </button>
        </div>

        {/* CONTROLS PAGINATION CAROUSEL TRACKER STRIP */}
        <div className="flex items-center gap-3 bg-white px-3 py-1 rounded-xl border">
          <button
            type="button"
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx(p => p - 1)}
            className="p-1 hover:text-slate-900 disabled:opacity-20 transition-all cursor-pointer"
          >
            <ChevronLeft size={16} strokeWidth={3} />
          </button>
          <span className="text-xs font-mono font-black text-slate-800">
            Card {currentIdx + 1} of {questionQueue.length}
          </span>
          <button
            type="button"
            disabled={currentIdx === questionQueue.length - 1}
            onClick={() => setCurrentIdx(p => p + 1)}
            className="p-1 hover:text-slate-900 disabled:opacity-20 transition-all cursor-pointer"
          >
            <ChevronRight size={16} strokeWidth={3} />
          </button>
          <button
            type="button"
            onClick={handleDeleteActiveCard}
            className="p-1 text-rose-500 hover:text-rose-600 transition-colors cursor-pointer border-l pl-2 ml-1"
            title="Delete this item card allocation"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {/* EXPANDABLE PASTE AREA INPUT CONSOLE PANEL */}
      {showImportArea && (
        <div className="bg-white border border-dashed border-indigo-200 rounded-2xl p-4 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase text-indigo-700 tracking-wide block">Paste Raw Array payload code</span>
            <span className="text-[9px] font-mono font-black text-slate-400 bg-slate-50 px-2 py-0.5 rounded border">Conforms to {questionType} parameters</span>
          </div>
          <textarea
            rows={5}
            value={importJsonText}
            onChange={e => setImportJsonText(e.target.value)}
            className="w-full font-mono bg-slate-950 border border-slate-800 rounded-xl p-3 text-[11px] text-emerald-400 placeholder-slate-600 outline-none shadow-inner"
            placeholder={`[\n  {\n    "questionText": "Sample question context string",\n    "paperTag": "GS3",\n    "subjectTag": "economy",\n    "topicTag": "fiscal-policy",\n    "subtopicTag": "subtopic-0",\n    "options": ["A", "B", "C", "D"],\n    "correctAnswerIndex": 0\n  }\n]`}
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setShowImportArea(false)} className="px-3 py-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 rounded-lg text-[11px] font-bold cursor-pointer">Cancel</button>
            <button type="button" onClick={handleBulkImportJson} className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[11px] font-black shadow-sm cursor-pointer transition-colors">Process Matrix Ingestion</button>
          </div>
        </div>
      )}

      {/* CORE FORM IMPLEMENTATION VIEW OVERLAY GRID */}
      <form onSubmit={handleSubmitAllQueueItems} className="space-y-5">
        
        {/* SELECTION TYPES MODE CHIPS */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-black text-slate-500 uppercase tracking-wide block">Question Blueprint Type Mode</label>
          <div className="grid grid-cols-4 gap-1 bg-slate-100 border border-slate-200 p-1 rounded-xl">
            {[
              { id: "MCQ_PRELIMS", label: "MCQ Topics" },
              { id: "PYQ_PRELIMS", label: "PYQ Topics" },
              { id: "PYQ_MAINS", label: "PYQ Mains" },
              { id: "COACHING_TEST", label: "Coaching Test" }
            ].map(type => (
              <button
                key={type.id}
                type="button"
                onClick={() => setQuestionType(type.id)}
                className={`py-2 text-xs font-black rounded-lg text-center transition-all cursor-pointer ${
                  questionType === type.id
                    ? "bg-white text-indigo-600 shadow-3xs border border-slate-200/60 font-black"
                    : "text-slate-500 hover:bg-white/40"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* FIELD BLOCKS LAYER 1: CLASSIFICATIONS */}
        <div className="bg-white border border-[#EBEFF8] rounded-2xl p-5 shadow-3xs space-y-4">
          <h4 className="text-xs font-black text-slate-800 tracking-wider uppercase border-b border-slate-50 pb-2">
            Syllabus Index Linkage Alignment (Card #{currentIdx + 1})
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">1. General Studies Paper</span>
              <select
                value={activeQuestion.paperTag || ""}
                onChange={e => updateActiveQueueItem({ paperTag: e.target.value, subjectTag: "", topicTag: "", subtopicTag: "" })}
                className="w-full border border-slate-200 bg-slate-50 rounded-xl p-2.5 text-xs font-bold focus:border-indigo-500 outline-none cursor-pointer shadow-3xs"
              >
                <option value="">-- Choose Paper --</option>
                {["GS1", "GS2", "GS3", "GS4"].map(p => <option key={p} value={p}>{p.slice(0,2) + " " + p.slice(2)}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">2. Mapped Subject</span>
              <select
                value={activeQuestion.subjectTag || ""}
                disabled={availableSubjects.length === 0}
                onChange={e => updateActiveQueueItem({ subjectTag: e.target.value, topicTag: "", subtopicTag: "" })}
                className="w-full border border-slate-200 bg-slate-50 rounded-xl p-2.5 text-xs font-bold focus:border-indigo-500 outline-none disabled:opacity-40 cursor-pointer shadow-3xs"
              >
                <option value="">-- Choose Subject --</option>
                {availableSubjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">3. Relational Topic Node</span>
              <select
                value={activeQuestion.topicTag || ""}
                disabled={availableTopics.length === 0}
                onChange={e => updateActiveQueueItem({ topicTag: e.target.value, subtopicTag: "" })}
                className="w-full border border-slate-200 bg-slate-50 rounded-xl p-2.5 text-xs font-bold focus:border-indigo-500 outline-none disabled:opacity-40 cursor-pointer shadow-3xs"
              >
                <option value="">-- Choose Topic --</option>
                {availableTopics.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">4. Subtopic Target</span>
              <select
                value={activeQuestion.subtopicTag || ""}
                disabled={availableSubtopics.length === 0}
                onChange={e => updateActiveQueueItem({ subtopicTag: e.target.value })}
                className="w-full border border-slate-200 bg-slate-50 rounded-xl p-2.5 text-xs font-bold focus:border-indigo-500 outline-none disabled:opacity-40 cursor-pointer shadow-3xs"
              >
                <option value="">-- Choose Subtopic --</option>
                {availableSubtopics.map(st => <option key={st.id} value={st.id}>{st.name}</option>)}
              </select>
            </div>
          </div>

          {/* DYNAMIC FIELD SETS FOR COACHING MOCK MATRIX SPECIFICATIONS */}
          {questionType === "COACHING_TEST" && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 animate-in slide-in-from-top-2 duration-150">
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-slate-700 uppercase">Coaching Institute Name</label>
                <input
                  type="text"
                  value={activeQuestion.coachingName || ""}
                  onChange={e => updateActiveQueueItem({ coachingName: e.target.value })}
                  placeholder="e.g., Vision IAS, Forum IAS"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold bg-slate-50 placeholder-slate-400 outline-none focus:border-indigo-500 shadow-3xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-slate-700 uppercase">Official Test Paper Name</label>
                <input
                  type="text"
                  value={activeQuestion.testName || ""}
                  onChange={e => updateActiveQueueItem({ testName: e.target.value })}
                  placeholder="e.g., Polity Sectional Test I"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold bg-slate-50 placeholder-slate-400 outline-none focus:border-indigo-500 shadow-3xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-slate-700 uppercase">Mock Simulator Test Type</label>
                <select
                  value={activeQuestion.testType || "SUBJECT_TEST"}
                  onChange={e => updateActiveQueueItem({ testType: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold bg-slate-50 outline-none focus:border-indigo-500 shadow-3xs cursor-pointer"
                >
                  <option value="SUBJECT_TEST">Subject Specific Test</option>
                  <option value="MULTIPLE_SUBJECT_TEST">Multiple Subject Combination Test</option>
                  <option value="FULL_TEST">Complete Full Length Test (FLT)</option>
                  <option value="CURRENT_AFFAIRS_TEST">Current Affairs Specific Compilation</option>
                </select>
              </div>
            </div>
          )}

          {/* METADATA EXTENSION CRITERIAS */}
          {(questionType === "PYQ_PRELIMS" || questionType === "PYQ_MAINS") && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-50">
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-slate-700 uppercase">Official Exam Year</label>
                <input
                  type="number"
                  value={activeQuestion.year || 2026}
                  onChange={e => updateActiveQueueItem({ year: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold bg-slate-50"
                />
              </div>
              {questionType === "PYQ_MAINS" ? (
                <>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black text-slate-700 uppercase">Max Awardable Marks</label>
                    <input
                      type="number"
                      value={activeQuestion.maxMarks || 15}
                      onChange={e => updateActiveQueueItem({ maxMarks: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold bg-slate-50"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black text-slate-700 uppercase">Word Constraint Limit</label>
                    <input
                      type="number"
                      value={activeQuestion.wordCountAllowed || 250}
                      onChange={e => updateActiveQueueItem({ wordCountAllowed: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold bg-slate-50"
                    />
                  </div>
                </>
              ) : (
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black text-slate-700 uppercase">Relative Weight Difficulty</label>
                  <select
                    value={activeQuestion.difficulty || "MEDIUM"}
                    onChange={e => updateActiveQueueItem({ difficulty: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold bg-slate-50 outline-none"
                  >
                    <option value="EASY">Easy Level</option>
                    <option value="MEDIUM">Medium Level</option>
                    <option value="HARD">Hard Core Strategy</option>
                  </select>
                </div>
              )}
            </div>
          )}
        </div>

        {/* RICH WORKSPACE AREA 1: QUESTION SPECIFICATION TEXT */}
        <div className="bg-white border border-[#EBEFF8] rounded-2xl p-5 shadow-3xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-50 pb-1.5">
            <label className="text-[11px] font-black text-slate-700 uppercase tracking-wide">Question Body Content (Rich Canvas Panel)</label>
            <div className="flex items-center gap-2 bg-slate-50 border px-2 py-0.5 rounded-lg text-slate-400">
              <button type="button" onClick={(e) => applyStyleInline(e, "bold")} className="p-0.5 hover:text-slate-800 font-bold text-xs"><Bold size={12} /></button>
              <button type="button" onClick={(e) => applyStyleInline(e, "italic")} className="p-0.5 hover:text-slate-800"><Italic size={12} /></button>
              <button type="button" onClick={(e) => applyStyleInline(e, "insertUnorderedList")} className="p-0.5 hover:text-slate-800"><List size={12} /></button>
            </div>
          </div>
          <div
            ref={questionEditorRef}
            contentEditable
            onInput={() => handleRichChange("questionText", questionEditorRef)}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-800 outline-none min-h-[120px] overflow-y-auto leading-relaxed text-left whitespace-pre-wrap shadow-3xs focus:border-indigo-400 transition-colors"
            style={{ whiteSpace: "pre-wrap" }}
          />
        </div>

        {/* OBJECTIVE CHOCE CONFGGURATION VIEWPORTS */}
        {(questionType === "MCQ_PRELIMS" || questionType === "PYQ_PRELIMS" || questionType === "COACHING_TEST") && (
          <div className="bg-white border border-[#EBEFF8] rounded-2xl p-5 shadow-3xs space-y-4 animate-in fade-in duration-150">
            <h4 className="text-xs font-black text-slate-800 tracking-wider uppercase border-b border-slate-50 pb-1">
              Objective Choice Configurations (Line breaks and Spacing Enabled)
            </h4>
            
            <div className="space-y-4">
              {["", "", "", ""].map((_, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                      Option Item Statement Node {String.fromCharCode(65 + idx)}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateActiveQueueItem({ correctAnswerIndex: idx })}
                      className={`px-2.5 py-0.5 rounded-lg border text-[10px] font-black tracking-wider transition-all flex items-center gap-1 cursor-pointer ${
                        activeQuestion.correctAnswerIndex === idx
                          ? "bg-emerald-500 border-emerald-500 text-white shadow-3xs"
                          : "bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {activeQuestion.correctAnswerIndex === idx ? "✓ Correct Option Key" : "Mark as Correct"}
                    </button>
                  </div>
                  
                  <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-3xs focus-within:border-indigo-400 transition-all">
                    <div className="bg-slate-50/60 border-b border-slate-150 px-3 py-1 flex items-center gap-2 text-slate-400">
                      <button type="button" onClick={(e) => applyStyleInline(e, "bold")} className="p-0.5 hover:text-slate-800 text-[10px] font-bold"><Bold size={11} /></button>
                      <button type="button" onClick={(e) => applyStyleInline(e, "italic")} className="p-0.5 hover:text-slate-800"><Italic size={11} /></button>
                    </div>
                    <div
                      ref={optionRefs[idx]}
                      contentEditable
                      onInput={() => handleRichChange("options", optionRefs[idx], idx)}
                      className="w-full bg-white px-4 py-3 text-xs font-semibold text-slate-800 outline-none min-h-[54px] whitespace-pre-wrap text-left leading-relaxed"
                      style={{ whiteSpace: "pre-wrap" }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* RICH WORKSPACE AREA 2: EXPLANATION METRICS */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-black text-slate-700 uppercase">Detailed Core Explanation (Rich HTML Format Support)</label>
                <div className="flex items-center gap-2 bg-slate-50 border px-2 py-0.5 rounded-lg text-slate-400">
                  <button type="button" onClick={(e) => applyStyleInline(e, "bold")} className="p-0.5 hover:text-slate-800"><Bold size={11} /></button>
                  <button type="button" onClick={(e) => applyStyleInline(e, "italic")} className="p-0.5 hover:text-slate-800"><Italic size={11} /></button>
                </div>
              </div>
              <div
                ref={explanationEditorRef}
                contentEditable
                onInput={() => handleRichChange("explanation", explanationEditorRef)}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 outline-none min-h-[90px] whitespace-pre-wrap leading-relaxed text-left shadow-3xs focus:border-indigo-400 transition-colors"
                style={{ whiteSpace: "pre-wrap" }}
              />
            </div>
          </div>
        )}

        {/* MAINS VALUE KEYWORDS ELEMENT */}
        {questionType === "PYQ_MAINS" && (
          <div className="bg-white border border-[#EBEFF8] rounded-2xl p-5 shadow-3xs space-y-3 animate-in fade-in duration-150">
            <label className="text-[11px] font-black text-slate-700 uppercase tracking-wide block">Evaluation Model Keywords (Comma Separated)</label>
            <input
              type="text"
              value={activeQuestion.keywords || ""}
              onChange={e => updateActiveQueueItem({ keywords: e.target.value })}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 shadow-3xs outline-none focus:border-indigo-500"
              placeholder="E.g., Fiscal Deficit, FRBM Act, Macroeconomic Stability"
            />
            <p className="text-[10px] text-slate-400 font-medium italic">These valuation indices will verify answer framing profiles inside evaluation engines.</p>
          </div>
        )}

        {/* GLOBAL REGISTRY CONTROL TRIGGER ACTIONS PANEL */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-slate-900 rounded-2xl p-4 shadow-md gap-4">
          <div className="text-left">
            <h5 className="text-white text-xs font-black uppercase tracking-wide">Unified Batch Submission Commit</h5>
            <p className="text-slate-400 text-[10px] font-semibold mt-0.5">
              Deploys all {questionQueue.length} compiled question vectors simultaneously directly to the global master cloud vault.
            </p>
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white hover:scale-102 font-black text-xs rounded-xl tracking-wider uppercase transition-all shadow-md active:scale-98 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Send size={13} strokeWidth={2.5} /> Deploy {questionQueue.length} Questions to Master Cloud
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminQuestionForm;