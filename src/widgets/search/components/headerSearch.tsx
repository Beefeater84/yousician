"use client";

import { useSearchFieldState } from "@react-stately/searchfield";
import { useRef } from "react";
import { useSearchField } from "react-aria";
import SearchIcon from "@/widgets/search/components/searchIcon";

export default function HeaderSearch() {
  const state = useSearchFieldState({ defaultValue: "" });
  const ref = useRef(null);
  const { inputProps } = useSearchField({}, state, ref);

  return (
    <div className="relative flex w-[100%]">
      <input
        aria-label="Search the songs"
        ref={ref}
        {...inputProps}
        className="
              h-[47px]
              pr-12
              pl-4
              tablet:pl-8
              tablet:pr-16
              pr-100
              w-full
              rounded-[25px]
              appearance-none
        "
        type="search"
        name="headerSearch"
        placeholder="Search for songs by artist or title"
      />
      <button
        type="button"
        className="absolute right-0 top-0 h-[100%] pr-6 flex items-center justify-center"
      >
        <SearchIcon />
      </button>
    </div>
  );
}
