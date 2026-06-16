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


    const finalPayload = {
    ...payload,
    userId: userId
  };

  await saveOnboarding(
    finalPayload
  );

  return finalPayload;
}