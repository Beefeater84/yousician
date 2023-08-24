import { useInfiniteQuery } from "@tanstack/react-query";
import getSongs from "@/entities/song/api/get-songs";
import { SONGS_PER_PAGE } from "@/application/constants/constants";
import { useAppSelector } from "@/application/hooks/redux-hook";
import { SongFilter } from "@/widgets/song-list-filters/store/filterSlice";
import { SongSearch } from "@/widgets/search/store/searchSlice";
import createFilterParams from "@/widgets/song-list/helpers/create-filter-params";

export default function useInfinitySongs() {
  const { start, end } = useAppSelector(SongFilter);
  const { searchTerm } = useAppSelector(SongSearch);
  const filterParams = createFilterParams(start, end);

  return useInfiniteQuery(
    ["/songs", searchTerm, filterParams], // query key
    ({ pageParam = 0 }) =>
      getSongs("/songs", {
        _limit: SONGS_PER_PAGE,
        _start: pageParam * SONGS_PER_PAGE,
        search_like: searchTerm,
        ...filterParams,
      }),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage?.length ? allPages.length + 1 : undefined;
      },
    },
  );
}
