import { createSlice } from "@reduxjs/toolkit";

export const saveFavoriteSlice = createSlice({
  name: "saveFavorite",
  initialState: {
    favorites: [],
  },
  reducers: {
    saveFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (favorite) => favorite.id !== action.payload.id
      );
    },
  },
});

export const { saveFavorite, removeFavorite } = saveFavoriteSlice.actions;
export default saveFavoriteSlice.reducer;
