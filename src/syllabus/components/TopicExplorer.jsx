import {
  useState,
} from "react";

import {
  useLiveQuery,
} from "dexie-react-hooks";

import {
  db,
} from "../../database/dexie";

import useTopicIntelligenceMap
from "../hooks/useTopicIntelligenceMap";

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
   TOPIC INTELLIGENCE MAP
   --------------------------
  */

  const intelligenceMap =
    useTopicIntelligenceMap(
      topics.map(
        (topic) =>
          topic.id
      )
    );

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

  /*
   --------------------------
   FIRST INCOMPLETE TOPIC
   --------------------------
  */

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

              const intelligence =
                intelligenceMap[
                  topic.id
                ];

              const inProgress =
                !completed &&
                firstIncompleteTopic
                  ?.id ===
                  topic.id;

              const isWeak =
                intelligence
                  ?.intelligenceState ===
                "WEAK";

              const isCritical =
                intelligence
                  ?.intelligenceState ===
                "CRITICAL";

              const isStrong =
                intelligence
                  ?.intelligenceState ===
                "STRONG";

              const highDecay =
                intelligence
                  ?.decayRisk >=
                70;

              const highImportance =
                intelligence
                  ?.importanceScore >=
                80;

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

                  <div className="mt-4 space-y-3">
                    <p className="text-sm text-slate-500">
                      {
                        completed
                          ? "Completed"
                          : inProgress
                          ? "In Progress"
                          : "Pending"
                      }
                    </p>

                    {intelligence && (
                      <>
                        {/* METRICS */}
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="rounded-lg bg-slate-50 p-2">
                            <p className="text-slate-400">
                              Effective
                            </p>

                            <p className="font-bold text-indigo-600">
                              {
                                intelligence.effectiveProgress
                              }%
                            </p>
                          </div>

                          <div className="rounded-lg bg-slate-50 p-2">
                            <p className="text-slate-400">
                              Health
                            </p>

                            <p className="font-bold text-emerald-600">
                              {
                                intelligence.healthScore
                              }
                            </p>
                          </div>

                          <div className="rounded-lg bg-slate-50 p-2">
                            <p className="text-slate-400">
                              Importance
                            </p>

                            <p className="font-bold text-amber-600">
                              {
                                intelligence.importanceScore
                              }
                            </p>
                          </div>

                          <div className="rounded-lg bg-slate-50 p-2">
                            <p className="text-slate-400">
                              Decay
                            </p>

                            <p className="font-bold text-rose-600">
                              {
                                intelligence.decayRisk
                              }%
                            </p>
                          </div>
                        </div>

                        {/* CHIPS */}
                        <div className="flex flex-wrap gap-2">
                          {isStrong && (
                            <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                              STRONG
                            </div>
                          )}

                          {isWeak && (
                            <div className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                              WEAK
                            </div>
                          )}

                          {isCritical && (
                            <div className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700">
                              CRITICAL
                            </div>
                          )}

                          {highImportance && (
                            <div className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                              HIGH PRIORITY
                            </div>
                          )}

                          {highDecay && (
                            <div className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                              REVISION RISK
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
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