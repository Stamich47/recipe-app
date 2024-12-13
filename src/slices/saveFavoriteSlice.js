import { createSlice } from "@reduxjs/toolkit";

const getFavoritesFromLocalStorage = () => {
  const favorites = localStorage.getItem("favorites");
  if (favorites) {
    return JSON.parse(favorites);
  }
  return [];
};

export const saveFavoriteSlice = createSlice({
  name: "saveFavorite",
  initialState: {
    favorites: getFavoritesFromLocalStorage(),
  },
  reducers: {
    saveFavorite: (state, action) => {
      state.favorites.push(action.payload);
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
      if (state.favorites.length > 10) {
        state.favorites.shift();
        localStorage.setItem("favorites", JSON.stringify(state.favorites));
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (favorite) => favorite.id !== action.payload.id
      );
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
  },
});

export const { saveFavorite, removeFavorite } = saveFavoriteSlice.actions;
export default saveFavoriteSlice.reducer;
