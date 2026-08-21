import { describe, expect, it } from "vitest";
import {
  getCyclicTeamIndex,
  getTeamSwipeDirection,
  getVisibleTeamStack,
} from "./teamCardStack";

describe("team card stack helpers", () => {
  it("wraps indices in either direction", () => {
    expect(getCyclicTeamIndex(0, -1, 3)).toBe(2);
    expect(getCyclicTeamIndex(2, 1, 3)).toBe(0);
  });

  it("orders the visible stack from the active card through the deck", () => {
    expect(getVisibleTeamStack(["delivery", "operations", "coordination"], 2)).toEqual([
      "coordination",
      "delivery",
      "operations",
    ]);
  });

  it("only changes cards after a deliberate horizontal swipe", () => {
    expect(getTeamSwipeDirection(-88)).toBe(1);
    expect(getTeamSwipeDirection(88)).toBe(-1);
    expect(getTeamSwipeDirection(54)).toBe(0);
  });
});
