import {
  useGetRecipesQuery,
  useGetRecipeInfoQuery,
} from "../slices/fetchDataSlice";
import RecipeHeroCard from "../components/RecipeHeroCard";

export default function Main() {
  const { data, error, isLoading } = useGetRecipesQuery({
    number: 4,
    type: "chicken",
  });

  const idList = data?.results.map((recipe) => recipe.id);
  const { data: recipeInfoData } = useGetRecipeInfoQuery(idList);
  console.log(recipeInfoData);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="flex flex-wrap justify-center">
        {recipeInfoData?.map((recipe) => (
          <RecipeHeroCard key={recipe.id} recipeInfoData={recipe} />
        ))}
      </div>
    </div>
  );
}
