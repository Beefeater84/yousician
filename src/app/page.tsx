"use client";

import Header from "@/widgets/header/components/header";
import SongList from "@/widgets/song-list/components/song-list";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import Container from "@/shared/components/container/Container";
import SongListFilters from "@/featured/song-list-filters/components/song-list-filters";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <QueryClientProvider client={queryClient}>
      <Header startSearch={setSearchTerm} />
      <main>
        <Container>
          <SongListFilters />
          <SongList searchTerm={searchTerm} />
        </Container>
      </main>
    </QueryClientProvider>
  );
}
