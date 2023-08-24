import { createSlice } from "@reduxjs/toolkit";
// eslint-disable-next-line import/no-cycle
import { RootState } from "@/application/store/store";

export type FilterState = {
  start: number | undefined;
  end: number | undefined;
};

export const initialState: FilterState = {
  start: undefined,
  end: undefined,
};

export const SongFilterSlice = createSlice({
  name: "SongFilter",
  initialState,
  reducers: {
    setSongFilter: (state, action: { type: string; payload: FilterState }) => {
      // In RTK it is allowed to mutate the state directly
      // eslint-disable-next-line no-param-reassign
      state.start = action.payload.start;
      // In RTK it is allowed to mutate the state directly
      // eslint-disable-next-line no-param-reassign
      state.end = action.payload.end;
    },
  },
});

export const { setSongFilter } = SongFilterSlice.actions;

export default SongFilterSlice.reducer;
export const SongFilter = (state: RootState) => state.songFilters;
