import { describe, expect, it } from "vitest";
import { getParallaxOffset } from "./serviceParallax";

describe("service parallax mapping", () => {
  it("moves symmetrically around the reading position", () => {
    expect(getParallaxOffset(0, 142)).toBe(-142);
    expect(getParallaxOffset(0.5, 142)).toBe(0);
    expect(getParallaxOffset(1, 142)).toBe(142);
  });

  it("clamps progress outside the visible scroll range", () => {
    expect(getParallaxOffset(-0.2, 18)).toBe(-18);
    expect(getParallaxOffset(1.4, 18)).toBe(18);
  });
});
