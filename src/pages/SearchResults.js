import ResultsCard from "../components/ResultsCard";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { saveSearchResults } from "../slices/searchResultsSlice";

export default function SearchResults() {
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
        const batchSize = 200;

        try {
          const storedResults = localStorage.getItem(searchTerm);
          if (storedResults) {
            console.log(`Using cached results for query: ${searchTerm}`);
            const cachedResults = JSON.parse(storedResults);
            allResults = cachedResults.filter((recipe) => {
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

            localStorage.setItem(searchTerm, JSON.stringify(allResults));
          }

          setData(allResults.slice(0, 20));
        } catch (error) {
          setError(error);
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
      {error && <p>Error: {error.message}</p>}
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
