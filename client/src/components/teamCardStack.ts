export type CardStackDirection = -1 | 0 | 1;

export function getCyclicTeamIndex(index: number, offset: number, total: number) {
  if (total <= 0) return 0;
  return ((index + offset) % total + total) % total;
}

export function getVisibleTeamStack<T>(cards: readonly T[], activeIndex: number, count = 3) {
  if (cards.length === 0) return [];

  return Array.from(
    { length: Math.min(count, cards.length) },
    (_, depth) => cards[getCyclicTeamIndex(activeIndex, depth, cards.length)],
  );
}

export function getTeamSwipeDirection(offsetX: number, threshold = 88): CardStackDirection {
  if (offsetX <= -threshold) return 1;
  if (offsetX >= threshold) return -1;
  return 0;
}
