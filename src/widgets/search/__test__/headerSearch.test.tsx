import React from "react";
import "@testing-library/jest-dom";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { Provider } from "react-redux";
import store from "@/application/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "@/widgets/header/components/header";
import Container from "@/shared/components/container/Container";
import SongListFilters from "@/widgets/song-list-filters/components/song-list-filters";
import SongList from "@/widgets/song-list/components/song-list";
import axios from "axios";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

afterEach(() => {
  jest.clearAllMocks();
  queryClient.clear();
  cleanup();
});

test("renders HeaderSearch component", () => {
  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Header />
      </QueryClientProvider>
    </Provider>,
  );

  const input = screen.getByLabelText("Search for songs by artist or title");
  expect(input).toBeInTheDocument();
});

test("changes input value on typing", () => {
  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Header />
      </QueryClientProvider>
    </Provider>,
  );

  const input: HTMLInputElement = screen.getByLabelText(
    "Search for songs by artist or title",
  );
  fireEvent.change(input, { target: { value: "New Search Term" } });

  expect(input.value).toBe("New Search Term");
});
