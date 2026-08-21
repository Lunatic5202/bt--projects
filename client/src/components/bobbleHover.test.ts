import { describe, expect, it } from "vitest";
import { getBobbleSpringImpulse } from "./bobbleHover";

describe("bobble hover helper", () => {
  it("keeps a stationary pointer at rest", () => {
    expect(getBobbleSpringImpulse({ x: 0, y: 0 })).toEqual({
      xVelocity: 0,
      yVelocity: 0,
      rotateVelocity: 0,
      scaleXVelocity: 0,
      scaleYVelocity: -0,
    });
  });

  it("translates, tilts, and stretches in response to pointer direction", () => {
    const impulse = getBobbleSpringImpulse({ x: 500, y: -250 });

    expect(impulse.xVelocity).toBe(120);
    expect(impulse.yVelocity).toBe(-60);
    expect(impulse.rotateVelocity).toBe(3);
    expect(impulse.scaleXVelocity).toBeCloseTo(0.3913, 4);
    expect(impulse.scaleYVelocity).toBeCloseTo(-0.2795, 4);
  });

  it("bounds exceptionally fast pointer input so cards remain contained", () => {
    expect(getBobbleSpringImpulse({ x: 9_000, y: -9_000 })).toEqual({
      xVelocity: 216,
      yVelocity: -216,
      rotateVelocity: 5,
      scaleXVelocity: expect.closeTo(0.8909545443, 8),
      scaleYVelocity: expect.closeTo(-0.6363961031, 8),
    });
  });
});
