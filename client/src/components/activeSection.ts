export type SectionVisibility = {
  id: string;
  isIntersecting: boolean;
  ratio: number;
  top: number;
};

/**
 * Select the most visible section inside the header's observation band.
 * When two sections have equal visibility, the one nearest the band origin
 * wins so the highlighted navigation state stays deterministic.
 */
export function getActiveSectionId(sections: readonly SectionVisibility[]): string | null {
  const visibleSections = sections.filter((section) => section.isIntersecting && section.ratio > 0);

  if (visibleSections.length === 0) return null;

  return [...visibleSections].sort(
    (left, right) => right.ratio - left.ratio || Math.abs(left.top) - Math.abs(right.top),
  )[0].id;
}
