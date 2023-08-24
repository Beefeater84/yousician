import FilterIcon from "@/featured/song-list-filters/icons/filterIcon";

export default function FilterButton({
  onClickHandler,
  isFilterShown,
  filters,
}) {
  const { start, end } = filters;

  const isFilterActive = start || end;

  const Filter =
    isFilterActive && !isFilterShown
      ? end
        ? `${start} - ${end}`
        : start
      : null;

  return (
    <button
      onClick={onClickHandler}
      type="button"
      aria-label="hide filters"
      className="flex gap-2 justify-center items-center focus:outline-none min-h-[57px] font-semibold"
    >
      {isFilterShown ? "HIDE FILTER" : "FILTER BY LEVEL"}
      {Filter}
      <div>
        <FilterIcon />
      </div>
    </button>
  );
}
