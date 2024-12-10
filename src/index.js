import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { recipeApi } from "./slices/fetchDataSlice";
import saveFavoriteReducer from "./slices/saveFavoriteSlice";
import searchResultsReducer from "./slices/searchResultsSlice";
import { BrowserRouter } from "react-router-dom";

const store = configureStore({
  reducer: {
    [recipeApi.reducerPath]: recipeApi.reducer,
    saveFavorite: saveFavoriteReducer,
    searchResults: searchResultsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(recipeApi.middleware),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
