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

          setData(allResults.slice(0, 20));
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
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && (
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {data.map((recipe) => (
            <ResultsCard key={recipe.id} recipeInfoData={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
