import {
  useState,
} from "react";

import {
  useLiveQuery,
} from "dexie-react-hooks";

import {
  db,
} from "../../database/dexie";

function TopicExplorer({
  subject,

  onBackSubject,
}) {
  const [
    selectedTopic,

    setSelectedTopic,
  ] = useState(null);

  /*
   --------------------------
   TOPICS
   --------------------------
  */

  const topics =
    useLiveQuery(
      async () => {
        if (!subject)
          return [];

        return db.topics
          .where("subjectId")
          .equals(subject.id)
          .sortBy("order");
      },

      [subject]
    ) || [];

  /*
   --------------------------
   SUBTOPICS
   --------------------------
  */

  const subtopics =
    useLiveQuery(
      async () => {
        if (!selectedTopic)
          return [];

        return db.subtopics
          .where("topicId")
          .equals(
            selectedTopic.id
          )
          .sortBy("order");
      },

      [selectedTopic]
    ) || [];

    const firstIncompleteTopic =
  topics.find(
    (topic) =>
      topic.status !==
      "COMPLETED"
  );

  return (
    <div className="mt-8">
      {/* CHIPS */}
      <div className="mb-6 flex flex-wrap gap-3">
        {/* SUBJECT CHIP */}
        <button
          onClick={() =>
            onBackSubject()
          }
          className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700"
        >
          {subject.name}
        </button>

        {/* TOPIC CHIP */}
        {selectedTopic && (
          <button
            onClick={() =>
              setSelectedTopic(
                null
              )
            }
            className="rounded-full bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"
          >
            {
              selectedTopic.name
            }
          </button>
        )}
      </div>

      {/* TOPICS VIEW */}
      {!selectedTopic && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {topics.map(
            (topic) => {
              const completed =
  topic.status ===
  "COMPLETED";

const inProgress =
  !completed &&
  firstIncompleteTopic
    ?.id === topic.id;

              return (
                <div
                  key={
                    topic.id
                  }
                  onClick={() =>
                    setSelectedTopic(
                      topic
                    )
                  }
                  className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {
                        topic.name
                      }
                    </h3>

                    {completed && (
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-600">
                        ✓
                      </div>
                    )}
                  </div>

                  <p className="mt-3 text-sm text-slate-500">
                    {
  completed
    ? "Completed"

    : inProgress
    ? "In Progress"

    : "Pending"
}
                  </p>
                </div>
              );
            }
          )}
        </div>
      )}

      {/* SUBTOPICS VIEW */}
      {selectedTopic && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {subtopics.map(
            (
              subtopic
            ) => {
              const completed =
                subtopic.status ===
                "COMPLETED";

              return (
                <div
                  key={
                    subtopic.id
                  }
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-medium text-slate-700">
                      {
                        subtopic.name
                      }
                    </p>

                    {completed && (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-600">
                        ✓
                      </div>
                    )}
                  </div>

                  <p className="mt-3 text-xs text-slate-500">
                    {
                      completed
                        ? "Completed"
                        : "Pending"
                    }
                  </p>
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
}

export default
  TopicExplorer;