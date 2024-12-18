import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = process.env.REACT_APP_SPOONACULAR_API;

export const recipeApi = createApi({
  reducerPath: "recipeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.spoonacular.com" }),
  endpoints: (builder) => ({
    getRecipes: builder.query({
      query: (type) =>
        `/recipes/complexSearch?apiKey=${apiKey}&query=${type}&addRecipeInformation=true&addRecipeInstructions=true&number=20`,
    }),
    getRecipeInfo: builder.query({
      query: (idList) =>
        `/recipes/informationBulk?ids=${idList}&apiKey=${apiKey}`,
    }),
    getDiscoverRecipe: builder.query({
      query: () => `/recipes/random?apiKey=${apiKey}&number=1`,
    }),
    getTrendingRecipe: builder.query({
      query: ({ number, type }) =>
        `/recipes/random?apiKey=${apiKey}&number=${number}&include-tags=${type}`,
    }),
    getAutoComplete: builder.query({
      query: (query) =>
        `/recipes/autocomplete?apiKey=${apiKey}&number=5&query=${query}`,
    }),
    getRecipeCard: builder.query({
      query: (id) =>
        `/recipes/${id}/card?backgroundColor=FFDDD2&apiKey=${apiKey}`,
    }),
  }),
});

export const {
  useGetRecipesQuery,
  useGetRecipeInfoQuery,
  useGetDiscoverRecipeQuery,
  useGetTrendingRecipeQuery,
  useGetAutoCompleteQuery,
  useGetRecipeCardQuery,
} = recipeApi;
