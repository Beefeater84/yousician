type FilterParams = {
  level: number[] | null;
};

export default function createFilterParams(
  start: number | undefined,
  end: number | undefined,
) {
  const filterParams: FilterParams = {
    level: null,
  };

  if (start !== undefined && end !== undefined) {
    const range = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    filterParams.level = range;
  } else if (start !== undefined) {
    filterParams.level = [start];
  }

  if (start === undefined && end === undefined) {
    filterParams.level = null;
  }

  // return level=1&level=2&level=3
  return filterParams;
}
