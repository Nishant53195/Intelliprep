// src/prelims/services/prelimsQueryService.js
import { firestoreDb } from "../../firebase/firestore/config";
import { collection, query, where, getDocs, limit } from "firebase/firestore";

/**
 * Service to pull targeted prelims question batches out of Firestore master collections
 */
export const prelimsQueryService = {
  async fetchSandboxQuestions({ subjectId, topicId, isPyqMode }) {
    if (!subjectId || !topicId) throw new Error("Missing required query criteria constraints.");
    
    try {
      console.log(`[Prelims Sandbox Engine] Querying Firestore bank. Subject: ${subjectId}, Topic: ${topicId}`);
      
      const masterCollectionRef = collection(firestoreDb, "master_questions_bank");
      const targetType = isPyqMode ? "PYQ_PRELIMS" : "MCQ_PRELIMS";
      
      // REMOVED OR SCALED UP THE LIMIT CONSTRAINT TO CAPTURE THE FULL POOL
      const q = query(
        masterCollectionRef,
        where("type", "==", targetType),
        where("subjectId", "==", subjectId),
        where("topicId", "==", topicId)
      );
      
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        return [];
      }
      
      const compiledQuestions = [];
      snapshot.forEach((docSnap) => {
        compiledQuestions.push({
          id: docSnap.id,
          ...docSnap.data()
        });
      });
      
      return compiledQuestions;
    } catch (err) {
      console.error("[Prelims Sandbox Engine] Downstream Firestore fetch failure:", err);
      throw err;
    }
  }
};