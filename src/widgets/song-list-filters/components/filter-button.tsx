import FilterIcon from "@/widgets/song-list-filters/icons/filterIcon";
// Take it from parent Component
// eslint-disable-next-line import/no-cycle
import { FilterType } from "@/widgets/song-list-filters/components/song-list-filters";

interface FilterButtonProps {
  onClickHandler: () => void;
  isFilterShown: boolean;
  filters: FilterType;
}

export default function FilterButton({
  onClickHandler,
  isFilterShown,
  filters,
}: FilterButtonProps) {
  const { start, end } = filters;

  const isFilterActive = start || end;

  let Filter = null;
  const changeFilterStiles = isFilterActive && !isFilterShown;
  if (changeFilterStiles) {
    if (end) {
      Filter = `${start} - ${end}`;
    } else if (start) {
      Filter = start;
    }
  }

  return (
    <button
      onClick={onClickHandler}
      type="button"
      aria-label="hide filters"
      className="flex gap-2 justify-center items-center focus:outline-none min-h-[57px] font-semibold text-xs"
    >
      {isFilterShown ? "HIDE FILTER" : "FILTER BY LEVEL"}
      <div
        className={`rounded-full border border-white flex justify-center gap-2 items-center h-[32px] ${
          changeFilterStiles ? "pl-3" : undefined
        }`}
      >
        {changeFilterStiles && Filter}
        <div
          className={`
            h-[32px] w-[32px] rounded-full flex justify-center items-center 
            ${changeFilterStiles ? "bg-white text-black" : undefined}
        `}
        >
          <FilterIcon />
        </div>
      </div>
    </button>
  );
}
