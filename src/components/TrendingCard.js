export default function TrendingCard({ recipeInfoData }) {
  return (
    <div
      key={recipeInfoData.id}
      className="trending-card relative w-full max-w-sm m-3 overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105"
    >
      <img
        src={recipeInfoData.image}
        alt={recipeInfoData.title}
        className="w-full h-48 object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
        <h1 className="text-white text-lg font-semibold">
          {recipeInfoData.title}
        </h1>
      </div>
    </div>
  );
}
