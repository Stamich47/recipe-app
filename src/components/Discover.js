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
          <div className="hero-card relative w-full max-w-sm overflow-hidden rounded-lg discover-img border-2 transition-transform transform hover:scale-105">
            <img
              src={data.recipes[0].image}
              alt={data.recipes[0].title}
              className="w-full h-auto"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <h1 className="text-white text-lg font-semibold">
                {data.recipes[0].title}
              </h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
