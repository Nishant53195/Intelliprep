import {
  REVISION_STAGES,
} from "../../constants/revision";

export function getRevisionPriority(
  revisionStage
) {
  switch (revisionStage) {
    case REVISION_STAGES.D3:
      return 1;

    case REVISION_STAGES.D10:
      return 2;

    case REVISION_STAGES.D30:
      return 3;

    default:
      return 999;
  }
}