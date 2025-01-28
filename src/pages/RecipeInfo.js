import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaArrowRight, FaArrowDown } from "react-icons/fa6";
import { faClock, faUtensils, faLeaf } from "@fortawesome/free-solid-svg-icons";
import { LuVegan, LuSalad, LuWheatOff, LuMilkOff } from "react-icons/lu";
import { useState, useEffect } from "react";
import parse from "html-react-parser";

export default function RecipeInfo() {
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);
  const [showSummary, setShowSummary] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [showIngredients, setShowIngredients] = useState(true);
  const location = useLocation();
  const recipe = location.state.recipeInfoData || location.state.favorite || {};

  const readyMinutes = recipe.readyInMinutes || 0;

  const averageMinutes = (readyMinutes) => {
    const lowerBound = Math.floor(readyMinutes / 5) * 5;
    const upperBound = lowerBound + 5;

    return `${lowerBound} - ${upperBound} min`;
  };

  useEffect(() => {
    const handleResize = () => {
      setCurrentWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [currentWidth]);

  return (
    <div className="recipe-info p-4 flex-col">
      <h1 className="text-2xl recipe-title text-center text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-4">
        {recipe.title}
      </h1>
      <div className="flex max-sm:flex-col justify-center items-center gap-4 ">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="recipe-image w-full sm:w-3/4 h-auto mb-4 rounded-lg shadow-md"
        />
        <div className="grow recipe-details mb-4 flex-col text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
          <div className="max-sm:flex max-sm:text-xs gap-4 mb-4 items-center justify-center">
            <p className="flex items-center mb-4">
              <FontAwesomeIcon icon={faClock} className="mr-2 fa-lg" />
              {averageMinutes(readyMinutes)}
            </p>
            {currentWidth <= 640 && <div className="mb-4">|</div>}
            <p className="flex items-center mb-4">
              <FontAwesomeIcon icon={faUtensils} className="mr-2 fa-lg" />{" "}
              Servings: {recipe.servings}
            </p>
            {currentWidth <= 640 && <div className="mb-4">|</div>}
            <p className="flex items-center mb-4">
              <FontAwesomeIcon icon={faLeaf} className="mr-2 fa-lg" /> Health
              Score: {recipe.healthScore}
            </p>
          </div>
          <div className="flex-col items-center dietary-preferences text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl ">
            {currentWidth > 640 && (
              <h2 className="font-semibold mb-4">Dietary Preferences:</h2>
            )}
            {recipe.vegan ? (
              <div className="flex gap-2 items-center mb-4">
                <LuVegan color={"#4CAF50"} size={24} />{" "}
                <p className="font-bold" style={{ color: "#4CAF50" }}>
                  {" "}
                  Vegan
                </p>
              </div>
            ) : (
              <div className="flex gap-2 items-center mb-4 text-gray-500 opacity-50">
                <LuVegan color={"#A9A9A9"} size={24} /> <p> Not Vegan</p>
              </div>
            )}
            {recipe.vegetarian ? (
              <div className="flex gap-2 items-center mb-4">
                <LuSalad color={"#4CAF50"} size={24} />{" "}
                <p className="font-bold" style={{ color: "#4CAF50" }}>
                  {" "}
                  Vegetarian
                </p>
              </div>
            ) : (
              <div className="flex gap-2 items-center mb-4 text-gray-500 opacity-50">
                <LuSalad color={"#A9A9A9"} size={24} /> <p> Not Vegetarian</p>
              </div>
            )}
            {recipe.glutenFree ? (
              <div className="flex gap-2 items-center mb-4">
                <LuWheatOff color={"#4CAF50"} size={24} />{" "}
                <p className="font-bold" style={{ color: "#4CAF50" }}>
                  {" "}
                  Gluten Free
                </p>
              </div>
            ) : (
              <div className="flex gap-2 items-center mb-2 text-gray-500 opacity-50">
                <LuWheatOff color={"#A9A9A9"} size={24} />{" "}
                <p> Not Gluten Free</p>
              </div>
            )}
            {recipe.dairyFree ? (
              <div className="flex gap-2 items-center mb-2">
                <LuMilkOff color={"#4CAF50"} size={24} />{" "}
                <p className="font-bold" style={{ color: "#4CAF50" }}>
                  {" "}
                  Dairy Free
                </p>
              </div>
            ) : (
              <div className="flex gap-2 items-center mb-2 text-gray-500 opacity-50">
                <LuMilkOff color={"#A9A9A9"} size={24} /> <p> Not Dairy Free</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex-col align-center justify-center">
        {currentWidth > 640 && (
          <div className="recipe-summary mb-4 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
            {parse(recipe.summary)}
          </div>
        )}

        {currentWidth <= 640 && (
          <div className="mt-4">
            <button
              onClick={() => setShowSummary(!showSummary)}
              className={`dropdown-toggle font-bold py-2 rounded mb-4 flex items-center 
             px-4 transition-colors duration-300 text-sm w-full ${
               showSummary ? "bg-blue-300" : "bg-blue-200"
             }`}
            >
              {!showSummary ? (
                <>
                  <FaArrowRight className="inline-block mr-2" />
                  Show Summary
                </>
              ) : (
                <>
                  <FaArrowDown className="inline-block mr-2" /> Hide Summary
                </>
              )}
            </button>
            <div className={`dropdown-container ${showSummary ? "show" : ""}`}>
              {showSummary && (
                <div className="recipe-summary text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                  {" "}
                  {parse(recipe.summary)}
                </div>
              )}
            </div>
          </div>
        )}

        {currentWidth > 640 && (
          <div className="recipe-ingredients mb-4 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
            <h3 className="text-xl sm:text-2xl font-semibold mb-2">
              Ingredients
            </h3>
            <ul className="ingredients-list list-disc list-inside">
              {recipe.extendedIngredients?.map((ingredient) => (
                <li key={ingredient.id} className="mb-1">
                  {ingredient.amount} {ingredient.unit} -{" "}
                  {ingredient.originalName}
                </li>
              ))}
            </ul>
          </div>
        )}
        {currentWidth <= 640 && (
          <div className="mt-4">
            <button
              onClick={() => setShowIngredients(!showIngredients)}
              className={`dropdown-toggle font-bold py-2 rounded mb-4 flex items-center 
             px-4 transition-colors duration-300 text-sm w-full ${
               showIngredients ? "bg-blue-300" : "bg-blue-200"
             }`}
            >
              {!showIngredients ? (
                <>
                  <FaArrowRight className="inline-block mr-2" />
                  Show Ingredients
                </>
              ) : (
                <>
                  <FaArrowDown className="inline-block mr-2" /> Hide Ingredients
                </>
              )}
            </button>
            <div
              className={`dropdown-container ${showIngredients ? "show" : ""}`}
            >
              {showIngredients && (
                <ul className="ingredients-list list-disc list-inside ing-list">
                  {recipe.extendedIngredients?.map((ingredient) => (
                    <li key={ingredient.id} className="mb-1">
                      {ingredient.amount} {ingredient.unit} -{" "}
                      {ingredient.originalName}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {currentWidth > 640 && (
          <div className="recipe-instructions text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
            <h3 className="text-xl sm:text-2xl font-semibold mb-2">
              Instructions
            </h3>
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
        )}

        {currentWidth <= 640 && (
          <div className="mt-4">
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className={`dropdown-toggle font-bold py-2 rounded mb-4 flex items-center 
            bg-blue-200 px-4 transition-colors duration-300 text-sm w-full ${
              showInstructions ? "bg-blue-300" : "bg-blue-200"
            }`}
            >
              {!showInstructions ? (
                <>
                  <FaArrowRight className="inline-block mr-2" />
                  Show Instructions
                </>
              ) : (
                <>
                  <FaArrowDown className="inline-block mr-2" /> Hide
                  Instructions
                </>
              )}
            </button>
            <div
              className={`dropdown-container ${showInstructions ? "show" : ""}`}
            >
              {showInstructions && (
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
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
