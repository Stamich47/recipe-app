export default function RecipeHeroCard({ recipeInfoData }) {
  return (
    <div
      key={recipeInfoData.id}
      className="relative w-full max-w-xs m-3 overflow-hidden rounded-lg shadow-lg"
    >
      <img
        src={recipeInfoData.image}
        alt={recipeInfoData.title}
        className="w-full h-auto"
      />
      <h1 className="absolute bottom-2 left-2 text-white bg-black bg-opacity-70 px-3 py-1 rounded">
        {recipeInfoData.title}
      </h1>
    </div>
  );
}
