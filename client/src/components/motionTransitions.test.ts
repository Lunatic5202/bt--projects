import { describe, expect, it } from "vitest";
import { getMotionDelay, getRevealTransition } from "./motionTransitions";

describe("Motion transition helpers", () => {
  it("creates bounded, predictable stagger delays", () => {
    expect(getMotionDelay(0)).toBe(0);
    expect(getMotionDelay(3)).toBeCloseTo(0.225);
    expect(getMotionDelay(-2)).toBe(0);
  });

  it("removes decorative timing when reduced motion is requested", () => {
    expect(getRevealTransition(true, 0.2)).toEqual({ duration: 0 });
  });

  it("uses the water-aligned reveal timing for standard motion", () => {
    expect(getRevealTransition(false, 0.15)).toEqual({
      duration: 0.48,
      delay: 0.15,
      ease: [0.23, 1, 0.32, 1],
    });
  });
});
