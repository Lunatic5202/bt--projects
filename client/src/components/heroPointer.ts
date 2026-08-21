export type HeroPointerPoint = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type HeroPointerPull = {
  x: number;
  y: number;
  scale: number;
};

const MAGNETIC_STRENGTH = 0.16;
const MAX_OFFSET = 10;
const MAX_SCALE_DELTA = 0.024;

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

/**
 * Maps a pointer position within a CTA to a bounded magnetic pull. The modest
 * bounds keep the hero controls usable and prevent the button from drifting
 * away from its intended target on fast pointer movement.
 */
export function getHeroPointerPull({ x, y, width, height }: HeroPointerPoint): HeroPointerPull {
  const halfWidth = Math.max(width / 2, 1);
  const halfHeight = Math.max(height / 2, 1);
  const horizontalOffset = x - halfWidth;
  const verticalOffset = y - halfHeight;
  const normalizedDistance = Math.min(
    Math.hypot(horizontalOffset / halfWidth, verticalOffset / halfHeight),
    1,
  );

  return {
    x: clamp(horizontalOffset * MAGNETIC_STRENGTH, -MAX_OFFSET, MAX_OFFSET),
    y: clamp(verticalOffset * MAGNETIC_STRENGTH, -MAX_OFFSET, MAX_OFFSET),
    scale: 1 + normalizedDistance * MAX_SCALE_DELTA,
  };
}
