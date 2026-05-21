import { useLiveQuery }
from "dexie-react-hooks";

import { db }
from "../../database/dexie";

function useOrderedSubjects(
  activePaper
) {
  return useLiveQuery(
    async () => {
      const onboarding =
        await db
          .onboarding_config
          .toCollection()
          .first();

      const allSubjects =
        await db.subjects.toArray();

      if (!onboarding)
        return [];

      // OPTIONAL
if (
  activePaper ===
  "OPTIONAL"
) {
  const selectedOptional =
    onboarding.optionalSubject;

  return allSubjects.filter(
    (subject) => {
      if (
        subject.type !==
        "OPTIONAL"
      ) {
        return false;
      }

      return subject.name
        .toLowerCase()
        .includes(
          selectedOptional.toLowerCase()
        );
    }
  );
}
      // GS
      const sequenceIds =
        (
          onboarding.gsSequence ||
          []
        ).map(
          (subject) =>
            subject.id
        );

      return allSubjects
        .filter(
          (subject) =>
            subject.paper ===
              activePaper &&
            subject.type === "GS"
        )
        .sort((a, b) => {
          const aIndex =
            sequenceIds.indexOf(
              a.id
            );

          const bIndex =
            sequenceIds.indexOf(
              b.id
            );

          // non-selected subjects go below
          if (aIndex === -1)
            return 1;

          if (bIndex === -1)
            return -1;

          return (
            aIndex - bIndex
          );
        });
    },

    [activePaper]
  );
}

export default
  useOrderedSubjects;