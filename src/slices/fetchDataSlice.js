import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = process.env.REACT_APP_SPOONACULAR_API;

export const recipeApi = createApi({
  reducerPath: "recipeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.spoonacular.com" }),
  endpoints: (builder) => ({
    getRecipes: builder.query({
      query: ({ number, type }) =>
        `/recipes/complexSearch?apiKey=${apiKey}&query=${type}&number=${number}`,
    }),
    getRecipeInfo: builder.query({
      query: (idList) =>
        `/recipes/informationBulk?ids=${idList}&apiKey=${apiKey}`,
    }),
  }),
});

export const { useGetRecipesQuery, useGetRecipeInfoQuery } = recipeApi;
