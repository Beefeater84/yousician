import { createSlice } from "@reduxjs/toolkit";
// eslint-disable-next-line import/no-cycle
import { RootState } from "@/application/store/store";

export type searchState = {
  searchTerm: string | undefined;
};

export const initialState: searchState = {
  searchTerm: undefined,
};

export const SongSearchSlice = createSlice({
  name: "searchSong",
  initialState,
  reducers: {
    setSearchTerm: (
      state,
      action: { type: string; payload: string | undefined },
    ) => {
      // In RTK it is allowed to mutate the state directly
      // eslint-disable-next-line no-param-reassign
      state.searchTerm = action.payload;
    },
  },
});

export const { setSearchTerm } = SongSearchSlice.actions;

export default SongSearchSlice.reducer;
export const SongSearch = (state: RootState) => state.songSearch;
