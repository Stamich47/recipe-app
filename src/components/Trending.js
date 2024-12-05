import { useGetTrendingRecipeQuery } from "../slices/fetchDataSlice";
import TrendingCard from "./TrendingCard";

export default function Trending() {
  const { data, error, isLoading } = useGetTrendingRecipeQuery({
    number: 2,
    type: "christmas",
  });

  return (
    <div>
      <div className="text-2xl my-4">Trending</div>
      <div className="flex gap-4">
        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {data &&
          data?.recipes.map((recipe) => (
            <TrendingCard key={recipe.id} recipeInfoData={recipe} />
          ))}
      </div>
    </div>
  );
}
