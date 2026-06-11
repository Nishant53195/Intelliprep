import React, { useState } from "react";
import useOnboardingStore from "../../store/onboardingStore";
import OnboardingCard from "../OnboardingCard";
import { syncEngine } from "../../../database/services/syncEngine";
import { auth } from "../../../firebase/firestore/config";
import useScheduleStore from "../../../scheduler/store/scheduleStore";
import { generateDailySchedule } from "../../../scheduler/engine/generateDailySchedule";

function WelcomeStep() {
  const name = useOnboardingStore((state) => state.name);
  const setName = useOnboardingStore((state) => state.setName);
  const nextStep = useOnboardingStore((state) => state.nextStep);
  const completeOnboarding = useOnboardingStore((state) => state.completeOnboarding);
  const { setTodayTasks } = useScheduleStore();

  // Loading & status states for the manual cloud pull operation
  const [loadingCloud, setLoadingCloud] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleLoadCloudBackup = async () => {
    const currentUserId = auth.currentUser ? auth.currentUser.uid : null;

    if (!currentUserId || currentUserId === "local_user") {
      setIsError(true);
      setFeedbackMessage("No authenticated Google profile detected. Please sign in first.");
      return;
    }

    setLoadingCloud(true);
    setIsError(false);
    setFeedbackMessage("Checking Firestore for existing sync snapshots...");

    try {
      // 1. Direct manual pull download request to Firestore collections
      const outcome = await syncEngine.pullCloudChangesToLocal(currentUserId);
      
      if (outcome.success) {
        setFeedbackMessage("Data downloaded successfully! Reassembling schedule paths...");

        // 2. Recalculate schedule timelines from the newly loaded database state parameters
        const activeTasks = await generateDailySchedule(currentUserId);
        
        // 3. Immediately update global schedule state values to avoid blank states
        setTodayTasks({
          gsTasks: activeTasks.filter((t) => t.type === "gs"),
          optionalTasks: activeTasks.filter((t) => t.type === "optional"),
          revisionTasks: activeTasks.filter((t) => t.type === "revision"),
          practiceTasks: activeTasks.filter((t) => t.type === "practice"),
        });

        setFeedbackMessage("Backup detected and successfully synchronized! Launching workspace...");
        
        // 4. Notify the Zustand store that onboarding is skipped/complete
        completeOnboarding();
        
        // 5. CRITICAL FIX: Explicitly set local storage flag so the router guard resolves immediately on boot
        localStorage.setItem("intelliprep_onboarding_completed", "true");
        
        // 6. Redirect directly to workspace dashboard via state refresh
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      } else {
        setIsError(true);
        setFeedbackMessage("Data not available: No prior backup exists for this account. Please continue onboarding.");
      }
    } catch (err) {
      console.error("[Onboarding Cloud Verification Error]:", err);
      setIsError(true);
      setFeedbackMessage("Data not available: Your cloud profile is currently empty. Please proceed manually.");
    } finally {
      setLoadingCloud(false);
    }
  };

  return (
    <OnboardingCard
      title="Welcome to IntelliPrep"
      description="Your intelligent UPSC preparation system."
    >
      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Your Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name..."
            disabled={loadingCloud}
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-white placeholder-slate-600 outline-none transition-all focus:border-cyan-500/50 focus:bg-white/[0.05] focus:ring-1 focus:ring-cyan-500/50 disabled:opacity-40"
          />
        </div>

        {/* Feedback message overlay layout panel block */}
        {feedbackMessage && (
          <div 
            className={`p-3.5 border text-xs font-mono text-left rounded-xl transition-all ${
              isError 
                ? "bg-red-500/10 border-red-500/20 text-red-300" 
                : "bg-cyan-500/10 border-cyan-500/20 text-cyan-300 animate-pulse"
            }`}
          >
            {feedbackMessage}
          </div>
        )}

        {/* Layout footer layout cluster */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-end gap-4 pt-2">
          {/* Load existing profile button choice node */}
          <button
            type="button"
            disabled={loadingCloud}
            onClick={handleLoadCloudBackup}
            className="w-full sm:w-auto px-6 py-4 border border-white/10 bg-white/5 hover:bg-white/10 active:scale-95 disabled:opacity-40 text-sm font-semibold text-slate-300 rounded-2xl transition-all shadow-md cursor-pointer"
          >
            {loadingCloud ? "Verifying Archive..." : "Load Existing Cloud Backup"}
          </button>

          {/* Regular Manual Wizard Multi-Step Flow Router button */}
          <button
            type="button"
            onClick={nextStep}
            disabled={!name.trim() || loadingCloud}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:hover:scale-100 text-sm font-semibold text-white rounded-2xl transition-all shadow-lg cursor-pointer"
          >
            Continue
          </button>
        </div>
      </div>
    </OnboardingCard>
  );
}

export default WelcomeStep;