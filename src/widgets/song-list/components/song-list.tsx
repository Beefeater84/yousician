"use client";

import Container from "@/shared/components/container/Container";
import { useInfiniteQuery } from "@tanstack/react-query";
import getSongs from "@/entities/song/api/get-songs";
import { SONGS_PER_PAGE } from "@/application/constants/constants";
import { useEffect, useState } from "react";
import { SongType } from "@/entities/song/types/songs-types";
import Table from "@/shared/components/table/table";
import SongRow from "@/widgets/song-list/components/song-row";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "@/shared/components/loader/loading";

export default function SongList() {
  const [songs, setSongs] = useState<SongType[]>([]);

  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    status,
    error,
  } = useInfiniteQuery(
    ["/songs"],
    ({ pageParam = 1 }) =>
      getSongs("/songs", {
        _limit: SONGS_PER_PAGE,
        _start: pageParam * SONGS_PER_PAGE,
      }),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage?.length ? allPages.length + 1 : undefined;
      },
    },
  );

  useEffect(() => {
    if (!data) return;
    setSongs(data.pages.flat());
  }, [data]);

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <main>
      <Container>
        <div
          style={{
            height: "57px",
          }}
        >
          ...
        </div>
        <InfiniteScroll
          dataLength={songs.length}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          loader={<Loading />}
          endMessage={<p>No more songs to load</p>}
        >
          <Table>
            {songs.map((song) => {
              return <SongRow key={song.id} song={song} />;
            })}
          </Table>
        </InfiniteScroll>
      </Container>
    </main>
  );
}
