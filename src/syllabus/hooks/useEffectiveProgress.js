import { useMemo } from "react";

import { useIntelligenceStore } from "../../store/useIntelligenceStore";

export function useEffectiveProgress(subjectId) {
  const subjectIntelligence =
    useIntelligenceStore(
      (state) => state.subjectIntelligence
    );

  return useMemo(() => {
    const data = subjectIntelligence.find(
      (item) => item.subjectId === subjectId
    );

    return data?.effectiveProgress || 0;
  }, [subjectId, subjectIntelligence]);
}