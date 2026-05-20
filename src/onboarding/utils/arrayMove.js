export function arrayMove(
  array,
  from,
  to
) {
  const updated = [...array];

  const [removed] =
    updated.splice(from, 1);

  updated.splice(to, 0, removed);

  return updated;
}