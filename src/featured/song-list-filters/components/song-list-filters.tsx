"use client";

import { useEffect, useState } from "react";
import styles from "@/featured/song-list-filters/components/song-list-filters.module.scss";
import { SongLevelType } from "@/entities/song/types/songs-types";
import Level from "@/featured/level/components/level";
import FilterButton from "@/featured/song-list-filters/components/filter-button";
import useDebounce from "@/shared/hooks/useDebounce";
import { useAppDispatch } from "@/application/hooks/redux-hook";
import { setSongFilter } from "@/featured/song-list-filters/store/filterSlice";

export type FilterType = {
  start: number | undefined;
  end: number | undefined;
};

export default function SongListFilters() {
  const dispatch = useAppDispatch();
  const [showFilters, setShowFilters] = useState(false);
  const [filter, setFilter] = useState<FilterType>({
    start: undefined,
    end: undefined,
  });
  const UPDATE_SEARCH_DELAY = 1000;
  const debouncedFilter = useDebounce(filter, UPDATE_SEARCH_DELAY);

  const levels: SongLevelType[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  ];

  const onClickHandler = () => {
    setShowFilters(!showFilters);
  };

  const onFilterHandler = (level: number) => {
    if (level === filter.start) {
      setFilter({
        start: undefined,
        end: undefined,
      });
      return;
    }

    if (filter.start && filter.end) {
      setFilter({
        start: level,
        end: undefined,
      });
      return;
    }

    if (!filter.start) {
      setFilter({
        start: level,
        end: undefined,
      });
      return;
    }

    if (filter.start && !filter.end) {
      if (level >= filter.start) {
        setFilter({
          start: filter.start,
          end: level,
        });
      } else {
        setFilter({
          start: level,
          end: filter.start,
        });
      }
    }
  };

  useEffect(() => {
    dispatch(setSongFilter(debouncedFilter));
  }, [debouncedFilter, dispatch]);

  return (
    <section className="px-4">
      <div className="flex justify-end w-full ">
        <FilterButton
          onClickHandler={onClickHandler}
          isFilterShown={showFilters}
          filters={filter}
        />
      </div>

      <div
        className={`${styles["filters-container"]} ${
          showFilters ? styles.open : ""
        }`}
      >
        <div className="flex gap-[1.1rem] justify-end items-center pb-[2rem] pt-[0.5rem] flex-wrap">
          {levels.map((level) => {
            let levelButtonState: "selected" | undefined;
            if (
              (filter.start !== undefined &&
                filter.end !== undefined &&
                level >= filter.start &&
                level <= filter.end) ||
              level === filter.start
            ) {
              levelButtonState = "selected";
            }

            return (
              <button
                type="button"
                onClick={() => onFilterHandler(level)}
                key={level}
              >
                <Level difficulty={level} state={levelButtonState} />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
