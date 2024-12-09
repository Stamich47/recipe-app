import { createSlice } from "@reduxjs/toolkit";

const saveFavoritesToLocalStorage = (favorites) => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

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
      saveFavoritesToLocalStorage(state.favorites);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (favorite) => favorite.id !== action.payload.id
      );
      saveFavoritesToLocalStorage(state.favorites);
    },
  },
});

export const { saveFavorite, removeFavorite } = saveFavoriteSlice.actions;
export default saveFavoriteSlice.reducer;
