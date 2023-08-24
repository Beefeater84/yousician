"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import getSongs from "@/entities/song/api/get-songs";
import { SONGS_PER_PAGE } from "@/application/constants/constants";
import { useEffect, useState } from "react";
import { SongType } from "@/entities/song/types/songs-types";
import Table from "@/shared/components/table/table";
import SongRow from "@/widgets/song-list/components/song-row";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "@/shared/components/loader/loading";
import NoMoreElements from "@/widgets/song-list/components/song-list-no-more-elements";
import { getFavorites } from "@/entities/song/api/favorites";
import { useAppSelector } from "@/application/hooks/redux-hook";
import { SongFilter } from "@/featured/song-list-filters/store/filterSlice";
import { SongSearch } from "@/widgets/search/store/searchSlice";
import createFilterParams from "@/widgets/song-list/helpers/create-filter-params";

export default function SongList() {
  const { start, end } = useAppSelector(SongFilter);
  const { searchTerm } = useAppSelector(SongSearch);
  const filterParams = createFilterParams(start, end);

  const { fetchNextPage, hasNextPage, data, status } = useInfiniteQuery(
    ["/songs", searchTerm, filterParams],
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

  const { data: favoritesData } = useQuery({
    queryKey: ["/favorites"],
    queryFn: getFavorites,
  });

  const [songs, setSongs] = useState<SongType[]>([]);
  const [favorites, setFavorites] = useState(new Map());

  useEffect(() => {
    if (!favoritesData) return;
    const favoritesMap = new Map();
    favoritesData.forEach((favorite) => {
      favoritesMap.set(favorite.songId, favorite.id);
      setFavorites(favoritesMap);
    });
  }, [favoritesData]);

  useEffect(() => {
    if (!data) return;
    setSongs(data.pages.flat());
  }, [data]);

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <section className="mx-[-1rem] tablet:mx-0">
      <InfiniteScroll
        dataLength={songs.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage && songs.length >= SONGS_PER_PAGE}
        loader={<Loading />}
        endMessage={<NoMoreElements />}
      >
        <Table>
          {songs.map((song) => {
            const isFavorite = favorites.has(song.id);
            const favoriteId = favorites.get(song.id);

            return (
              <SongRow
                key={song.id}
                song={song}
                isFavorite={isFavorite}
                favoriteId={favoriteId}
              />
            );
          })}
        </Table>
      </InfiniteScroll>
    </section>
  );
}
