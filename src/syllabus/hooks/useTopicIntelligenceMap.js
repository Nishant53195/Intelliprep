import {
  useLiveQuery,
} from "dexie-react-hooks";

import {
  db,
} from "../../database/dexie";

function useTopicIntelligenceMap(
  topicIds = []
) {
  return (
    useLiveQuery(
      async () => {
        if (
          !topicIds.length
        ) {
          return {};
        }

        const rows =
          await db.topic_intelligence
            .where("topicId")
            .anyOf(topicIds)
            .toArray();

        /*
         --------------------------
         MAP
         --------------------------
        */

        return rows.reduce(
          (acc, row) => {
            acc[row.topicId] =
              row;

            return acc;
          },

          {}
        );
      },

      [topicIds]
    ) || {}
  );
}

export default
  useTopicIntelligenceMap;