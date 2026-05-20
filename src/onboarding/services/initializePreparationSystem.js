import {
  saveOnboarding,
} from "../../database/repositories/onboardingRepository";

import buildOnboardingPayload from "./buildOnboardingPayload";

export default async function initializePreparationSystem({
  userId,
  onboardingState,
}) {
  const payload =
    buildOnboardingPayload(
      onboardingState
    );

  /*
    FUTURE:
    Initialize:
    - Scheduler
    - GS syllabus
    - Optional syllabus
    - Revision engine
    - Recovery engine
  */

  await saveOnboarding(
    userId,
    payload
  );

  return payload;
}