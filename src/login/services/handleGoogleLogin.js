import {loginWithGoogle} from "..//../firebase/firestore/auth";

import { getOnboarding } from "../../database/repositories/onboardingRepository";

import { hydrateOnboarding } from "../../onboarding/services/hydrateOnboarding";

export async function handleGoogleLogin({
  setUser,
  navigate,
  setLoading,
  setError,
}) {
  try {
    setLoading(true);
    setError("");

    const user =
      await loginWithGoogle();

    setUser(user);

    if (user) {
  await hydrateOnboarding(
    user.uid
  );
}

    const onboarding =
      await getOnboarding(
        user.uid
      );

    if (
      onboarding?.completed
    ) {
      navigate(
        "/dashboard"
      );
    } else {
      navigate(
        "/onboarding"
      );
    }
  } catch (error) {
    console.error(error);

    setError(
      "Login failed. Please try again."
    );
  } finally {
    setLoading(false);
  }
}