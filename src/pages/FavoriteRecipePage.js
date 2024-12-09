import { useParams } from "react-router-dom";
import { useGetRecipeCardQuery } from "../slices/fetchDataSlice";

export default function FavoriteRecipePage() {
  const { recipeId } = useParams();
  const { data, error, isLoading } = useGetRecipeCardQuery(recipeId);

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div className="mt-4">
        Error loading recipe card. This could be due to the recipe having too
        many ingredients (max 14).
      </div>
    );

  return (
    <div className="mt-4">
      <h1>{data.title}</h1>
      <img src={data.url} alt={data.title} />
    </div>
  );
}
