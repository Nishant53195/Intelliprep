// src/mains/services/mainsQueryService.js
import { firestoreDb } from "../../firebase/firestore/config";
import { collection, query, where, getDocs, limit } from "firebase/firestore";

/**
 * Service to pull targeted descriptive Mains questions out of Firestore master collections
 */
export const mainsQueryService = {
  async fetchMainsQuestions({ subjectId, topicId }) {
    if (!subjectId || !topicId) throw new Error("Missing required query criteria constraints.");
    
    try {
      console.log(`[Mains Sandbox] Querying master question pool. Subject: ${subjectId}, Topic: ${topicId}`);
      
      const masterCollectionRef = collection(firestoreDb, "master_questions_bank");
      
      // Target descriptive mains question formats
      const q = query(
        masterCollectionRef,
        where("type", "==", "PYQ_MAINS"),
        where("subjectId", "==", subjectId),
        where("topicId", "==", topicId),
        limit(50) // Safely caps the payload buffer size
      );
      
      const snapshot = await getDocs(q);
      if (snapshot.empty) return [];
      
      const compiledQuestions = [];
      snapshot.forEach((docSnap) => {
        compiledQuestions.push({
          id: docSnap.id,
          ...docSnap.data()
        });
      });
      
      return compiledQuestions;
    } catch (err) {
      console.error("[Mains Sandbox Engine] Firestore batch delivery failure:", err);
      throw err;
    }
  }
};