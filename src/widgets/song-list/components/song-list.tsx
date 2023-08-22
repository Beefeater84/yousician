"use client";

import Container from "@/shared/components/container/Container";
import { useInfiniteQuery } from "@tanstack/react-query";
import getSongs from "@/entities/song/api/get-songs";
import { SONGS_PER_PAGE } from "@/application/constants/constants";
import { useEffect, useRef, useState } from "react";
import { SongType } from "@/entities/song/types/songs-types";
import Table from "@/shared/components/table/table";
import Image from "next/image";
import SongRow from "@/widgets/song-list/components/song-row";

export default function SongList() {
  const [songs, setSongs] = useState<SongType[]>([]);
  const lastSongRef = useRef<HTMLDivElement>(null);

  const { fetchNextPage, isFetchingNextPage, data, status, error } =
    useInfiniteQuery(
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
    setSongs((prevSongs) => [...prevSongs, ...data.pages.flat()]);
  }, [data]);

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
        <Table>
          {songs.map((song) => {
            return <SongRow key={song.id} song={song} />;
          })}
        </Table>
      </Container>
    </main>
  );
}
