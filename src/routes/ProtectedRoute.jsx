import { Navigate } from "react-router-dom";

import useLoginStore from "../login/store/loginStore";

import useOnboardingStore from "../onboarding/store/onboardingStore";

import AuthLoader from "../login/components/AuthLoader";

function ProtectedRoute({
  children,
}) {
  const user =
    useLoginStore(
      (state) => state.user
    );

  const authInitialized =
    useLoginStore(
      (state) =>
        state.authInitialized
    );

  const onboardingCompleted =
    useOnboardingStore(
      (state) =>
        state.isOnboardingCompleted
    );

  const hydrated =
    useOnboardingStore(
      (state) =>
        state.hydrated
    );

  // Wait for Firebase auth restore
  if (!authInitialized) {
    return <AuthLoader />;
  }

  // Not logged in
  if (!user) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  // Wait for Dexie onboarding hydration
  if (!hydrated) {
    return <AuthLoader />;
  }

  // User logged in but onboarding incomplete
  if (
    !onboardingCompleted
  ) {
    return (
      <Navigate
        to="/onboarding"
        replace
      />
    );
  }

  // Everything ready
  return children;
}

export default ProtectedRoute;