import React from "react";
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

  // Fallback persistent verification tracker check matching the Step 1 cloud sync persistence token
  const localOnboardingCheck = localStorage.getItem("intelliprep_onboarding_completed") === "true";

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

  // FIXED STEP 2 GUARD CONDITION: Allow pass-through if either the state engine OR the persistent fallback token is active
  if (
    !onboardingCompleted && !localOnboardingCheck
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