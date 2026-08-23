export function getCarouselOffset(
  index: number,
  activeIndex: number,
  itemCount: number,
) {
  const rawOffset = index - activeIndex;
  const half = Math.floor(itemCount / 2);

  return rawOffset > half
    ? rawOffset - itemCount
    : rawOffset < -half
      ? rawOffset + itemCount
      : rawOffset;
}
