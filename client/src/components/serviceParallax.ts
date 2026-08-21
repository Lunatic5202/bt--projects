/**
 * Maps local scroll progress to a symmetric parallax offset.
 * A value of 0 is above the reading window, 0.5 is centred, and 1 is below.
 */
export function getParallaxOffset(progress: number, distance: number) {
  const clamped = Math.min(1, Math.max(0, progress));
  return (clamped - 0.5) * distance * 2;
}
