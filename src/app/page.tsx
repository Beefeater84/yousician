"use client";

import Header from "@/widgets/header/components/header";
import SongList from "@/widgets/song-list/components/song-list";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import Container from "@/shared/components/container/Container";
import SongListFilters from "@/featured/song-list-filters/components/song-list-filters";
import { Provider } from "react-redux";
import store from "@/application/store/store";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

export default function Home() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Header />
        <main>
          <Container>
            <SongListFilters />
            <SongList />
          </Container>
        </main>
      </QueryClientProvider>
    </Provider>
  );
}
