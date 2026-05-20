import { getOnboarding } from "../../database/repositories/onboardingRepository";

import useOnboardingStore from "../store/onboardingStore";
export async function hydrateOnboarding(
  userId
) {
  try {
    const onboarding =
      await getOnboarding(
        userId
      );

    if (onboarding) {
      useOnboardingStore
        .getState()
        .hydrateOnboarding(
          onboarding
        );
    } else {
      useOnboardingStore
        .getState()
        .setHydrated(
          true
        );
    }
  } catch (error) {
    console.error(
      "Hydration failed",
      error
    );

    useOnboardingStore
      .getState()
      .setHydrated(
        true
      );
  }
}