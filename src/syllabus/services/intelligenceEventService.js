import {
  syncTopicIntelligence,
} from "./intelligenceSyncService";

/*
|--------------------------------------------------------------------------
| CENTRAL INTELLIGENCE EVENT BUS
|--------------------------------------------------------------------------
*/

export async function emitIntelligenceEvent({
  topicId,
}) {
  if (!topicId) {
    return;
  }

  /*
   --------------------------
   SYNC TOPIC
   --------------------------
  */

  await syncTopicIntelligence(
    topicId
  );
}