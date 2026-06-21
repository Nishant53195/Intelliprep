import { db } from "../../database/dexie";

export async function initializeSchedule(userId, studyHours = 6) {

  // Clean sweep any lingering heavy structural tasks built by legacy multi-day pre-generators
  await db.schedule_tasks.where("userId").equals(userId).delete();
  
  return [];
}