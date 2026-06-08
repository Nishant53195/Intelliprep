// src/currentaffairs/components/CAReadDeck.jsx
import { useEffect, useState } from "react";
import useCAStore from "../store/useCAStore";
import CAEvolutionTimeline from "./CAEvolutionTimeline";
import pdfExportService from "../services/pdfExportService";
import gsSyllabus from "../../constants/gsSyllabus";

function CAReadDeck() {
  const { fetchFilteredCA, timeChip, userFilters } = useCAStore();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEvolutionId, setSelectedEvolutionId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-fetch entries whenever tabs or filter metrics are touched
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchFilteredCA()
      .then((data) => {
        if (isMounted) {
          setArticles(data || []);
          setCurrentIndex(0);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("CA Database lookup failed:", err);
        if (isMounted) {
          setArticles([]);
          setLoading(false);
        }
      });

    return () => { isMounted = false; };
  }, [fetchFilteredCA, timeChip, userFilters]);

  const resolveAllSyllabusNames = (item) => {
    if (!item) return { subjects: [], topics: [], subtopics: [] };
    const matchedSubjects = [];
    const matchedTopics = [];
    const matchedSubtopics = [];

    const subjectTags = Array.isArray(item.subjectTag) ? item.subjectTag : (item.subjectTag ? [item.subjectTag] : []);
    const topicTags = Array.isArray(item.topicTag) ? item.topicTag : (item.topicTag ? [item.topicTag] : []);
    const subtopicTags = Array.isArray(item.subtopicTag) ? item.subtopicTag : (item.subtopicTag ? [item.subtopicTag] : []);

    gsSyllabus.forEach((subjectObj) => {
      if (subjectTags.includes(subjectObj.id)) matchedSubjects.push(subjectObj.name);
      subjectObj.topics?.forEach((topicObj) => {
        if (topicTags.includes(topicObj.id)) matchedTopics.push(topicObj.name);
        topicObj.subtopics?.forEach((subsubObj) => {
          if (subtopicTags.includes(subsubObj.id)) matchedSubtopics.push(subsubObj.name);
        });
      });
    });

    return { subjects: matchedSubjects, topics: matchedTopics, subtopics: matchedSubtopics };
  };

  const handlePrevCard = () => currentIndex > 0 && setCurrentIndex(p => p - 1);
  const handleNextCard = () => currentIndex < articles.length - 1 && setCurrentIndex(p => p + 1);

  if (loading) {
    return (
      <div className="py-12 text-center space-y-2">
        <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-sm font-medium text-slate-400 animate-pulse">Filtering active database entries...</p>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="border border-dashed border-slate-200 rounded-2xl p-12 text-center bg-slate-50/50 my-2">
        <span className="text-3xl">📭</span>
        <h4 className="text-sm font-black text-slate-700 mt-2 uppercase tracking-wide">No Records Match This Selection</h4>
        <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
          No published content satisfies your active dimensional filter configurations right now.
        </p>
      </div>
    );
  }

  const currentItem = articles[currentIndex];
  const names = resolveAllSyllabusNames(currentItem);
  const hasSyllabusLinks = names.subjects.length > 0 || names.topics.length > 0 || names.subtopics.length > 0;

  return (
    <div className="space-y-5 relative w-full">
      {/* HEADER META STRIP */}
      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-sm">
        <span className="text-[12px] font-black text-slate-700 uppercase tracking-wide">
          📚 Card {currentIndex + 1} of {articles.length} Matches Found
        </span>
        <button
          onClick={() => pdfExportService.exportArticles(articles)}
          className="flex items-center gap-1.5 px-3 py-1 bg-slate-900 text-white text-[11px] font-bold rounded-lg shadow-sm"
        >
          📥 Export PDF Bundle
        </button>
      </div>

      {/* CAROUSEL BODY BOX */}
      <div className="relative group px-12">
        <button
          type="button"
          onClick={handlePrevCard}
          disabled={currentIndex === 0}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-slate-200 text-slate-700 rounded-full flex items-center justify-center shadow-md ${currentIndex === 0 ? "opacity-20 cursor-not-allowed" : "opacity-90 hover:bg-slate-50"}`}
        >
          🡨
        </button>

        <div className="w-full bg-white border border-slate-200 rounded-3xl p-6 md:p-8 lg:p-10 shadow-sm text-left flex flex-col justify-between space-y-5 min-h-[420px]">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-black px-2.5 py-0.5 rounded uppercase bg-indigo-50 border border-indigo-200 text-indigo-700">
                  {currentItem.examType}
                </span>
                <span className="text-[12px] text-slate-400 font-semibold">{currentItem.date}</span>
              </div>
              <span className="text-[11px] bg-slate-100 text-slate-600 font-black px-2.5 py-0.5 rounded-md truncate">
                Source: {currentItem.source}
              </span>
            </div>

            {hasSyllabusLinks && (
              <div className="bg-slate-50/80 border border-slate-100/80 rounded-xl p-3.5 space-y-2 text-[11px]">
                {names.subjects.map((sub, i) => <div key={i} className="truncate"><span className="font-bold text-indigo-700 mr-2">Subject:</span>{sub}</div>)}
                {names.topics.map((top, i) => <div key={i} className="truncate"><span className="font-bold text-amber-700 mr-2">Topic:</span>{top}</div>)}
                {names.subtopics.map((st, i) => <div key={i} className="truncate"><span className="font-bold text-emerald-700 mr-2">Subtopic:</span>{st}</div>)}
              </div>
            )}

            <div className="space-y-4 pt-1">
              <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-snug">{currentItem.title}</h3>
              <div className="h-px bg-slate-100 w-full" />
              
              {/* Renders content-editable browser HTML strings inside layout nicely */}
              <div 
                className="text-[16px] text-slate-700 leading-relaxed space-y-2.5 font-normal whitespace-pre-wrap pr-1"
                dangerouslySetInnerHTML={{ __html: currentItem.summary }}
              />
            </div>
          </div>

          {/* TIMELINE ACCORDION EXPANSIONS */}
          <div className="pt-4 border-t border-slate-100 mt-auto w-full">
            {currentItem.issueEvolutionIds?.length > 0 ? (
              <div className="w-full space-y-4">
                <button
                  type="button"
                  onClick={() => setSelectedEvolutionId(selectedEvolutionId === currentItem.id ? null : currentItem.id)}
                  className="w-full sm:w-auto text-[13px] font-black text-cyan-700 bg-cyan-50 border border-cyan-200/60 px-5 py-2.5 rounded-xl flex items-center gap-2"
                >
                  ⏱️ {selectedEvolutionId === currentItem.id ? "Minimize Evolution Timeline View" : "Expand Full Issue Evolution Roadmap"}
                </button>
                {selectedEvolutionId === currentItem.id && (
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 w-full max-h-[350px] overflow-y-auto">
                    <CAEvolutionTimeline rootEntry={currentItem} />
                  </div>
                )}
              </div>
            ) : <span className="text-[11px] text-slate-400 font-semibold italic bg-slate-50 px-3 py-1.5 rounded-lg border">🌱 Standalone Historical Root Entry Node</span>}
          </div>
        </div>

        <button
          type="button"
          onClick={handleNextCard}
          disabled={currentIndex === articles.length - 1}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-slate-200 text-slate-700 rounded-full flex items-center justify-center shadow-md ${currentIndex === articles.length - 1 ? "opacity-20 cursor-not-allowed" : "opacity-90 hover:bg-slate-50"}`}
        >
          🡪
        </button>
      </div>

      {/* TRACKER INDICATOR DOTS */}
      <div className="flex items-center justify-center gap-1.5 pt-1 flex-wrap max-w-md mx-auto">
        {articles.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-200 outline-none ${idx === currentIndex ? "w-6 bg-indigo-600" : "w-1.5 bg-slate-300"}`}
          />
        ))}
      </div>
    </div>
  );
}

export default CAReadDeck;