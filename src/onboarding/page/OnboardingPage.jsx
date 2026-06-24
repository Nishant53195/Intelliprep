// src/onboarding/page/OnboardingPage.jsx
import { useState, useEffect } from "react";
import useOnboardingStore from "../store/onboardingStore";
import OnboardingLayout from "../components/OnboardingLayout";
import OnboardingSidebar from "../components/OnboardingSidebar";
import WelcomeStep from "../components/steps/WelcomeStep";
import PreparationStep from "../components/steps/PreparationStep";
import GSSequenceStep from "../components/steps/GSSequenceStep";
import OptionalSequenceStep from "../components/steps/OptionalSequenceStep";
import InitializationStep from "../components/steps/InitializationStep";
import { auth, firestoreDb } from "../../firebase/firestore/config";
import { doc, getDoc } from "firebase/firestore";
import { syncEngine } from "../../database/services/syncEngine";
import { generateDailySchedule } from "../../scheduler/engine/generateDailySchedule";
import useScheduleStore from "../../scheduler/store/scheduleStore";
import { db } from "../../database/dexie";

function OnboardingPage() {
  const currentStep = useOnboardingStore((state) => state.currentStep);
  const optionalSubject = useOnboardingStore((state) => state.optionalSubject);
  const completeOnboarding = useOnboardingStore((state) => state.completeOnboarding);
  const { setTodayTasks } = useScheduleStore();

  // Lifecycle states to block onboarding rendering if cloud profiles exist
  const [checkingProfile, setCheckingProfile] = useState(true);
  const [cloudProfileFound, setCloudProfileFound] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [statusMessage, setFeedbackMessage] = useState("");

  // 1. SYSTEM GATE PRE-CHECK: Intercept mount instantly before steps render
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (!currentUser || currentUser.uid === "local_user") {
        setCheckingProfile(false);
        return;
      }

      try {
        // Check master onboarding_config table for existing profiles matching this uid
        const configDocRef = doc(firestoreDb, "onboarding_config", currentUser.uid);
        const snapshot = await getDoc(configDocRef);

        if (snapshot.exists()) {
          setCloudProfileFound(true);
        } else {
          setCheckingProfile(false);
        }
      } catch (err) {
        console.error("[Onboarding Gate Lookup Failed]:", err);
        setCheckingProfile(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // 2. CENTRAL ACCESS DOWNLOAD HANDSHAKE RUNTIME
  const handleDirectDashboardLoad = async () => {
    const currentUserId = auth.currentUser ? auth.currentUser.uid : null;
    if (!currentUserId) return;

    setLoadingData(true);
    setFeedbackMessage("Downloading master profile configurations from cloud storage...");

    try {
      const outcome = await syncEngine.pullCloudChangesToLocal(currentUserId);
      
      if (outcome.success) {
        setFeedbackMessage("Cleaning system logs and initializing day schedules...");

        // Wait for Dexie write hooks to process before flushing the mutation tracker queue
        setTimeout(async () => {
          try {
            await db.sync_queue.clear(); // Empty sync_queue completely
            
            const activeTasks = await generateDailySchedule(currentUserId);
            setTodayTasks({
              gsTasks: activeTasks.filter((t) => t.type === "gs"),
              optionalTasks: activeTasks.filter((t) => t.type === "optional"),
              revisionTasks: activeTasks.filter((t) => t.type === "revision"),
              practiceTasks: activeTasks.filter((t) => t.type === "practice"),
            });

            // Set state indicators to concluded
            completeOnboarding();
            localStorage.setItem("intelliprep_onboarding_completed", "true");

            setFeedbackMessage("Launching dashboard workspace directly...");

            // Hard redirect to clear out of /onboarding route parameters completely
            window.location.href = window.location.origin + "/";
          } catch (dbErr) {
            console.error("Dexie sync clearance anomaly:", dbErr);
            window.location.href = window.location.origin + "/";
          }
        }, 500);
      } else {
        setCloudProfileFound(false);
        setCheckingProfile(false);
      }
    } catch (err) {
      console.error("Cloud synchronization mapping drop:", err);
      setCloudProfileFound(false);
      setCheckingProfile(false);
    } finally {
      if (!statusMessage.includes("Launching")) {
        setLoadingData(false);
      }
    }
  };

  function renderStep() {
    switch (currentStep) {
      case 1:
        return <WelcomeStep />;
      case 2:
        return <PreparationStep />;
      case 3:
        return <GSSequenceStep />;
      case 4:
        // Force React to unmount and mount smoothly when the active subject changes
        return <OptionalSequenceStep key={optionalSubject} />;
      case 5:
        return <InitializationStep />;
      default:
        return <WelcomeStep />;
    }
  }

  // Render a clean Choice Prompt if existing profile rows are found in Firestore
  if (cloudProfileFound) {
    return (
      <div className="min-h-screen w-full bg-[#0F172A] text-white flex items-center justify-center font-sans antialiased p-4">
        <div className="w-full max-w-md bg-[#1E293B]/60 border border-white/10 rounded-3xl p-6 space-y-6 text-center shadow-xl backdrop-blur-md">
          <div className="text-3xl">🔄</div>
          <div>
            <h3 className="text-lg font-black tracking-tight text-white">Existing Workspace Discovered</h3>
            <p className="text-xs font-medium text-slate-400 mt-1">We found verified data tracking logs safe on our servers.</p>
          </div>

          {statusMessage && (
            <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-mono text-[11px] rounded-xl text-left animate-pulse">
              {statusMessage}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-end pt-2 w-full">
            <button
              type="button"
              disabled={loadingData}
              onClick={() => {
                setCloudProfileFound(false);
                setCheckingProfile(false);
              }}
              className="w-full sm:w-auto px-5 py-3.5 text-xs font-black uppercase text-red-400 border border-red-500/20 bg-red-950/10 hover:bg-red-950/20 rounded-xl transition-all cursor-pointer disabled:opacity-30"
            >
              Reset & Start Fresh
            </button>
            <button
              type="button"
              disabled={loadingData}
              onClick={handleDirectDashboardLoad}
              className="w-full sm:w-auto px-6 py-3.5 text-xs font-black uppercase text-white bg-gradient-to-r from-cyan-600 to-indigo-600 rounded-xl transition-all hover:scale-103 shadow-md cursor-pointer disabled:opacity-40"
            >
              {loadingData ? "Syncing Workspace..." : "Load Data & Enter Dashboard"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Structural placeholder to hold layout compilation rules safely
  if (checkingProfile) {
    return (
      <div className="min-h-screen w-full bg-[#0F172A] flex flex-col items-center justify-center space-y-3 font-mono text-xs text-cyan-400">
        <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="animate-pulse">Verifying App Routing Constraints...</p>
      </div>
    );
  }

  return (
    <OnboardingLayout sidebar={<OnboardingSidebar currentStep={currentStep} />}>
      {renderStep()}
    </OnboardingLayout>
  );
}

export default OnboardingPage;