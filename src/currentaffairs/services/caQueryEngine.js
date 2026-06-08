// src/currentaffairs/services/caQueryEngine.js
import dayjs from "dayjs";

export const caQueryEngine = {
  /**
   * Universal Dynamic Filtering Engine
   */
  filterEntries(entries = [], filters = {}, timeChip = "today") {
    const normalizedTimeChip = String(timeChip).toLowerCase().trim();
    const todayStr = dayjs().format("YYYY-MM-DD");

    // 1. Isolate strictly by today's date if on "Today's CA" tab
    if (normalizedTimeChip === "today") {
      return entries.filter(item => item.date === todayStr);
    }

    // =========================================================
    // ALL CA DECK MATRIX PIPELINE
    // =========================================================
    let filteredResults = [...entries];

    // 2. Filter by Target Scope (PRELIMS / MAINS)
    if (filters.examType && filters.examType !== "BOTH") {
      filteredResults = filteredResults.filter(item => 
        String(item.examType).toUpperCase() === String(filters.examType).toUpperCase() || 
        String(item.examType).toUpperCase() === "BOTH"
      );
    }

    // 3. Filter by GS Paper Array Selections
    if (filters.papers && filters.papers.length > 0) {
      filteredResults = filteredResults.filter(item => item.paperTag && filters.papers.includes(item.paperTag));
    }

    // 4. Filter by Subject Array Selections
    if (filters.subjects && filters.subjects.length > 0) {
      filteredResults = filteredResults.filter(item => item.subjectTag && filters.subjects.includes(item.subjectTag));
    }

    // 5. Filter by Topic Array Selections
    if (filters.topics && filters.topics.length > 0) {
      filteredResults = filteredResults.filter(item => item.topicTag && filters.topics.includes(item.topicTag));
    }

    // 6. Filter by Subtopic Array Selections
    if (filters.subtopics && filters.subtopics.length > 0) {
      filteredResults = filteredResults.filter(item => item.subtopicTag && filters.subtopics.includes(item.subtopicTag));
    }

    // 7. Chronological Window Filters
    const mode = filters.timelineMode;
    if (mode && mode !== "all") {
      filteredResults = filteredResults.filter(item => {
        const itemDate = dayjs(item.date);
        if (!itemDate.isValid()) return false;

        const itemYear = itemDate.format("YYYY");
        const itemMonth = itemDate.format("MMMM").toLowerCase().trim(); // converts to e.g. "june"
        
        // A. Weekly Grid Filter
        if (mode === "weekly") {
          if (filters.selectedMonth && itemMonth !== String(filters.selectedMonth).toLowerCase().trim()) {
            return false;
          }
          if (filters.selectedWeeks && filters.selectedWeeks.length > 0) {
            const dayOfMonth = itemDate.date();
            const weekIndex = Math.min(4, Math.ceil(dayOfMonth / 7)).toString();
            return filters.selectedWeeks.includes(weekIndex);
          }
          return true;
        }

        // B. Monthly Deck Filter (Safe Lowercase Fallback)
        if (mode === "monthly") {
          if (!filters.selectedMonth) return true; // If no month is clicked, show all matching categories
          return itemMonth === String(filters.selectedMonth).toLowerCase().trim();
        }

        // C. Quarterly Log Filter
        if (mode === "quarterly") {
          if (!filters.selectedQuarters || filters.selectedQuarters.length === 0) return true;
          const quarterNum = Math.ceil((itemDate.month() + 1) / 3).toString();
          return filters.selectedQuarters.includes(quarterNum);
        }

        // D. Yearly Horizon Filter
        if (mode === "yearly") {
          if (!filters.selectedYears || filters.selectedYears.length === 0) return true;
          return filters.selectedYears.some(yearRange => {
            if (yearRange.includes("-")) {
              const parts = yearRange.split("-");
              return itemYear === parts[0] || itemYear === parts[1];
            }
            return itemYear === yearRange;
          });
        }

        return true;
      });
    }

    // Sort chronologically newest first
    return filteredResults.sort((a, b) => dayjs(b.date).diff(dayjs(a.date)));
  }
};

export default caQueryEngine;