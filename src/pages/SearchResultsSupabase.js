import ResultsCard from "../components/ResultsCard";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { supabase } from "../services/supabaseClient";
import { saveSearchResults } from "../slices/searchResultsSlice"; // Import the Supabase client

export default function SearchResultsSupabase() {
  const [searchTerm, setSearchTerm] = useState("");
  const apiKey = process.env.REACT_APP_SPOONACULAR_API;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const filteredOptions = useSelector(
    (state) => state.searchResults.filterOptions
  );
  const dispatch = useDispatch();

  const location = useLocation();
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const term = query.get("query");
    setSearchTerm(term);
  }, [location.search]);

  useEffect(() => {
    if (searchTerm) {
      const fetchSearchResults = async () => {
        setIsLoading(true);
        setError(null);
        let allResults = [];
        let offset = 0;
        const batchSize = 100;

        try {
          const { data: storedResults, error: fetchError } = await supabase
            .from("search_results")
            .select("results")
            .eq("search_term", searchTerm)
            .single();
          console.log(storedResults);

          if (
            fetchError &&
            fetchError.code !== "PGRST116" &&
            fetchError.code !== "406"
          ) {
            throw fetchError;
          }

          if (storedResults) {
            console.log(`Using cached results for query: ${searchTerm}`);
            allResults = storedResults.results.filter((recipe) => {
              return !(
                (filteredOptions.includes("Vegan") && recipe.vegan === false) ||
                (filteredOptions.includes("Vegetarian") &&
                  recipe.vegetarian === false) ||
                (filteredOptions.includes("Gluten Free") &&
                  recipe.glutenFree === false) ||
                (filteredOptions.includes("Dairy Free") &&
                  recipe.dairyFree === false)
              );
            });
          } else {
            while (allResults.length < 20) {
              const response = await fetch(
                `https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&addRecipeInformation=true&addRecipeInstructions=true&fillIngredients=true&apiKey=${apiKey}&offset=${offset}&number=${batchSize}`
              );
              const result = await response.json();

              dispatch(
                saveSearchResults({
                  query: searchTerm,
                  results: result.results,
                })
              );

              const filteredResults = result.results.filter((recipe) => {
                return !(
                  (filteredOptions.includes("Vegan") &&
                    recipe.vegan === false) ||
                  (filteredOptions.includes("Vegetarian") &&
                    recipe.vegetarian === false) ||
                  (filteredOptions.includes("Gluten Free") &&
                    recipe.glutenFree === false) ||
                  (filteredOptions.includes("Dairy Free") &&
                    recipe.dairyFree === false)
                );
              });

              allResults = allResults.concat(filteredResults);
              offset += batchSize;

              if (result.results.length === 0) {
                break;
              }
            }

            // Store results in Supabase
            const { error: insertError } = await supabase
              .from("search_results")
              .insert([{ search_term: searchTerm, results: allResults }]);

            if (insertError) {
              throw insertError;
            }
          }

          const numberOfSelectedRecipes = 20;
          const randomRecipe = Math.floor(
            Math.random() *
              Math.max(0, allResults.length - numberOfSelectedRecipes)
          );
          const recipeArray = [];

          for (
            let i = 0;
            i < numberOfSelectedRecipes && randomRecipe + i < allResults.length;
            i++
          ) {
            recipeArray.push(allResults[randomRecipe + i]);
          }

          setData(recipeArray);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };

      fetchSearchResults();
    }
  }, [searchTerm, apiKey, filteredOptions, dispatch]);

  return (
    <div>
      <h1 className="text-2xl my-4 text-center">
        Search Results for '{searchTerm}'
      </h1>
      {isLoading && (
        <div role="status" className="flex justify-center">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {error && <p>Error: {error}</p>}
      {!isLoading && data && data.length === 0 && (
        <div className="text-center text-xl">Sorry, No results found.</div>
      )}
      {data && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {data.map((recipe) => (
            <ResultsCard key={recipe.id} recipeInfoData={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
