"use client";

import { useEffect, useState } from "react";
import styles from "@/featured/song-list-filters/components/song-list-filters.module.scss";
import { SongLevelType } from "@/entities/song/types/songs-types";
import Level from "@/featured/level/components/level";
import FilterButton from "@/featured/song-list-filters/components/filter-button";
import useDebounce from "@/shared/hooks/useDebounce";

type FilterType = {
  start: number | undefined;
  end: number | undefined;
};

export default function SongListFilters() {
  const [showFilters, setShowFilters] = useState(false);
  const [filter, setFilter] = useState<FilterType>({
    start: undefined,
    end: undefined,
  });
  const UPDATE_SEARCH_DELAY = 2000;
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

  const Go = () => {
    // Здесь можете выполнить необходимые действия по обработке фильтров
    console.log("Go function called");
  };

  useEffect(() => {
    // Если есть только start, задержка на запуск функции Go
    if (debouncedFilter.start && !debouncedFilter.end) {
      Go();
    }
    // Если есть и start, и end, сразу запускаем функцию Go
    else if (debouncedFilter.start && debouncedFilter.end) {
      Go();
    }
  }, [debouncedFilter]);

  return (
    <section>
      <div className="flex justify-end w-full">
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
        <div className="flex gap-2 justify-center items-center">
          {levels.map((level) => {
            const classes = [];
            if (level >= filter.start && level <= filter.end) {
              classes.push("bg-green-500");
            }

            if (level === filter.start) {
              classes.push("bg-green-500");
            }

            return (
              <button
                type="button"
                className={classes.join(" ")}
                onClick={() => onFilterHandler(level)}
                key={level}
              >
                <Level difficulty={level} />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
