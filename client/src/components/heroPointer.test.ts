import { describe, expect, it } from "vitest";
import { getHeroPointerPull } from "./heroPointer";

describe("hero iOS pointer helper", () => {
  it("keeps the CTA at rest when the pointer is centred", () => {
    expect(getHeroPointerPull({ x: 80, y: 24, width: 160, height: 48 })).toEqual({
      x: 0,
      y: 0,
      scale: 1,
    });
  });

  it("gently pulls the CTA toward the pointer within its bounds", () => {
    expect(getHeroPointerPull({ x: 160, y: 0, width: 160, height: 48 })).toEqual({
      x: 10,
      y: -3.84,
      scale: 1.024,
    });
  });

  it("bounds outlying coordinates so a CTA cannot drift too far", () => {
    expect(getHeroPointerPull({ x: 3_000, y: -3_000, width: 160, height: 48 })).toEqual({
      x: 10,
      y: -10,
      scale: 1.024,
    });
  });
});
