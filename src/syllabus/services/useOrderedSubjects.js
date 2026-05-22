import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../database/dexie";

function useOrderedSubjects(activePaper) {
  return useLiveQuery(
    async () => {
      const onboarding = await db.onboarding_config.toCollection().first();
      const allSubjects = await db.subjects.toArray();

      if (!onboarding) return [];

      // OPTIONAL SUBJECT STRAT
      if (activePaper.toUpperCase() === "OPTIONAL") {
        const selectedOptional = onboarding.optionalSubject || "";
        return allSubjects.filter((subject) => {
          if (subject.type.toUpperCase() !== "OPTIONAL") return false;
          return subject.name.toLowerCase().includes(selectedOptional.toLowerCase());
        });
      }

      // GENERAL STUDIES SUBJECT STRAT
      const sequenceIds = (onboarding.gsSequence || []).map((subject) => subject.id);

      return allSubjects
        .filter(
          (subject) =>
            subject.paper.toUpperCase() === activePaper.toUpperCase() &&
            (subject.type.toUpperCase() === "GS" || subject.type.toUpperCase() === "CORE")
        )
        .sort((a, b) => {
          const aIndex = sequenceIds.indexOf(a.id);
          const bIndex = sequenceIds.indexOf(b.id);

          if (aIndex === -1) return 1;
          if (bIndex === -1) return -1;

          return aIndex - bIndex;
        });
    },
    [activePaper]
  );
}

export default useOrderedSubjects;