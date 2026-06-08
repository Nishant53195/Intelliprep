// src/database/services/syncEngine.js
import { db } from "../dexie";
import { firestoreDb } from "../../firebase/firestore/config";
import { doc, writeBatch } from "firebase/firestore";

export const syncEngine = {
  /**
   * Automatically enqueues a pending database change record.
   */
  async enqueueChange(tableName, recordId, operation = "PUT") {
    try {
      await db.sync_queue.put({
        id: `${tableName}_${recordId}`,
        tableName,
        recordId,
        operation,
        createdAt: Date.now(),
        status: "PENDING"
      });
      // Run background processing loop as a fire-and-forget promise thread
      this.processSyncQueue();
    } catch (err) {
      console.error("[Sync Engine] Failed enqueuing local record target:", err);
    }
  },

  /**
   * Loops through the local sync queue and flushes changes to Firestore.
   */
  async processSyncQueue(userId = "local_user") {
    if (userId === "local_user") return; // Skip if no cloud account has authenticated yet

    try {
      const pendingItems = await db.sync_queue
        .where("status")
        .equals("PENDING")
        .toArray();

      if (pendingItems.length === 0) return;

      console.log(`[Sync Engine] Found ${pendingItems.length} pending mutations to sync...`);
      const batch = writeBatch(firestoreDb);
      const processedQueueIds = [];

      for (const item of pendingItems) {
        // Pull the actual payload record data out of its local Dexie table matching the key pointer
        const actualData = await db[item.tableName].get(item.recordId);

        // Target: users/{userId}/{tableName}/{recordId}
        const cloudDocRef = doc(firestoreDb, "users", userId, item.tableName, String(item.recordId));

        if (item.operation === "DELETE" || !actualData) {
          batch.delete(cloudDocRef);
        } else {
          // Flatten standard JavaScript Date or object properties into stringified parameters safely
          const sanitizedPayload = JSON.parse(JSON.stringify(actualData));
          batch.set(cloudDocRef, sanitizedPayload, { merge: true });
        }
        processedQueueIds.push(item.id);
      }

      // Commit changes to Cloud Firestore
      await batch.commit();

      // Clean up the processed sync records from local storage
      await db.sync_queue.bulkDelete(processedQueueIds);
      console.log("[Sync Engine] Firestore synchronization committed successfully.");
    } catch (err) {
      console.error("[Sync Engine] Synchronization transaction aborted:", err);
    }
  },

  /**
   * Run a macro fetch download to download cloud documents down to fresh local client caches.
   */
  async pullAllCloudDataToCache(userId) {
    if (!userId) return;
    console.log(`[Sync Engine] Triggering cloud recovery data download pipeline for profile: ${userId}`);
    // Sync targets can follow for high-tier telemetry down-hydration blocks if needed.
  }
};