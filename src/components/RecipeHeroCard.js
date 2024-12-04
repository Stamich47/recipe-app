export default function RecipeHeroCard({ recipeInfoData }) {
  return (
    <div
      key={recipeInfoData.id}
      className="relative w-full max-w-sm m-3 overflow-hidden rounded-lg shadow-lg bg-white"
    >
      <img
        src={recipeInfoData.image}
        alt={recipeInfoData.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h1 className="text-lg font-semibold text-gray-800">
          {recipeInfoData.title}
        </h1>
        <p className="mt-2 text-gray-600">{recipeInfoData.description}</p>
      </div>
    </div>
  );
}
