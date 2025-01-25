import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faUtensils, faLeaf } from "@fortawesome/free-solid-svg-icons";
import { LuVegan, LuSalad, LuWheatOff, LuMilkOff } from "react-icons/lu";
import parse from "html-react-parser";

export default function RecipeInfo() {
  const location = useLocation();
  const recipe = location.state.recipeInfoData || location.state.favorite || {};

  const readyMinutes = recipe.readyInMinutes || 0;

  const averageMinutes = (readyMinutes) => {
    const lowerBound = Math.floor(readyMinutes / 5) * 5;
    const upperBound = lowerBound + 5;

    return `${lowerBound} - ${upperBound} min`;
  };

  console.log(recipe);

  return (
    <div className="recipe-info p-4">
      <h1 className="recipe-title xs:text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl font-bold mb-4 flex justify-center">
        {recipe.title}
      </h1>
      <div className="flex justify-center items-center gap-8">
        <div className="recipe-details mb-4 flex-col max-sm:text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl">
          <div>
            <p className="flex items-center mb-2">
              <FontAwesomeIcon icon={faClock} className="mr-2" />
              {averageMinutes(readyMinutes)}
            </p>
            <p className="flex items-center mb-2">
              <FontAwesomeIcon icon={faUtensils} className="mr-2" /> Servings:{" "}
              {recipe.servings}
            </p>
            <p className="flex items-center mb-2">
              <FontAwesomeIcon icon={faLeaf} className="mr-2" /> Health Score:{" "}
              {recipe.healthScore}
            </p>
          </div>
          <div className="flex-col items-center dietary-preferences mb-4 max-sm:text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl">
            <h2 className="font-semibold mb-2">Dietary Preferences:</h2>
            {recipe.vegan ? (
              <div className="flex gap-2 items-center mb-2">
                <LuVegan color={"#4CAF50"} size={24} />{" "}
                <p className="font-bold" style={{ color: "#4CAF50" }}>
                  {" "}
                  - Vegan
                </p>
              </div>
            ) : (
              <div className="flex gap-2 items-center mb-2 text-gray-500 opacity-50">
                <LuVegan color={"#A9A9A9"} size={24} /> <p> - Not Vegan</p>
              </div>
            )}
            {recipe.vegetarian ? (
              <div className="flex gap-2 items-center mb-2">
                <LuSalad color={"#4CAF50"} size={24} />{" "}
                <p className="font-bold" style={{ color: "#4CAF50" }}>
                  {" "}
                  - Vegetarian
                </p>
              </div>
            ) : (
              <div className="flex gap-2 items-center mb-2 text-gray-500 opacity-50">
                <LuSalad color={"#A9A9A9"} size={24} /> <p> - Not Vegetarian</p>
              </div>
            )}
            {recipe.glutenFree ? (
              <div className="flex gap-2 items-center mb-2">
                <LuWheatOff color={"#4CAF50"} size={24} />{" "}
                <p className="font-bold" style={{ color: "#4CAF50" }}>
                  {" "}
                  - Gluten Free
                </p>
              </div>
            ) : (
              <div className="flex gap-2 items-center mb-2 text-gray-500 opacity-50">
                <LuWheatOff color={"#A9A9A9"} size={24} />{" "}
                <p> - Not Gluten Free</p>
              </div>
            )}
            {recipe.dairyFree ? (
              <div className="flex gap-2 items-center mb-2">
                <LuMilkOff color={"#4CAF50"} size={24} />{" "}
                <p className="font-bold" style={{ color: "#4CAF50" }}>
                  {" "}
                  - Dairy Free
                </p>
              </div>
            ) : (
              <div className="flex gap-2 items-center mb-2 text-gray-500 opacity-50">
                <LuMilkOff color={"#A9A9A9"} size={24} />{" "}
                <p> - Not Dairy Free</p>
              </div>
            )}
          </div>
        </div>
        <img
          src={recipe.image}
          alt={recipe.title}
          className="recipe-image w-3/4 h-auto mb-4 rounded-lg shadow-md"
        />
      </div>

      <div className="recipe-summary mb-4">{parse(recipe.summary)}</div>

      <div className="recipe-links mb-4">
        <a
          href={recipe.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="recipe-link text-blue-500 hover:underline mr-4"
        >
          View Full Recipe
        </a>
        <a
          href={recipe.spoonacularSourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="recipe-link text-blue-500 hover:underline"
        >
          View on Spoonacular
        </a>
      </div>
      <div className="recipe-ingredients mb-4">
        <h3 className="text-2xl font-semibold mb-2">Ingredients</h3>
        <ul className="ingredients-list list-disc list-inside">
          {recipe.extendedIngredients?.map((ingredient) => (
            <li key={ingredient.id} className="mb-1">
              {ingredient.amount} {ingredient.unit} - {ingredient.originalName}
            </li>
          ))}
        </ul>
      </div>
      <div className="recipe-instructions">
        <h3 className="text-2xl font-semibold mb-2">Instructions</h3>
        <ol className="instructions-list">
          {recipe.analyzedInstructions?.map((instruction) => (
            <li key={instruction.name} className="mb-2">
              {instruction.steps.map((step) => (
                <div className="flex mb-1 gap-2" key={step.number}>
                  <span className="font-bold">{step.number}. </span>
                  {parse(step.step)}
                </div>
              ))}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
