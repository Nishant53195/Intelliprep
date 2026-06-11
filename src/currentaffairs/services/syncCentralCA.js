// src/currentaffairs/services/syncCentralCA.js
import { db } from "../../database/dexie";
import { firestoreDb } from "../../firebase/firestore/config";
import { collection, query, getDocs, limit, orderBy } from "firebase/firestore";

/**
 * Downloads the latest central Current Affairs nodes and updates the local IndexedDB cache safely.
 */
export async function syncCentralCA() {
  try {
    console.log("📡 Fetching latest central Current Affairs updates from Firestore...");
    
    // Target the central root collection and limit the payload to the latest 50 updates
    const centralRef = collection(firestoreDb, "current_affairs_master");
    const q = query(centralRef, orderBy("date", "desc"), limit(50));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.log("ℹ️ Central repository is currently empty.");
      return { count: 0 };
    }

    const remoteArticles = [];
    snapshot.forEach((docSnap) => {
      remoteArticles.push({
        id: docSnap.id,
        ...docSnap.data()
      });
    });

    // Write directly into the user's local Dexie table cache
    await db.current_affairs.bulkPut(remoteArticles);
    console.log(`✅ Cache synchronized: Hydrated ${remoteArticles.length} items locally.`);

    // Fire global state event trigger to inform layout cards to re-render
    window.dispatchEvent(new Event("syllabus-update"));
    
    return { count: remoteArticles.length };
  } catch (err) {
    console.error("❌ Failed fetching central current affairs:", err);
    throw err;
  }
}