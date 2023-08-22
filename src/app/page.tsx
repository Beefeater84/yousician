"use client";

import Header from "@/widgets/header/components/header";
import SongList from "@/widgets/song-list/components/song-list";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <SongList />
    </QueryClientProvider>
  );
}
