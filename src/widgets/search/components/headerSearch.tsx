"use client";

import { useSearchFieldState } from "@react-stately/searchfield";
import { ChangeEvent, KeyboardEvent, useRef } from "react";
import { useSearchField } from "react-aria";
import SearchIcon from "@/widgets/search/components/searchIcon";
import { useAppDispatch } from "@/application/hooks/redux-hook";
import { setSearchTerm } from "@/widgets/search/store/searchSlice";

export default function HeaderSearch() {
  const state = useSearchFieldState({ defaultValue: "" });
  const ref = useRef(null);
  const { inputProps } = useSearchField({}, state, ref);
  const dispatch = useAppDispatch();

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    state.setValue(newSearchTerm);
  };

  function dispatchSearchTerm() {
    dispatch(setSearchTerm(state.value));
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      dispatchSearchTerm();
    }
  };

  const onClickHandler = () => {
    dispatchSearchTerm();
  };

  return (
    <div className="relative flex w-[100%]">
      <input
        aria-label="search"
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
        onChange={handleSearchChange}
        onKeyDown={handleKeyPress}
        value={state.value}
      />
      <button
        onClick={onClickHandler}
        aria-label="type to search"
        type="button"
        className="absolute right-0 top-0 h-[100%] pr-6 flex items-center justify-center"
      >
        <SearchIcon />
      </button>
    </div>
  );
}
