export default function chunkSubtopic({
  remainingMinutes,

  availableMinutes,
}) {
  if (
    remainingMinutes <=
    availableMinutes
  ) {
    return {
      chunkMinutes:
        remainingMinutes,

      leftoverMinutes: 0,
    };
  }

  return {
    chunkMinutes:
      availableMinutes,

    leftoverMinutes:
      remainingMinutes -
      availableMinutes,
  };
}