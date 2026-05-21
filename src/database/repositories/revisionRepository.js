import { db } from "../dexie";

export async function saveRevisions(revisions) {
  return db.revisions.bulkPut(revisions);
}

export async function saveRevision(revision) {
  return db.revisions.put(revision);
}

export async function getRevisionById(id) {
  return db.revisions.get(id);
}

export async function getRevisionsByDate(date) {
  return db.revisions.where("dueDate").equals(date).toArray();
}

export async function getPendingRevisions() {
  return db.revisions
    .where("status")
    .equals("PENDING")
    .toArray();
}

export async function updateRevision(id, updates) {
  return db.revisions.update(id, updates);
}

export async function bulkUpdateRevisions(revisions) {
  return db.transaction("rw", db.revisions, async () => {
    for (const revision of revisions) {
      const { id, ...updates } = revision;

      await db.revisions.update(id, updates);
    }
  });
}

export async function getRevisionsBySubtopic(subtopicId) {
  return db.revisions
    .where("subtopicId")
    .equals(subtopicId)
    .toArray();
}