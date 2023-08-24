import createFilterParams from "@/widgets/song-list/helpers/create-filter-params";

describe("createFilterParams function", () => {
  it("should return a range of levels when both start and end are provided", () => {
    const result = createFilterParams(1, 3);
    expect(result.level).toEqual([1, 2, 3]);
  });

  it("should return only the start level when only start is provided", () => {
    const result = createFilterParams(1, undefined);
    expect(result.level).toEqual([1]);
  });

  it("should return null for level when neither start nor end are provided", () => {
    const result = createFilterParams(undefined, undefined);
    expect(result.level).toBeNull();
  });

  it("should return null for level when start is provided but end is undefined", () => {
    const result = createFilterParams(1, undefined);
    expect(result.level).toEqual([1]);
  });

  it("should return null for level when end is provided but start is undefined", () => {
    const result = createFilterParams(undefined, 3);
    expect(result.level).toBeNull();
  });
});
