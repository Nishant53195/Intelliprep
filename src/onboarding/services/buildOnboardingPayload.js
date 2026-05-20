export default function buildOnboardingPayload({
  name,
  attemptYear,
  prelimsDate,
  mainsDate,
  studyHoursPerDay,
  optionalSubject,
  gsSequence,
  optionalSequence,
}) {
  return {
    name,

    attemptYear,

    prelimsDate,

    mainsDate,

    studyHoursPerDay,

    optionalSubject,

    gsSequence,

    optionalSequence,

    onboardingCompleted:
      true,

    createdAt:
      new Date().toISOString(),
  };
}