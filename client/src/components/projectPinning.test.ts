import { describe, expect, it } from "vitest";
import { getActiveProjectIndex, getProjectScrollProgress } from "./projectPinning";

describe("project scroll pinning helpers", () => {
  it("clamps a pinned section's vertical progress", () => {
    expect(getProjectScrollProgress(300, 3600, 900)).toBe(0);
    expect(getProjectScrollProgress(-1350, 3600, 900)).toBe(0.5);
    expect(getProjectScrollProgress(-4000, 3600, 900)).toBe(1);
  });

  it("selects one of four project stages without overflowing", () => {
    expect(getActiveProjectIndex(0, 4)).toBe(0);
    expect(getActiveProjectIndex(0.49, 4)).toBe(1);
    expect(getActiveProjectIndex(0.99, 4)).toBe(3);
    expect(getActiveProjectIndex(1, 4)).toBe(3);
  });
});
