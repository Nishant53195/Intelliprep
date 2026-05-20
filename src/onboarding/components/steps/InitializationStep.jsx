import { useEffect, useRef, useState } from "react";
import useOnboardingStore from "../../store/onboardingStore";
import { saveOnboarding } from "../../../database/repositories/onboardingRepository";
import useLoginStore from "../../../login/store/loginStore"; 
import OnboardingCard from "../OnboardingCard";
import { useNavigate } from "react-router-dom";

function InitializationStep() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const hasInitialized = useRef(false);

  const completeOnboarding = useOnboardingStore((state) => state.completeOnboarding);
  const name = useOnboardingStore((state) => state.name);
  const attemptYear = useOnboardingStore((state) => state.attemptYear);
  const optionalSubject = useOnboardingStore((state) => state.optionalSubject);
  const dailyStudyHours = useOnboardingStore((state) => state.dailyStudyHours);
  const gsSequence = useOnboardingStore((state) => state.gsSequence);
  const optionalSequence = useOnboardingStore((state) => state.optionalSequence);
  
  const user = useLoginStore((state) => state.user);

  async function runInitialization() {
    const steps = [
      "Loading UPSC Core Engine...",
      "Loading GS Intelligence...",
      "Loading Optional Intelligence...",
      "Initializing Smart Revision...",
      "Initializing Smart Scheduler ...",
      "Preparing Smart Analytics...",
      "Syncing User Configuration...",
      "Finalizing IntelliPrep OS...",
      "System Ready.",
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 700));
      setLogs((prev) => [...prev, steps[i]]);
    }
  }

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;
    runInitialization();
  }, []);

  // UI Calculations based strictly on the existing logic
  const totalSteps = 9;
  const currentStepCount = logs.length;
  const progressPercentage = Math.round((currentStepCount / totalSteps) * 100);
  const currentMessage = currentStepCount > 0 ? logs[currentStepCount - 1] : "Booting sequence...";
  const isComplete = currentStepCount === totalSteps;

  // SVG Circle calculations
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  return (
    <OnboardingCard
      title={isComplete ? "System Ready" : "Initializing Engine"}
      description={isComplete ? "All systems are perfectly synchronized." : `Setting up your intelligent UPSC system${name ? `, ${name}` : ""}`}
    >
      <div className="flex flex-col items-center justify-center py-6">
        
        {/* Glowing Circular Progress Loader */}
        <div className="relative flex h-48 w-48 items-center justify-center">
          
          {/* Ambient Glow that gets brighter as it loads */}
          <div 
            className="absolute inset-0 rounded-full bg-cyan-500/20 blur-2xl transition-opacity duration-700" 
            style={{ opacity: isComplete ? 1 : progressPercentage / 100 }} 
          />

          <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 150 150">
            {/* Background Track */}
            <circle
              cx="75"
              cy="75"
              r={radius}
              fill="none"
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth="8"
            />
            {/* Animated Progress Ring */}
            <circle
              cx="75"
              cy="75"
              r={radius}
              fill="none"
              stroke="url(#loaderGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
            <defs>
              <linearGradient id="loaderGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" /> {/* cyan-500 */}
                <stop offset="100%" stopColor="#6366f1" /> {/* indigo-500 */}
              </linearGradient>
            </defs>
          </svg>

          {/* Inner Percentage Text */}
          <div className="relative flex flex-col items-center justify-center">
            <span className="text-4xl font-extrabold tracking-tighter text-white drop-shadow-md">
              {progressPercentage}%
            </span>
          </div>
        </div>

        {/* Current Loading Status Text */}
        <div className="mt-8 h-6 text-center">
          <p className={`text-sm font-mono tracking-wide transition-colors duration-300 ${isComplete ? "text-emerald-400 font-bold" : "text-cyan-400 animate-pulse"}`}>
            {currentMessage}
          </p>
        </div>

      </div>

      {/* Fade-in Completion Button */}
      <div className={`mt-4 flex justify-center transition-all duration-700 ${isComplete ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
        <button
          onClick={async () => {
            await saveOnboarding({
              id: crypto.randomUUID(),
              userId: user?.uid,
              completed: true,
              name,
              attemptYear,
              optionalSubject,
              gsSequence,
              optionalSequence,
            });
            
            completeOnboarding();
            navigate("/dashboard");
          }}
          className="w-full sm:w-auto rounded-2xl bg-gradient-to-r from-cyan-600 to-indigo-600 px-10 py-4 font-bold text-white shadow-[0_0_30px_rgba(8,145,178,0.3)] transition-transform hover:scale-105 active:scale-95"
        >
          Enter Dashboard
        </button>
      </div>
    </OnboardingCard>
  );
}

export default InitializationStep;