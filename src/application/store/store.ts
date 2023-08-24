import { configureStore } from "@reduxjs/toolkit";
// eslint-disable-next-line import/no-cycle
import { SongFilterSlice } from "@/widgets/song-list-filters/store/filterSlice";
// eslint-disable-next-line import/no-cycle
import { SongSearchSlice } from "@/widgets/search/store/searchSlice";

export const reducer = {
  songFilters: SongFilterSlice.reducer,
  songSearch: SongSearchSlice.reducer,
};

const store = configureStore({
  reducer,
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
