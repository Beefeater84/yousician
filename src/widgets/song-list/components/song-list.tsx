"use client";

import { useQuery } from "@tanstack/react-query";
import { SONGS_PER_PAGE } from "@/application/constants/constants";
import { useEffect, useState } from "react";
import { SongType } from "@/entities/song/types/songs-types";
import Table from "@/shared/components/table/table";
import SongRow from "@/widgets/song-list/components/song-row";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "@/shared/components/loader/loading";
import NoMoreElements from "@/widgets/song-list/components/song-list-no-more-elements";
import { getFavorites } from "@/entities/song/api/favorites";
import useInfinitySongs from "@/widgets/song-list/hooks/useInfinitySongs";

export default function SongList() {
  const { fetchNextPage, hasNextPage, data, status } = useInfinitySongs();

  const { data: favoritesData } = useQuery({
    queryKey: ["/favorites"],
    queryFn: getFavorites,
  });

  const [favorites, setFavorites] = useState(new Map());

  useEffect(() => {
    if (!favoritesData) return;
    const favoritesMap = new Map();
    favoritesData.forEach((favorite) => {
      favoritesMap.set(favorite.songId, favorite.id);
      setFavorites(favoritesMap);
    });
  }, [favoritesData]);

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "error") {
    // TODO: add error component
    return <div>ERROR</div>;
  }

  const songs: SongType[] = data?.pages?.flat() || [];

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
