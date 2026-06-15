// src/database/services/syncEngine.js
import { db } from "../dexie";
import { firestoreDb } from "../../firebase/firestore/config";
import { doc, writeBatch, collection, getDocs } from "firebase/firestore";

export const syncEngine = {
  /**
   * PUSH ACTIONS: "Sync to Firestore"
   * Collects mutations from sync_queue and uploads them safely chunked into batches of 500 max.
   */
  async pushLocalChangesToCloud(userId) {
    if (!userId || userId === "local_user") {
      console.warn("[Sync Engine] Push aborted: Missing valid authenticated user profile context.");
      return { success: false, reason: "UNAUTHENTICATED" };
    }

    try {
      const pendingItems = await db.sync_queue
        .where("status")
        .equals("PENDING")
        .toArray();

      if (pendingItems.length === 0) {
        console.log("[Sync Engine] Complete manual sync bypass: Local storage queue is clean.");
        return { success: true, count: 0 };
      }

      console.log(`[Sync Engine] Initializing batch upload for ${pendingItems.length} records...`);
      
      // FIRESTORE MAX BATCH CAPACITY
      const BATCH_LIMIT = 500;
      let processedQueueIds = [];
      let currentBatch = writeBatch(firestoreDb);
      let currentBatchCount = 0;

      for (let i = 0; i < pendingItems.length; i++) {
        const item = pendingItems[i];
        const actualLocalData = await db[item.tableName].get(item.recordId);
        
        let cloudDocRef;
        
        // =========================================================================
        // FIXED STEP 2 ARCHITECTURAL ROUTING LOGIC
        // =========================================================================
        if (item.tableName === "current_affairs") {
          // Route Current Affairs out of user folders into central master collection
          cloudDocRef = doc(firestoreDb, "current_affairs_master", String(item.recordId));
        } else if (item.tableName === "pyqs") {
          // Route Master Questions (MCQs/PYQs) out of user folders into central master question pool
          cloudDocRef = doc(firestoreDb, "master_questions_bank", String(item.recordId));
        } else {
          // Keep individual user task telemetry, custom schedulers, and metrics isolated
          cloudDocRef = doc(firestoreDb, "users", userId, item.tableName, String(item.recordId));
        }
        // =========================================================================

        if (item.operation === "DELETE" || !actualLocalData) {
          currentBatch.delete(cloudDocRef);
        } else {
          // Flatten payloads and map the context reference safely
          const sanitizedPayload = JSON.parse(JSON.stringify({
            ...actualLocalData,
            userId: userId
          }));
          currentBatch.set(cloudDocRef, sanitizedPayload, { merge: true });
        }

        processedQueueIds.push(item.id);
        currentBatchCount++;

        // When we reach 500 items, or we hit the end of our list, commit this batch chunk
        if (currentBatchCount === BATCH_LIMIT || i === pendingItems.length - 1) {
          console.log(`[Sync Engine] Committing chunk of ${currentBatchCount} items to Firestore...`);
          await currentBatch.commit();
          
          // Re-initialize for the next 500 items
          currentBatch = writeBatch(firestoreDb);
          currentBatchCount = 0;
        }
      }

      // Clean items out of local tracking queue table only after all chunks succeed
      await db.sync_queue.bulkDelete(processedQueueIds);
      console.log(`[Sync Engine] Manual push upload processed completely! Cleared ${processedQueueIds.length} items from sync_queue.`);
      
      return { success: true, count: processedQueueIds.length };
    } catch (err) {
      console.error("[Sync Engine] Manual batch upload chunking aborted:", err);
      throw err;
    }
  },

  /**
   * PULL ACTIONS: "Load from Firestore"
   * Downloads remote data from your user path, aggregates records, and reloads IndexedDB.
   */
  async pullCloudChangesToLocal(userId) {
    if (!userId || userId === "local_user") {
      console.warn("[Sync Engine] Load aborted: Session state is not signed in.");
      return { success: false, reason: "UNAUTHENTICATED" };
    }

    const syncTargetTables = [
      "onboarding_config", 
      "subjects", 
      "topics", 
      "subtopics", 
      "subtopic_progress", 
      "schedule_tasks", 
      "revisions", 
      "topic_intelligence", 
      "subject_intelligence"
    ];
    
    console.log(`[Sync Engine] Launching recovery snapshot download pipeline for profile: ${userId}`);
    let totalRecordsRecovered = 0;

    try {
      for (const tableName of syncTargetTables) {
        const collectionRef = collection(firestoreDb, "users", userId, tableName);
        const snapshot = await getDocs(collectionRef);
        
        if (!snapshot.empty) {
          const remotePayloads = [];
          snapshot.forEach((docSnap) => {
            remotePayloads.push({
              id: docSnap.id,
              ...docSnap.data()
            });
          });

          // Inject data entries down using bulkPut execution optimization
          await db[tableName].bulkPut(remotePayloads);
          totalRecordsRecovered += remotePayloads.length;
          console.log(`[Sync Engine] Hydrated target collection: ${tableName} (${remotePayloads.length} entries written)`);
        }
      }

      // CRITICAL VERIFICATION: If absolutely zero rows were downloaded across all tables, return failure
      if (totalRecordsRecovered === 0) {
        console.warn("[Sync Engine] Load sequence resolved with an empty remote cloud profile layout.");
        return { success: false, reason: "EMPTY_CLOUD_PROFILE" };
      }

      return { success: true, count: totalRecordsRecovered };
    } catch (err) {
      console.error("[Sync Engine] Downstream recovery pull process failed:", err);
      throw err;
    }
  }
};