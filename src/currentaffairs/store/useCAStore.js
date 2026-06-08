// src/currentaffairs/store/useCAStore.js
import { create } from "zustand";
import { db } from "../../database/dexie";
import caQueryEngine from "../services/caQueryEngine";

const useCAStore = create((set, get) => ({
  activeTab: "read_ca",
  timeChip: "today", // "today" or "all"
  userFilters: {
    examType: "BOTH",
    papers: [],
    subjects: [],
    topics: [],
    subtopics: [],
    timelineMode: "all", // "all", "weekly", "monthly", "yearly", "quarterly"
    selectedMonth: "",
    selectedWeeks: [],
    selectedMonths: [],
    selectedQuarters: [],
    selectedYears: []
  },
  
  setActiveTab: (tab) => set({ activeTab: tab }),
  
  setTimeChip: (chip) => set({ timeChip: chip }),
  
  updateUserFilters: (fields) => 
    set((state) => ({ userFilters: { ...state.userFilters, ...fields } })),
    
  resetUserFilters: () => set((state) => ({
    userFilters: {
      examType: "BOTH",
      papers: [],
      subjects: [],
      topics: [],
      subtopics: [],
      timelineMode: state.userFilters.timelineMode, // Keep the active tab view mode
      selectedMonth: "",
      selectedWeeks: [],
      selectedMonths: [],
      selectedQuarters: [],
      selectedYears: []
    }
  })),
  
  fetchFilteredCA: async () => {
    const { timeChip, userFilters } = get();
    // Directly pull raw rows from Dexie local indexed database cache
    const rawEntries = await db.current_affairs.toArray();
    return caQueryEngine.filterEntries(rawEntries, userFilters, timeChip);
  }
}));

export default useCAStore;