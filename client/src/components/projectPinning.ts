export function getProjectScrollProgress(
  sectionTop: number,
  sectionHeight: number,
  viewportHeight: number,
) {
  const distance = Math.max(sectionHeight - viewportHeight, 1);
  return Math.min(Math.max(-sectionTop / distance, 0), 1);
}

export function getActiveProjectIndex(progress: number, count: number) {
  if (count <= 1) return 0;
  return Math.min(Math.floor(progress * count), count - 1);
}
