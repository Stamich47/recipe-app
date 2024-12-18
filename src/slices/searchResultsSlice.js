import { createSlice } from "@reduxjs/toolkit";

export const searchResultsSlice = createSlice({
  name: "searchResults",
  initialState: {
    searchResults: [],
    filterOptions: [],
  },
  reducers: {
    saveSearchResults: (state, action) => {
      const { results } = action.payload;
      state.searchResults = results;
      // localStorage.setItem(query, JSON.stringify(results));
    },
    saveFilterOptions: (state, action) => {
      state.filterOptions = action.payload;
    },
  },
});

export const { saveSearchResults, saveFilterOptions } =
  searchResultsSlice.actions;
export default searchResultsSlice.reducer;
