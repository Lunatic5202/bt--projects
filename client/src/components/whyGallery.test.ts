import { describe, expect, it } from "vitest";
import { getWrappedGalleryIndex } from "./whyGallery";

describe("getWrappedGalleryIndex", () => {
  it("moves forward through the gallery", () => {
    expect(getWrappedGalleryIndex(0, 1, 3)).toBe(1);
    expect(getWrappedGalleryIndex(1, 1, 3)).toBe(2);
  });

  it("wraps forward from the last image to the first", () => {
    expect(getWrappedGalleryIndex(2, 1, 3)).toBe(0);
  });

  it("wraps backward from the first image to the last", () => {
    expect(getWrappedGalleryIndex(0, -1, 3)).toBe(2);
  });

  it("returns a sentinel for an empty gallery", () => {
    expect(getWrappedGalleryIndex(0, 1, 0)).toBe(-1);
  });
});
