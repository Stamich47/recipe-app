import { useGetDiscoverRecipeQuery } from "../slices/fetchDataSlice";

export default function Discover() {
  const { data, error, isLoading } = useGetDiscoverRecipeQuery();

  return (
    <div>
      <div className="text-2xl mt-10 my-3">Discover</div>
      <div>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {data && (
          <div className="relative w-full max-w-sm overflow-hidden rounded-lg discover-img">
            <img
              src={data.recipes[0].image}
              alt={data.recipes[0].title}
              className="w-full h-auto"
            />
            <h1 className="absolute bottom-2 left-2 text-white bg-black bg-opacity-70 px-3 py-1 rounded">
              {data.recipes[0].title}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}
