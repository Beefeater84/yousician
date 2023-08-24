import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode } from "react";
import nock from "nock";
import { responseForPage0 } from "@/__test__/mock/song-db-response";
import { renderHook, waitFor } from "@testing-library/react";
import useInfinitySongs from "@/widgets/song-list/hooks/useInfinitySongs";
import store from "@/application/store/store";
import { Provider } from "react-redux";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: ReactNode }) => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </Provider>
);

describe("useInfiniteQuery", () => {
  test("it fetch the song list", async () => {
    await nock("http://localhost:3004")
      .persist()
      .get(`/songs?_limit=9&_start=0`)
      .reply(200, responseForPage0);

    const { result } = renderHook(() => useInfinitySongs(), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.pages[0]).toStrictEqual({
      data: responseForPage0.data,
      limit: responseForPage0.limit,
      total: responseForPage0.total,
      page: responseForPage0.page,
    });
  });
});
