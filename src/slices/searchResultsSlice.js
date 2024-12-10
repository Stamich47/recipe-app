import { createSlice } from "@reduxjs/toolkit";

export const searchResultsSlice = createSlice({
  name: "searchResults",
  initialState: {
    searchResults: [],
  },
  reducers: {
    saveSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
  },
});

export const { saveSearchResults } = searchResultsSlice.actions;
export default searchResultsSlice.reducer;
