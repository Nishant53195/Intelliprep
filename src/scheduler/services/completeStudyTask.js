import { completeTask, getTasksBySubtopic, saveTasks } from "../../database/repositories/scheduleRepository";
import { completeSubtopic, completeTopic, getSubtopicsByTopic } from "../../database/repositories/syllabusRepository";
import { db } from "../../database/dexie";
import { TASK_TYPES, SLOT_TYPES } from "../../constants/scheduler";
import dayjs from "dayjs";
import { refreshTodayTasks } from "./refreshTodayTasks";

export async function completeStudyTask(task) {
  const todayStr = dayjs().format("YYYY-MM-DD");

  // 1. Mark task completed inside standard schedule tasks tracking table
  await completeTask(task.id);

  // 2. INTERCEPT: If task belongs to a Revision slot, evaluate step-by-step cascade
  if (task.type === "revision" || task.revisionId) {
    const activeRevision = await db.revisions.get(task.revisionId || "");
    if (activeRevision) {
      // Complete current active stage
      await db.revisions.update(activeRevision.id, {
        status: "COMPLETED",
        updatedAt: Date.now()
      });

      let nextStage = null;
      let daysToAdd = 0;

      // STRICT PIPELINE DEFINITION: D3 unlocks D10, D10 unlocks D30
      if (activeRevision.revisionStage === "D3") {
        nextStage = "D10";
        daysToAdd = 7; 
      } else if (activeRevision.revisionStage === "D10") {
        nextStage = "D30";
        daysToAdd = 20; 
      }

      if (nextStage && daysToAdd > 0) {
        // Safe check to avoid duplication before inserting the next stage node record
        const duplicateCheck = await db.revisions
          .where("subtopicId")
          .equals(activeRevision.subtopicId || "")
          .filter(r => r.revisionStage === nextStage)
          .first();

        if (!duplicateCheck) {
          await db.revisions.put({
            id: `rev_${Date.now()}_${activeRevision.subtopicId}`,
            userId: activeRevision.userId,
            subjectId: activeRevision.subjectId || "",
            topicId: activeRevision.topicId || "",
            subtopicId: activeRevision.subtopicId || "",
            revisionStage: nextStage,
            status: "PENDING",
            dueDate: dayjs(todayStr).add(daysToAdd, "day").format("YYYY-MM-DD"),
            createdAt: Date.now()
          });
        }
      }
    }
    await refreshTodayTasks();
    return;
  }

  // 3. BASELINE SCHEDULING PATH: When checking off a standard Core subtopic task (GS/Optional)
  const subtopicTasks = await getTasksBySubtopic(task.subtopicId);
  const allChunksCompleted = subtopicTasks.every((t) => t.completed);

  if (allChunksCompleted) {
    await completeSubtopic(task.subtopicId);

    if (task.type === "gs" || task.type === "optional") {
      // ALWAYS generate D3 first and only!
      const existingD3 = await db.revisions
        .where("subtopicId")
        .equals(task.subtopicId || "")
        .filter(r => r.revisionStage === "D3")
        .first();

      if (!existingD3) {
        await db.revisions.put({
          id: `rev_${Date.now()}_${task.subtopicId}`,
          userId: task.userId,
          subjectId: task.subjectId || "",
          topicId: task.topicId || "",
          subtopicId: task.subtopicId || "",
          revisionStage: "D3", 
          status: "PENDING",
          dueDate: dayjs(todayStr).add(3, "day").format("YYYY-MM-DD"),
          createdAt: Date.now()
        });
      }
    }

    // Complete parent topic entries if all sister subtopics are finished
    const subtopics = await getSubtopicsByTopic(task.topicId);
    const allSubtopicsCompleted = subtopics.every((subtopic) => subtopic.status === "COMPLETED");

    if (allSubtopicsCompleted) {
      await completeTopic(task.topicId);

      const pyqTask = {
        id: crypto.randomUUID(),
        userId: task.userId,
        type: TASK_TYPES.PYQ,
        slotType: SLOT_TYPES.PRACTICE,
        topicId: task.topicId,
        subjectId: task.subjectId,
        scheduledDate: dayjs().add(1, 'day').format("YYYY-MM-DD"),
        estimatedMinutes: 45,
        completed: false,
        createdAt: new Date(),
      };
      await saveTasks([pyqTask]);
    }
  }

  await refreshTodayTasks();
}