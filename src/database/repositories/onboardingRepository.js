import { db } from "../dexie";

export async function saveOnboarding(
  data
) {
  if (!data.userId) {
    console.warn("[onboardingRepository] Saving configuration without a userId primary key!");
  }
  return db.onboarding_config.put(data);
}

export async function getOnboarding(
  userId
) {
  return db.onboarding_config
    .where("userId")
    .equals(userId)
    .first();
}

export async function updateOnboarding(
  id,
  updates
) {
  return db.onboarding_config.update(
    id,
    updates
  );
}