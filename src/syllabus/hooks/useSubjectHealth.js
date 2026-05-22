import { useMemo } from "react";

import { useIntelligenceStore } from "../../store/useIntelligenceStore";

export function useSubjectHealth(subjectId) {
  const subjectIntelligence =
    useIntelligenceStore(
      (state) => state.subjectIntelligence
    );

  return useMemo(() => {
    return subjectIntelligence.find(
      (item) => item.subjectId === subjectId
    );
  }, [subjectId, subjectIntelligence]);
}