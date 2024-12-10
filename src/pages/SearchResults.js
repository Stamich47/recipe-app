import ResultsCard from "../components/ResultsCard";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function SearchResults() {
  const [searchTerm, setSearchTerm] = useState("");
  const apiKey = process.env.REACT_APP_SPOONACULAR_API;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

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
        try {
          const response = await fetch(
            `https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&apiKey=${apiKey}`
          );
          const result = await response.json();
          setData(result.results || []);
          console.log(result);
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchSearchResults();
    }
  }, [searchTerm, apiKey]);

  return (
    <div>
      <h1 className="text-2xl my-4 text-center">
        Search Results for {searchTerm}
      </h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
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
