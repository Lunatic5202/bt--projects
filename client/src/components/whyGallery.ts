/**
 * Resolve cyclic lightbox navigation without leaking invalid indices into the
 * gallery state. A negative value means the gallery has no images to show.
 */
export function getWrappedGalleryIndex(
  currentIndex: number,
  direction: -1 | 1,
  length: number,
) {
  if (length <= 0) return -1;
  return (currentIndex + direction + length) % length;
}
