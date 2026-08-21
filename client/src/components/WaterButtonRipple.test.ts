import { describe, expect, it } from "vitest";
import { getWaterRippleGeometry } from "./WaterButtonRipple";

describe("getWaterRippleGeometry", () => {
  const rect = { left: 10, top: 20, width: 120, height: 48 };

  it("uses the press position as the ripple origin and covers the furthest corner", () => {
    expect(getWaterRippleGeometry(rect, 18, 25)).toEqual({ x: 8, y: 5, size: 240 });
  });

  it("centres keyboard-triggered ripple geometry cleanly", () => {
    expect(getWaterRippleGeometry(rect, 70, 44)).toEqual({ x: 60, y: 24, size: 130 });
  });

  it("keeps an unexpected press point within the button clipping area", () => {
    expect(getWaterRippleGeometry(rect, -50, 500)).toEqual({ x: 0, y: 48, size: 259 });
  });
});
