// src/prelims/components/AdminQuestionForm.jsx
import React, { useState, useEffect, useRef } from "react";
import { db } from "../../database/dexie";
import gsSyllabus from "../../constants/gsSyllabus";
import useLoginStore from "../../login/store/loginStore";
import { Send, Bold, Italic, List, CheckCircle } from "lucide-react";

function AdminQuestionForm({ onComplete }) {
  const user = useLoginStore((state) => state.user);
  
  const [questionType, setQuestionType] = useState("MCQ_PRELIMS"); // MCQ_PRELIMS, PYQ_PRELIMS, PYQ_MAINS
  const [formData, setFormData] = useState({
    paperTag: "",
    subjectTag: "",
    topicTag: "",
    subtopicTag: "",
    questionText: "", // Holds Rich HTML String
    options: ["", "", "", ""], // Holds Rich HTML Strings Array
    correctAnswerIndex: 0,
    explanation: "", // Holds Rich HTML String
    year: new Date().getFullYear(),
    difficulty: "MEDIUM",
    keywords: "",
    maxMarks: 15,
    wordCountAllowed: 250
  });

  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [availableTopics, setAvailableTopics] = useState([]);
  const [availableSubtopics, setAvailableSubtopics] = useState([]);

  // Rich Text Editor DOM Node References
  const questionEditorRef = useRef(null);
  const explanationEditorRef = useRef(null);
  const optionRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // Cascade 1: Papers -> Subjects
  useEffect(() => {
    if (!formData.paperTag) {
      setAvailableSubjects([]);
      return;
    }
    const filtered = gsSyllabus.filter(s => s.paper === formData.paperTag);
    setAvailableSubjects(filtered);
  }, [formData.paperTag]);

  // Cascade 2: Subjects -> Topics
  useEffect(() => {
    if (!formData.subjectTag) {
      setAvailableTopics([]);
      return;
    }
    const selectedSubj = availableSubjects.find(s => s.id === formData.subjectTag);
    setAvailableTopics(selectedSubj?.topics || []);
  }, [formData.subjectTag, availableSubjects]);

  // Cascade 3: Topics -> Subtopics
  useEffect(() => {
    if (!formData.topicTag) {
      setAvailableSubtopics([]);
      return;
    }
    const selectedTopic = availableTopics.find(t => t.id === formData.topicTag);
    setAvailableSubtopics(selectedTopic?.subtopics || []);
  }, [formData.topicTag, availableTopics]);

  // Inline Native Rich Text Formatting Executor
  const applyStyleInline = (e, command) => {
    e.preventDefault();
    document.execCommand(command, false, null);
  };

  // Sync Rich Text mutations cleanly into the unified state object
  const handleRichChange = (field, ref, index = null) => {
    if (!ref.current) return;
    const value = ref.current.innerHTML;
    
    if (index !== null) {
      setFormData(prev => {
        const updatedOptions = [...prev.options];
        updatedOptions[index] = value;
        return { ...prev, options: updatedOptions };
      });
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sanitize check for empty HTML containers
    const cleanQuestionText = (formData.questionText || "").replace(/<[^>]*>/g, '').trim();
    if (!cleanQuestionText || formData.questionText === "<br>") {
      alert("Please supply the core question statement text.");
      return;
    }

    try {
      const uniqueId = `q_${Date.now()}_${crypto.randomUUID()}`;
      let targetTable = "pyqs";
      
      let questionPayload = {
        id: uniqueId,
        type: questionType,
        paper: formData.paperTag,
        subjectId: formData.subjectTag,
        topicId: formData.topicTag,
        subtopicId: formData.subtopicTag,
        questionText: formData.questionText, // Raw Rich HTML with spacing / line-breaks
        createdBy: user?.email || "nishant53195@gmail.com",
        createdAt: new Date()
      };

      if (questionType === "MCQ_PRELIMS" || questionType === "PYQ_PRELIMS") {
        // Validate choices text entry for prelims modes
        const rawOptionsText = formData.options.map(opt => opt.replace(/<[^>]*>/g, '').trim());
        if (rawOptionsText.some(t => t === "" || t === "br")) {
          alert("Please fill out all option parameters with rich formatting.");
          return;
        }

        questionPayload = {
          ...questionPayload,
          options: formData.options, // Array of structured rich text choices
          correctAnswerIndex: Number(formData.correctAnswerIndex),
          explanation: formData.explanation, // Rich HTML explanations
          difficulty: formData.difficulty,
          year: questionType === "PYQ_PRELIMS" ? Number(formData.year) : null
        };
      } else if (questionType === "PYQ_MAINS") {
        questionPayload = {
          ...questionPayload,
          year: Number(formData.year),
          maxMarks: Number(formData.maxMarks),
          wordCountAllowed: Number(formData.wordCountAllowed),
          keywords: formData.keywords.split(",").map(k => k.trim()).filter(Boolean)
        };
      }

      // 1. Write down locally to Dexie Repository Store
      await db[targetTable].put(questionPayload);

      // 2. Synchronize target item out-of-band directly up to Master Cloud Inventory
      try {
        const { syncEngine } = await import("../../database/services/syncEngine");
        await syncEngine.pushLocalChangesToCloud(user.uid);
      } catch (syncErr) {
        console.warn("[Question Auto-Push] Background sync upload deferred:", syncErr);
      }

      alert("Rich text question committed securely and pushed to master knowledge base!");
      
      // Clean up layout models, variables and rich elements
      setFormData({
        paperTag: "", subjectTag: "", topicTag: "", subtopicTag: "", questionText: "",
        options: ["", "", "", ""], correctAnswerIndex: 0, explanation: "",
        year: new Date().getFullYear(), difficulty: "MEDIUM", keywords: "", maxMarks: 15, wordCountAllowed: 250
      });

      if (questionEditorRef.current) questionEditorRef.current.innerHTML = "";
      if (explanationEditorRef.current) explanationEditorRef.current.innerHTML = "";
      optionRefs.forEach(ref => { if (ref.current) ref.current.innerHTML = ""; });
      
      if (onComplete) onComplete();
    } catch (err) {
      console.error("Database schema extraction error:", err);
      alert(`Could not compile question configuration: ${err.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-left font-sans antialiased text-slate-700">
      
      {/* SELECTION SEGMENT CONTROL BUTTONS */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-black text-slate-500 uppercase tracking-wide block">Question Blueprint Type</label>
        <div className="grid grid-cols-3 gap-1 bg-slate-100 border border-slate-200 p-1 rounded-xl">
          {[
            { id: "MCQ_PRELIMS", label: "MCQ Prelims" },
            { id: "PYQ_PRELIMS", label: "PYQ Prelims" },
            { id: "PYQ_MAINS", label: "PYQ Mains" }
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

      {/* FIELD BLOCKS LAYER 1: STRUCTURAL CLASSIFICATION */}
      <div className="bg-white border border-[#EBEFF8] rounded-2xl p-5 shadow-3xs space-y-4">
        <h4 className="text-xs font-black text-slate-800 tracking-wider uppercase border-b border-slate-50 pb-2">
          Syllabus Index Linkage Alignment
        </h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">1. General Studies Paper</span>
            <select
              value={formData.paperTag}
              onChange={e => setFormData(p => ({ ...p, paperTag: e.target.value, subjectTag: "", topicTag: "", subtopicTag: "" }))}
              className="w-full border border-slate-200 bg-slate-50 rounded-xl p-2.5 text-xs font-bold focus:border-indigo-500 outline-none cursor-pointer shadow-3xs"
            >
              <option value="">-- Choose Paper --</option>
              {["GS1", "GS2", "GS3", "GS4"].map(p => <option key={p} value={p}>{p.slice(0,2) + " " + p.slice(2)}</option>)}
            </select>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">2. Mapped Subject</span>
            <select
              value={formData.subjectTag}
              disabled={availableSubjects.length === 0}
              onChange={e => setFormData(p => ({ ...p, subjectTag: e.target.value, topicTag: "", subtopicTag: "" }))}
              className="w-full border border-slate-200 bg-slate-50 rounded-xl p-2.5 text-xs font-bold focus:border-indigo-500 outline-none disabled:opacity-40 cursor-pointer shadow-3xs"
            >
              <option value="">-- Choose Subject --</option>
              {availableSubjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">3. Relational Topic Node</span>
            <select
              value={formData.topicTag}
              disabled={availableTopics.length === 0}
              onChange={e => setFormData(p => ({ ...p, topicTag: e.target.value, subtopicTag: "" }))}
              className="w-full border border-slate-200 bg-slate-50 rounded-xl p-2.5 text-xs font-bold focus:border-indigo-500 outline-none disabled:opacity-40 cursor-pointer shadow-3xs"
            >
              <option value="">-- Choose Topic --</option>
              {availableTopics.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">4. Subtopic Target</span>
            <select
              value={formData.subtopicTag}
              disabled={availableSubtopics.length === 0}
              onChange={e => setFormData(p => ({ ...p, subtopicTag: e.target.value }))}
              className="w-full border border-slate-200 bg-slate-50 rounded-xl p-2.5 text-xs font-bold focus:border-indigo-500 outline-none disabled:opacity-40 cursor-pointer shadow-3xs"
            >
              <option value="">-- Choose Subtopic --</option>
              {availableSubtopics.map(st => <option key={st.id} value={st.id}>{st.name}</option>)}
            </select>
          </div>
        </div>

        {/* METADATA HORIZONS */}
        {(questionType === "PYQ_PRELIMS" || questionType === "PYQ_MAINS") && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-50">
            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-700 uppercase">UPSC Official Exam Year</label>
              <input
                type="number"
                value={formData.year}
                onChange={e => setFormData(p => ({ ...p, year: e.target.value }))}
                className="w-full border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold bg-slate-50 animate-fade-in"
              />
            </div>
            {questionType === "PYQ_MAINS" ? (
              <>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black text-slate-700 uppercase">Max Awardable Marks</label>
                  <input
                    type="number"
                    value={formData.maxMarks}
                    onChange={e => setFormData(p => ({ ...p, maxMarks: e.target.value }))}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold bg-slate-50"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black text-slate-700 uppercase">Word Constraint Limit</label>
                  <input
                    type="number"
                    value={formData.wordCountAllowed}
                    onChange={e => setFormData(p => ({ ...p, wordCountAllowed: e.target.value }))}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold bg-slate-50"
                  />
                </div>
              </>
            ) : (
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-slate-700 uppercase">Relative Weight Difficulty</label>
                <select
                  value={formData.difficulty}
                  onChange={e => setFormData(p => ({ ...p, difficulty: e.target.value }))}
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

      {/* RICH TEXT CONFIGURATION EDITOR 1: QUESTION statement INPUT BOX */}
      <div className="bg-white border border-[#EBEFF8] rounded-2xl p-5 shadow-3xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-50 pb-1.5">
          <label className="text-[11px] font-black text-slate-700 uppercase tracking-wide">Question Body Content (Rich Text Workspace)</label>
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

      {/* DYNAMIC SUITE PORT 1: RICH TEXT MCQ OPTIONS INPUTS */}
      {(questionType === "MCQ_PRELIMS" || questionType === "PYQ_PRELIMS") && (
        <div className="bg-white border border-[#EBEFF8] rounded-2xl p-5 shadow-3xs space-y-4 animate-in fade-in duration-150">
          <h4 className="text-xs font-black text-slate-800 tracking-wider uppercase border-b border-slate-50 pb-1">
            Objective Choice Configurations (Line breaks and Spacing Enabled)
          </h4>
          
          <div className="space-y-4">
            {formData.options.map((_, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                    Option Item Statement Node {String.fromCharCode(65 + idx)}
                  </span>
                  <button
                    type="button"
                    onClick={() => setFormData(p => ({ ...p, correctAnswerIndex: idx }))}
                    className={`px-2.5 py-0.5 rounded-lg border text-[10px] font-black tracking-wider transition-all flex items-center gap-1 cursor-pointer ${
                      formData.correctAnswerIndex === idx
                        ? "bg-emerald-500 border-emerald-500 text-white shadow-3xs animate-scale-up"
                        : "bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {formData.correctAnswerIndex === idx ? "✓ Correct Option Key" : "Mark as Correct"}
                  </button>
                </div>
                
                {/* Embedded option sub-editor canvas */}
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

          {/* RICH EDITOR 3: DETAILED CONCEPTUAL EXPLANATION WINDOW */}
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
              placeholder="Elaborate details on contextual resolution indexes..."
            />
          </div>
        </div>
      )}

      {/* DYNAMIC SUITE PORT 2: MAINS KEYWORD DESCRIPTORS */}
      {questionType === "PYQ_MAINS" && (
        <div className="bg-white border border-[#EBEFF8] rounded-2xl p-5 shadow-3xs space-y-3 animate-in fade-in duration-150">
          <label className="text-[11px] font-black text-slate-700 uppercase tracking-wide block">Evaluation Model Keywords (Comma Separated)</label>
          <input
            type="text"
            value={formData.keywords}
            onChange={e => setFormData(p => ({ ...p, keywords: e.target.value }))}
            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 shadow-3xs outline-none focus:border-indigo-500"
            placeholder="E.g., Fiscal Deficit, FRBM Act, Macroeconomic Stability, Crowding Out"
          />
          <p className="text-[10px] text-slate-400 font-medium italic">These valuation indices will verify answer framing profiles inside evaluation engines.</p>
        </div>
      )}

      {/* FOOTER ACTIONS SUBMIT DOCK */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black rounded-xl shadow-md transition-all active:scale-98 flex items-center justify-center gap-1.5 tracking-wide cursor-pointer"
        >
          <Send size={13} strokeWidth={2.5} /> Deploy Question Context to Master Cloud
        </button>
      </div>

    </form>
  );
}

export default AdminQuestionForm;