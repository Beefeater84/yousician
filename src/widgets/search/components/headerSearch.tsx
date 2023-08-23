"use client";

import { useSearchFieldState } from "@react-stately/searchfield";
import { useRef } from "react";
import { useSearchField } from "react-aria";
import SearchIcon from "@/widgets/search/components/searchIcon";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function HeaderSearch() {
  const state = useSearchFieldState({ defaultValue: "" });
  const ref = useRef(null);
  const { inputProps } = useSearchField({}, state, ref);

  const queryClient = useQueryClient();
  const searchMutation = useMutation({
    mutationFn: async (newSearchTerm: string) => {
      return newSearchTerm;
    },

    onSuccess: async (newSearchTerm) => {
      await queryClient.invalidateQueries({
        queryKey: ["/songs"],
      });
    },
  });

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    queryClient.invalidateQueries(["/searchTerm"]);
    queryClient.setQueryData(["/searchTerm"], {
      searchTerm: newSearchTerm,
    });
    state.setValue(newSearchTerm);
    console.log("Updated searchTerm in cache", newSearchTerm);
  };

  const onClickHandler = () => {
    searchMutation.mutateAsync(state.value);
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
