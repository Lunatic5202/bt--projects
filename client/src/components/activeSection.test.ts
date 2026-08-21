import { describe, expect, it } from "vitest";
import { getActiveSectionId } from "./activeSection";

describe("getActiveSectionId", () => {
  it("chooses the intersecting section with the greatest visible ratio", () => {
    expect(
      getActiveSectionId([
        { id: "overview", isIntersecting: true, ratio: 0.26, top: -120 },
        { id: "services", isIntersecting: true, ratio: 0.58, top: 180 },
      ]),
    ).toBe("services");
  });

  it("breaks equal-ratio ties with the section nearest the observation band", () => {
    expect(
      getActiveSectionId([
        { id: "operations", isIntersecting: true, ratio: 0.4, top: -155 },
        { id: "projects", isIntersecting: true, ratio: 0.4, top: 28 },
      ]),
    ).toBe("projects");
  });

  it("returns null when no section is inside the observation band", () => {
    expect(
      getActiveSectionId([
        { id: "overview", isIntersecting: false, ratio: 0, top: -300 },
        { id: "services", isIntersecting: false, ratio: 0, top: 860 },
      ]),
    ).toBeNull();
  });
});
