import { describe, expect, it } from "vitest";
import { getSiteImageSources, SITE_IMAGE_ASSETS } from "./siteImagePreload";

describe("site image preload manifest", () => {
  it("lists every managed public visual asset exactly once", () => {
    const sources = getSiteImageSources();

    expect(sources).toHaveLength(16);
    expect(new Set(sources).size).toBe(sources.length);
    expect(sources).toContain("/manus-storage/hero-water-plant_c037dda2.webp");
    expect(sources).toContain("/manus-storage/static-map-office_9f497833.png");
    expect(sources).toContain("/manus-storage/team-sample-arun-mehta_cba1713f.webp");
    expect(sources).toContain("/manus-storage/team-sample-neha-sen_ddf1221c.webp");
    expect(sources).toContain("/manus-storage/team-sample-rohan-iyer_7ada1601.webp");
  });

  it("separates initial visual assets from below-the-fold imagery", () => {
    const critical = getSiteImageSources("critical");
    const secondary = getSiteImageSources("secondary");

    expect(critical).toEqual([
      "/manus-storage/bt-logo_026b8bce.png",
      "/manus-storage/hero-water-plant_c037dda2.webp",
    ]);
    expect(secondary).toHaveLength(SITE_IMAGE_ASSETS.length - critical.length);
    expect(secondary).not.toContain(critical[0]);
  });
});
