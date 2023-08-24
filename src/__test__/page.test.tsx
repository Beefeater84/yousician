import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import SongList from "@/widgets/song-list/components/song-list";
import { render, screen, act } from "@testing-library/react";
import store from "@/application/store/store";
import Header from "@/widgets/header/components/header";
import Container from "@/shared/components/container/Container";
import SongListFilters from "@/widgets/song-list-filters/components/song-list-filters";
import React from "react";
import useInfinitySongs from "@/widgets/song-list/hooks/useInfinitySongs";
import { responseForPage0 } from "@/__test__/mock/song-db-response";

const mockedUseUsersQuery = useInfinitySongs as jest.Mock;

// Mock the hook module
jest.mock("@/widgets/song-list/hooks/useInfinitySongs");

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
});

test("render without crashes", async () => {
  mockedUseUsersQuery.mockImplementation(() => ({ isLoading: true }));

  render(
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
    </Provider>,
  );

  jest.clearAllMocks();
});

test("Displays error message", () => {
  mockedUseUsersQuery.mockImplementation(() => ({
    status: "error",
    error: {
      message: "An error occured!",
    },
  }));

  render(
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
    </Provider>,
  );
  expect(screen.getByText(/error/i)).toBeInTheDocument();

  jest.clearAllMocks();
});

test("Displays no data found message", () => {
  mockedUseUsersQuery.mockImplementation(() => ({
    status: "loaded",
    data: undefined,
  }));

  render(
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
    </Provider>,
  );
  expect(
    screen.getByText(
      /You saw all our songs for that moment. Next week we will add more/i,
    ),
  ).toBeInTheDocument();

  jest.clearAllMocks();
});

test("Displays the songs list", async () => {
  mockedUseUsersQuery.mockImplementation(() => ({
    status: "success",
    data: {
      pages: responseForPage0.data,
    },
  }));

  render(
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
    </Provider>,
  );

  await expect(
    screen.getByText(`${responseForPage0.data[0].title}`),
  ).toBeInTheDocument();

  await expect(
    screen.getAllByText(`${responseForPage0.data[0].artist}`)[0],
  ).toBeInTheDocument();

  jest.clearAllMocks();
});
