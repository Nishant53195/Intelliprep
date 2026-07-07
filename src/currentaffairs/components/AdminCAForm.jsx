// src/currentaffairs/components/AdminCAForm.jsx
import { useState, useEffect, useRef } from "react";
import { db } from "../../database/dexie";
import gsSyllabus from "../../constants/gsSyllabus"; // References core static structural syllabus arrays
import useLoginStore from "../../login/store/loginStore"; // Import global login store context
import { Save, Send, Bold, Italic, List, ListOrdered, Link2, Quote, Undo2, Redo2, CloudCheck } from "lucide-react";

function AdminCAForm() {
  const user = useLoginStore((state) => state.user); // Retrieve active authenticated user profile details
  
  const [formData, setFormData] = useState({
    title: "", 
    summary: "", 
    source: "", 
    date: new Date().toISOString().split("T")[0],
    examType: "BOTH", 
    paperTags: [], 
    subjectTags: [], 
    topicTags: [], 
    subtopicTags: [],
    parentIssueId: ""
  });

  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [availableTopics, setAvailableTopics] = useState([]);
  const [availableSubtopics, setAvailableSubtopics] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);

  const editorRef = useRef(null);

  // Cascade 1: Filter subjects when selected papers change
  useEffect(() => {
    if (formData.paperTags.length === 0) {
      setAvailableSubjects([]);
      return;
    }
    const filteredSubjects = gsSyllabus.filter(subject => 
      formData.paperTags.includes(subject.paper)
    );
    setAvailableSubjects(filteredSubjects);
  }, [formData.paperTags]);

  // Cascade 2: Filter topics when selected subjects change
  useEffect(() => {
    if (formData.subjectTags.length === 0) {
      setAvailableTopics([]);
      return;
    }
    const filteredTopics = availableSubjects
      .filter(subj => formData.subjectTags.includes(subj.id))
      .flatMap(subj => subj.topics || []);
    setAvailableTopics(filteredTopics);
  }, [formData.subjectTags, availableSubjects]);

  // Cascade 3: Filter subtopics when selected topics change (UPDATED TO COMPOSITE IDS)
  useEffect(() => {
    if (formData.topicTags.length === 0 || formData.subjectTags.length === 0) {
      setAvailableSubtopics([]);
      return;
    }

    const primarySubjectId = formData.subjectTags[0];
    const primaryTopicId = formData.topicTags[0];

    const filteredSubtopics = availableTopics
      .filter(top => formData.topicTags.includes(top.id))
      .flatMap(top => {
        const rawSubtopics = top.subtopics || [];
        return rawSubtopics.map((st, index) => {
          // Replicate exact composite ID normalization logic
          const safeSubtopicId = st.id 
            ? `${primarySubjectId}-${primaryTopicId}-${st.id}` 
            : `${primaryTopicId}-subtopic-${index}`;
          
          return {
            ...st,
            id: safeSubtopicId
          };
        });
      });

    setAvailableSubtopics(filteredSubtopics);
  }, [formData.topicTags, formData.subjectTags, availableTopics]);

  // Dynamic Evolution Linkage Filtering: Pulls records that match selected subject AND topic
  useEffect(() => {
    async function getContextualIssues() {
      try {
        const allIssues = await db.current_affairs.toArray(); // Pull current database collection array nodes
        let filtered = allIssues;

        if (formData.subjectTags.length > 0) {
          filtered = filtered.filter(issue => formData.subjectTags.includes(issue.subjectTag));
        }
        if (formData.topicTags.length > 0) {
          filtered = filtered.filter(issue => formData.topicTags.includes(issue.topicTag));
        }

        setFilteredIssues(filtered);
      } catch (err) {
        console.error("Error reading issues from registry indices:", err);
      }
    }

    getContextualIssues();
  }, [formData.subjectTags, formData.topicTags]);

  const handleMultiSelect = (field, value) => {
    setFormData(prev => {
      const current = prev[field];
      const updated = current.includes(value) 
        ? current.filter(item => item !== value) 
        : [...current, value];
      return { ...prev, [field]: updated };
    });
  };

  // Triggers native document execution for real-time rich styling while typing
  const toggleBoldInline = (e) => {
    e.preventDefault(); // Stop form focus disruptions
    document.execCommand("bold", false, null);
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handleEditorChange = () => {
    if (editorRef.current) {
      setFormData(prev => ({ ...prev, summary: editorRef.current.innerHTML }));
    }
  };

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    console.log("🚀 Publish initiated! Current Form Payload state:", formData);

    const textSummaryOnly = (formData.summary || "").replace(/<[^>]*>/g, '').trim();

    if (!formData.title.trim()) {
      alert("Please complete the required Title field.");
      return;
    }

    if (!textSummaryOnly || formData.summary === "<br>") {
      alert("Please complete the required Analytical Summary data node.");
      return;
    }

    try {
      const generatedEntryId = `ca_${Date.now()}_${crypto.randomUUID()}`;

      const newCAEntry = {
        id: generatedEntryId,
        title: formData.title.trim(),
        summary: formData.summary,
        source: formData.source.trim() || "Prescribed Document Node",
        date: formData.date,
        examType: formData.examType,
        paperTag: formData.paperTags[0] || "",
        subjectTag: formData.subjectTags[0] || "", 
        topicTag: formData.topicTags[0] || "",
        subtopicTag: formData.subtopicTags[0] || "", 
        issueEvolutionIds: formData.parentIssueId ? [formData.parentIssueId] : [],
        createdBy: user?.email || "nishant53195@gmail.com",
        createdAt: new Date()
      };

      // Execute a synchronized atomic transaction to put the item in CA and push to sync_queue explicitly
      await db.transaction("rw", [db.current_affairs, db.sync_queue], async () => {
        // 1. Store locally for the admin view
        await db.current_affairs.put(newCAEntry);

        // 2. Manually queue it for cloud replication securely
        await db.sync_queue.put({
          id: `current_affairs_${generatedEntryId}`,
          tableName: "current_affairs",
          recordId: generatedEntryId,
          operation: "PUT",
          createdAt: Date.now(),
          status: "PENDING"
        });
      });

      console.log("✅ Success: Context committed and manual sync mutation queued securely.");
      alert("Intelligence context node committed securely to index registry.");
      
      setFormData({
        title: "", 
        summary: "", 
        source: "", 
        date: new Date().toISOString().split("T")[0],
        examType: "BOTH", 
        paperTags: [], 
        subjectTags: [], 
        topicTags: [], 
        subtopicTags: [], 
        parentIssueId: ""
      });
      
      if (editorRef.current) {
        editorRef.current.innerHTML = "";
      }

      window.dispatchEvent(new Event("syllabus-update"));

    } catch (error) {
      console.error("❌ CRITICAL DATABASE REJECTION ERROR:", error);
      alert(`Could not commit parameters to Registry index. Detail: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-left font-sans antialiased">
      {/* ==========================================
          SECTION 1: NODE DETAILS
          ========================================== */}
      <div className="bg-white border border-[#EBEFF8] rounded-2xl p-5 shadow-[0_8px_24px_rgba(235,240,248,0.35)] space-y-4">
        <h4 className="text-xs font-black text-slate-800 tracking-wider uppercase flex items-center gap-2 border-b border-slate-50 pb-2">
          📄 1. Node Details
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-[11px] font-black text-slate-700 uppercase tracking-wide">Node Title</label>
            <input 
              type="text" 
              value={formData.title} 
              onChange={e => setFormData(p=>({...p, title: e.target.value}))} 
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium placeholder-slate-400 focus:outline-none focus:border-indigo-500 text-slate-800 shadow-3xs transition-colors" 
              placeholder="E.g., Operational Parameters of Inflation Targeting Framework" 
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-black text-slate-700 uppercase tracking-wide">Timeline Anchor Date</label>
            <input 
              type="date" 
              value={formData.date} 
              onChange={e => setFormData(p=>({...p, date: e.target.value}))} 
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:border-indigo-500 shadow-3xs" 
            />
          </div>

          <div className="md:col-span-2 space-y-1.5">
            <label className="text-[11px] font-black text-slate-700 uppercase tracking-wide">Source Reference</label>
            <input 
              type="text" 
              value={formData.source} 
              onChange={e => setFormData(p=>({...p, source: e.target.value}))} 
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium placeholder-slate-400 focus:outline-none focus:border-indigo-500 text-slate-800 shadow-3xs transition-colors" 
              placeholder="E.g., The Hindu / PIB Node" 
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-black text-slate-700 uppercase tracking-wide">Exam Targeting Mode</label>
            <div className="grid grid-cols-3 gap-1 bg-slate-50 border border-slate-200/80 rounded-xl p-1">
              {["PRELIMS", "MAINS", "BOTH"].map(type => {
                const isCurrentMode = formData.examType === type;
                return (
                  <button 
                    key={type} 
                    type="button" 
                    onClick={() => setFormData(p=>({...p, examType: type}))} 
                    className={`py-1.5 text-[10px] font-black rounded-lg text-center transition-all ${
                      isCurrentMode 
                        ? "bg-white text-indigo-600 shadow-3xs border border-slate-200/60 font-black" 
                        : "text-slate-500 hover:bg-slate-100/50"
                    }`}
                  >
                    {isCurrentMode && type === "BOTH" ? "✓ Both" : type.charAt(0) + type.slice(1).toLowerCase()}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          SECTION 2: ANALYTICAL SUMMARY
          ========================================== */}
      <div className="bg-white border border-[#EBEFF8] rounded-2xl p-5 shadow-[0_8px_24px_rgba(235,240,248,0.35)] space-y-3">
        <div className="flex items-center justify-between border-b border-slate-50 pb-2">
          <h4 className="text-xs font-black text-slate-800 tracking-wider uppercase flex items-center gap-2">
            📄 2. Analytical Summary
          </h4>
          <span className="text-[10px] font-bold text-indigo-500 font-mono tracking-tight bg-indigo-50 px-2 py-0.5 rounded">
            Live Bold Format Activated
          </span>
        </div>

        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-3xs">
          <div className="bg-slate-50 border-b border-slate-200 px-3 py-1.5 flex flex-wrap items-center gap-4 text-slate-400">
            <div className="flex items-center gap-1.5 border-r border-slate-200 pr-4">
              <button type="button" onClick={toggleBoldInline} className="p-1 hover:text-slate-800 transition-colors font-black text-slate-700 text-xs"><Bold size={13} strokeWidth={2.5} /></button>
              <button type="button" className="p-1 hover:text-slate-800 transition-colors"><Italic size={13} strokeWidth={2.5} /></button>
            </div>
            <div className="flex items-center gap-1.5 border-r border-slate-200 pr-4">
              <button type="button" className="p-1 hover:text-slate-800 transition-colors"><List size={13} strokeWidth={2.5} /></button>
              <button type="button" className="p-1 hover:text-slate-800 transition-colors"><ListOrdered size={13} strokeWidth={2.5} /></button>
            </div>
            <div className="flex items-center gap-1.5 border-r border-slate-200 pr-4">
              <button type="button" className="p-1 hover:text-slate-800 transition-colors"><Link2 size={13} strokeWidth={2.5} /></button>
              <button type="button" className="p-1 hover:text-slate-800 transition-colors"><Quote size={13} strokeWidth={2.5} /></button>
            </div>
            <div className="flex items-center gap-1.5 ml-auto">
              <button type="button" className="p-1 hover:text-slate-800 transition-colors"><Undo2 size={13} strokeWidth={2.5} /></button>
              <button type="button" className="p-1 hover:text-slate-800 transition-colors"><Redo2 size={13} strokeWidth={2.5} /></button>
            </div>
          </div>

          <div 
            ref={editorRef}
            contentEditable
            onInput={handleEditorChange}
            className="w-full bg-white px-4 py-3 text-xs font-medium text-slate-800 placeholder-slate-400 outline-none min-h-[140px] max-h-[320px] overflow-y-auto font-sans leading-relaxed text-left"
            style={{ whiteSpace: "pre-wrap" }}
          />
        </div>
      </div>

      {/* ==========================================
          SECTION 3: CLASSIFICATION MAPPING DECK
          ========================================== */}
      <div className="bg-white border border-[#EBEFF8] rounded-2xl p-5 shadow-[0_8px_24px_rgba(235,240,248,0.35)] space-y-4">
        <h4 className="text-xs font-black text-slate-800 tracking-wider uppercase flex items-center gap-2 border-b border-slate-50 pb-2">
          🏷️ 3. Classification
        </h4>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-700 uppercase tracking-wide block">1. Paper Selection Mapping (Multi-Select)</label>
            <div className="flex flex-wrap gap-1.5">
              {["GS1", "GS2", "GS3", "GS4"].map(p => {
                const active = formData.paperTags.includes(p);
                return (
                  <button 
                    key={p} 
                    type="button" 
                    onClick={() => handleMultiSelect("paperTags", p)} 
                    className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all flex items-center gap-2 select-none ${
                      active 
                        ? "bg-[#E8EEFF] border-[#B8CFFF] text-indigo-600 font-black shadow-3xs" 
                        : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    <input type="checkbox" readOnly checked={active} className="accent-indigo-600 pointer-events-none h-3 w-3 rounded" />
                    {p.slice(0,2) + " " + p.slice(2)}
                  </button>
                );
              })}
            </div>
          </div>

          {availableSubjects.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-100/60">
              <label className="text-[11px] font-black text-slate-700 uppercase tracking-wide block">2. Connected Syllabus Subject Mapping</label>
              <div className="flex flex-wrap gap-1.5 max-h-[140px] overflow-y-auto bg-slate-50/50 p-2 rounded-xl border border-slate-200/60">
                {availableSubjects.map(s => {
                  const active = formData.subjectTags.includes(s.id);
                  return (
                    <button 
                      key={s.id} 
                      type="button" 
                      onClick={() => handleMultiSelect("subjectTags", s.id)} 
                      className={`px-3 py-1.5 text-xs rounded-xl border transition-all ${
                        active ? "bg-indigo-600 border-indigo-600 text-white font-bold shadow-3xs" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {s.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {availableTopics.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-100/60">
              <label className="text-[11px] font-black text-slate-700 uppercase tracking-wide block">3. Relational Topic Node Target</label>
              <div className="flex flex-wrap gap-1.5 max-h-[140px] overflow-y-auto bg-slate-50/50 p-2 rounded-xl border border-slate-200/60">
                {availableTopics.map(t => {
                  const active = formData.topicTags.includes(t.id);
                  return (
                    <button 
                      key={t.id} 
                      type="button" 
                      onClick={() => handleMultiSelect("topicTags", t.id)} 
                      className={`px-3 py-1.5 text-[11px] rounded-xl border transition-all ${
                        active ? "bg-amber-600 border-amber-600 text-white font-bold shadow-3xs" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {t.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {availableSubtopics.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-100/60">
              <label className="text-[11px] font-black text-slate-700 uppercase tracking-wide block">4. Relational Subtopic Node Target</label>
              <div className="flex flex-wrap gap-1.5 max-h-[140px] overflow-y-auto bg-slate-50/50 p-2 rounded-xl border border-slate-200/60">
                {availableSubtopics.map(st => {
                  const active = formData.subtopicTags.includes(st.id);
                  return (
                    <button 
                      key={st.id} 
                      type="button" 
                      onClick={() => handleMultiSelect("subtopicTags", st.id)} 
                      className={`px-3 py-1.5 text-[11px] rounded-xl border transition-all ${
                        active ? "bg-emerald-600 border-emerald-600 text-white font-bold shadow-3xs" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {st.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="space-y-1.5 pt-2 border-t border-slate-100/60">
            <label className="text-[11px] font-black text-slate-700 uppercase tracking-wide block">
              Evolution Linkage ({filteredIssues.length} Contextually Related Nodes Available)
            </label>
            <div className="relative">
              <select 
                value={formData.parentIssueId} 
                onChange={e => setFormData(p=>({...p, parentIssueId: e.target.value}))} 
                className="w-full bg-white border border-slate-200 text-slate-700 font-bold rounded-xl px-4 py-2.5 text-xs outline-none focus:border-indigo-500 shadow-3xs appearance-none cursor-pointer"
                style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', backgroundSize: '12px' }}
              >
                <option value="">-- Disconnected Standalone Root Issue --</option>
                {filteredIssues.map(issue => (
                  <option key={issue.id} value={issue.id}>[{issue.date}] {issue.title}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          BOTTOM PERSISTENT BAR CONTROLS DOCK 
          ========================================== */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white border border-[#EBEFF8] rounded-2xl p-4 shadow-[0_4px_16px_rgba(235,240,248,0.25)] gap-4">
        <div className="flex items-center gap-2 text-slate-400 pl-1">
          <CloudCheck size={16} className="text-indigo-500" />
          <div>
            <h5 className="text-[10px] font-black uppercase text-slate-600 tracking-wide leading-none">Status</h5>
            <p className="text-[9px] text-slate-400 font-semibold mt-0.5">Ready to post configuration indexes</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            type="button"
            className="flex-1 sm:flex-initial px-4 py-2.5 text-xs font-black rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-all shadow-3xs flex items-center justify-center gap-1.5"
          >
            Save Draft
          </button>
          <button
            type="submit"
            className="flex-1 sm:flex-initial px-5 py-2.5 text-xs font-black rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-md flex items-center justify-center gap-1.5 tracking-wide active:scale-98"
          >
            <Send size={12} strokeWidth={2.5} /> Publish to Knowledge Registry
          </button>
        </div>
      </div>
    </form>
  );
}

export default AdminCAForm;