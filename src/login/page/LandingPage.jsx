import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLoginStore from "../store/loginStore";
import { getOnboarding } from "../../database/repositories/onboardingRepository";
import { handleGoogleLogin } from "../services/handleGoogleLogin";
import AuthLayout from "../components/AuthLayout";
import IntelligenceNetwork from "../components/IntelligenceNetwork";
import LoginCard from "../components/LoginCard";
import GoogleLoginButton from "../components/GoogleLoginButton";
import AuthError from "../components/AuthError";

function LandingPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const user = useLoginStore((state) => state.user);
  const authInitialized = useLoginStore((state) => state.authInitialized);
  const setUser = useLoginStore((state) => state.setUser);

  useEffect(() => {
    async function checkUser() {
      if (!authInitialized) return;
      if (!user) return;

      const onboarding = await getOnboarding(user.uid);

      if (onboarding?.completed) {
        navigate("/dashboard");
      } else {
        navigate("/onboarding");
      }
    }

    checkUser();
  }, [user, authInitialized, navigate]);

  return (
    <AuthLayout>
      {/* Softened Deep Slate Background */}
      <div className="fixed inset-0 z-0 bg-[#0B1120] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      {/* Global CSS for text shimmer */}
      <style>{`
        @keyframes text-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-text-flow {
          background-size: 200% auto;
          animation: text-flow 6s linear infinite;
        }
      `}</style>

      <div className="relative z-10 flex min-h-screen w-full flex-col lg:flex-row">
        {/* Left Side */}
        <div className="hidden lg:flex lg:w-1/2">
          <IntelligenceNetwork />
        </div>

        {/* Mobile Hero */}
        <div className="flex flex-col justify-center px-8 pt-16 lg:hidden text-center sm:text-left">
          <span className="mb-2 block text-xl font-medium tracking-[0.25em] text-cyan-200/60 uppercase drop-shadow-md">
            UPSC
          </span>
          <h1 className="text-5xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-[linear-gradient(to_right,#e0e7ff,#c4b5fd,#a5f3fc,#e0e7ff)] animate-text-flow pb-1 drop-shadow-[0_0_15px_rgba(196,181,253,0.2)]">
            IntelliPrep.
          </h1>
          <span className="mt-2 block text-xs font-mono tracking-[0.3em] text-slate-400 uppercase">
            Version 1.0
          </span>
        </div>

        {/* Right Side */}
        <div className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2">
          <LoginCard>
            <GoogleLoginButton
              loading={loading}
              onClick={() =>
                handleGoogleLogin({
                  setUser,
                  navigate,
                  setLoading,
                  setError,
                })
              }
            />
            <AuthError message={error} />
          </LoginCard>
        </div>
      </div>
    </AuthLayout>
  );
}

export default LandingPage;