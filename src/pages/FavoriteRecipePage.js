import { useParams } from "react-router-dom";
import { useGetRecipeCardQuery } from "../slices/fetchDataSlice";

export default function FavoriteRecipePage() {
  const { recipeId } = useParams();
  const { data, error, isLoading } = useGetRecipeCardQuery(recipeId);
  console.log(data);

  return (
    <div className="container mx-auto mt-4">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && (
        <div className="mt-4 flex justify-center ">
          <h1>{data.title}</h1>
          <img src={data.url} alt={data.title} />
        </div>
      )}
    </div>
  );
}
