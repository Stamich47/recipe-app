import { useGetRecipesQuery } from "../slices/fetchDataSlice";
import TrendingCard from "./TrendingCard";

export default function Trending() {
  const { data, error, isLoading } = useGetRecipesQuery({
    number: 2,
    type: "christmas",
  });

  return (
    <div>
      <div className="text-2xl mt-10 my-3">Trending</div>
      <div className="flex">
        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {data &&
          data?.results.map((recipe) => (
            <TrendingCard key={recipe.id} recipeInfoData={recipe} />
          ))}
      </div>
    </div>
  );
}
