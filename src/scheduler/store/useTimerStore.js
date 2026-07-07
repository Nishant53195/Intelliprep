// src/scheduler/store/useTimerStore.js
import { create } from "zustand";

let timerInterval = null;

const useTimerStore = create((set, get) => {
  // Pull previous session records safely on initialization step runs
  const savedSeconds = localStorage.getItem("intelliprep_timer_seconds");
  const wasActiveBeforeRefresh = localStorage.getItem("intelliprep_timer_active") === "true";
  const wasPausedBeforeRefresh = localStorage.getItem("intelliprep_timer_paused") === "true";
  const lastTimestamp = localStorage.getItem("intelliprep_timer_timestamp");

  let initialSeconds = parseInt(savedSeconds, 10) || 0;

  // Track elapsed background durations if the user refreshed mid-run
  if (wasActiveBeforeRefresh && lastTimestamp && initialSeconds > 0) {
    const elapsedSecondsSinceDisconnect = Math.floor((Date.now() - parseInt(lastTimestamp, 10)) / 1000);
    initialSeconds = Math.max(0, initialSeconds - elapsedSecondsSinceDisconnect);
  }

  // Auto-resume ticking routine loops if the session was active prior to window reload
  if (initialSeconds > 0 && wasActiveBeforeRefresh) {
    setTimeout(() => {
      get().initInterval();
    }, 50);
  }

  return {
    hoursInput: "",
    minutesInput: "",
    remainingSeconds: initialSeconds,
    isActive: initialSeconds > 0 && wasActiveBeforeRefresh,
    isPaused: initialSeconds > 0 && wasPausedBeforeRefresh,

    setHoursInput: (val) => set({ hoursInput: val }),
    setMinutesInput: (val) => set({ minutesInput: val }),

    startTimer: () => {
      const { hoursInput, minutesInput, isPaused } = get();
      
      if (isPaused) {
        set({ isActive: true, isPaused: false });
        localStorage.setItem("intelliprep_timer_active", "true");
        localStorage.setItem("intelliprep_timer_paused", "false");
        get().initInterval();
        return;
      }

      const hrs = parseInt(hoursInput, 10) || 0;
      const mins = parseInt(minutesInput, 10) || 0;
      const totalSeconds = (hrs * 3600) + (mins * 60);

      if (totalSeconds <= 0) return;

      set({
        remainingSeconds: totalSeconds,
        isActive: true,
        isPaused: false,
      });

      localStorage.setItem("intelliprep_timer_seconds", totalSeconds.toString());
      localStorage.setItem("intelliprep_timer_active", "true");
      localStorage.setItem("intelliprep_timer_paused", "false");
      localStorage.setItem("intelliprep_timer_timestamp", Date.now().toString());

      get().initInterval();
    },

    pauseTimer: () => {
      if (timerInterval) clearInterval(timerInterval);
      set({ isActive: false, isPaused: true });
      localStorage.setItem("intelliprep_timer_active", "false");
      localStorage.setItem("intelliprep_timer_paused", "true");
      localStorage.setItem("intelliprep_timer_timestamp", Date.now().toString());
    },

    resetTimer: () => {
      if (timerInterval) clearInterval(timerInterval);
      set({
        hoursInput: "",
        minutesInput: "",
        remainingSeconds: 0,
        isActive: false,
        isPaused: false,
      });
      localStorage.removeItem("intelliprep_timer_seconds");
      localStorage.removeItem("intelliprep_timer_active");
      localStorage.removeItem("intelliprep_timer_paused");
      localStorage.removeItem("intelliprep_timer_timestamp");
    },

    initInterval: () => {
      if (timerInterval) clearInterval(timerInterval);
      
      timerInterval = setInterval(() => {
        const { remainingSeconds } = get();
        if (remainingSeconds <= 1) {
          clearInterval(timerInterval);
          set({
            remainingSeconds: 0,
            isActive: false,
            isPaused: false,
            hoursInput: "",
            minutesInput: "",
          });
          localStorage.removeItem("intelliprep_timer_seconds");
          localStorage.removeItem("intelliprep_timer_active");
          localStorage.removeItem("intelliprep_timer_paused");
          localStorage.removeItem("intelliprep_timer_timestamp");
          alert("⏱️ Timer Complete! Block milestone reached.");
        } else {
          const nextSeconds = remainingSeconds - 1;
          set({ remainingSeconds: nextSeconds });
          
          // Sync state parameters to storage periodically
          localStorage.setItem("intelliprep_timer_seconds", nextSeconds.toString());
          localStorage.setItem("intelliprep_timer_timestamp", Date.now().toString());
        }
      }, 1000);
    }
  };
});

export default useTimerStore;