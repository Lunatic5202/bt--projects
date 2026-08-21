export type MotionPreference = boolean | null | undefined;

const revealEase = [0.23, 1, 0.32, 1] as const;

export function getMotionDelay(index: number, step = 0.075) {
  return Math.max(0, index) * step;
}

export function getRevealTransition(
  shouldReduceMotion: MotionPreference,
  delay = 0,
) {
  if (shouldReduceMotion) return { duration: 0 };

  return {
    duration: 0.48,
    delay,
    ease: revealEase,
  };
}
