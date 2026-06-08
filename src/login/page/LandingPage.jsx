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

  const authInitialized = useLoginStore(
    (state) => state.authInitialized
  );

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

      {/* Background */}
      <div className="fixed inset-0 z-0 overflow-hidden bg-[#050B18] pointer-events-none">

        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px]" />

        {/* Soft Glow */}
        <div className="absolute left-[20%] top-[20%] h-[350px] w-[350px] rounded-full bg-violet-500/10 blur-[90px]" />

        <div className="absolute right-[10%] top-[10%] h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-[80px]" />

      </div>

      <div className="relative z-10 flex min-h-screen w-full flex-col lg:flex-row">

        {/* Left Side */}
        <div className="hidden lg:flex lg:w-1/2">
          <IntelligenceNetwork />
        </div>

        {/* Mobile Hero */}
        <div className="flex flex-col justify-center px-8 pt-16 lg:hidden">

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/10 bg-cyan-400/5 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />

            <span className="text-[11px] font-mono tracking-[0.35em] text-cyan-300 uppercase">
              UPSC
            </span>
          </div>

          <h1
            className="
              mt-6
              text-6xl
              font-black
              tracking-tight
              text-transparent
              bg-clip-text
              bg-gradient-to-r
              from-violet-200
              via-indigo-200
              to-cyan-200
            "
          >
            IntelliPrep.
          </h1>

          <p className="mt-4 text-sm font-mono tracking-[0.35em] text-slate-500 uppercase">
            Intelligent Preparation Operating System
          </p>

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