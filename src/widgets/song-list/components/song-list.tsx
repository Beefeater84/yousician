"use client";

import Container from "@/shared/components/container/Container";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
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
import SongListFilters from "@/featured/song-list-filters/components/song-list-filters";

export default function SongList({ searchTerm = "" }) {
  const [songs, setSongs] = useState<SongType[]>([]);
  const [favorites, setFavorites] = useState(new Map());

  const { fetchNextPage, hasNextPage, data, status } = useInfiniteQuery(
    ["/songs", searchTerm],
    ({ pageParam = 0 }) =>
      getSongs("/songs", {
        _limit: SONGS_PER_PAGE,
        _start: pageParam * SONGS_PER_PAGE,
        search_like: searchTerm,
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
    <InfiniteScroll
      dataLength={songs.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
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
  );
}
