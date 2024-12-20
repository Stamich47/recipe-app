import { useState, useEffect } from "react";
import { useGetAutoCompleteQuery } from "../slices/fetchDataSlice";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdCheckBoxOutlineBlank, MdOutlineCheckBox } from "react-icons/md";

export default function FridgeResults() {
  const [query, setQuery] = useState("");
  const [checkedStates, setCheckedStates] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  useEffect(() => {
    const fridge = JSON.parse(localStorage.getItem("fridge"));
    if (fridge) {
      setSelectedIngredients(fridge);
    }
  }, []);

  const {
    data: autoCompleteData = [],
    isLoading,
    error,
  } = useGetAutoCompleteQuery(query);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleCheck = (index) => {
    const updatedCheckedStates = [...checkedStates];
    updatedCheckedStates[index] = !updatedCheckedStates[index];
    setCheckedStates(updatedCheckedStates);
    console.log("Checked States:", checkedStates);
  };

  const handleAddIngredient = (ingredient) => {
    setSelectedIngredients([...selectedIngredients, ingredient]);
    localStorage.setItem(
      "fridge",
      JSON.stringify([...selectedIngredients, ingredient])
    );
    setQuery("");
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = selectedIngredients.filter(
      (_, ingredientIndex) => ingredientIndex !== index
    );
    setSelectedIngredients(updatedIngredients);
    localStorage.setItem("fridge", JSON.stringify(updatedIngredients));
  };

  useEffect(() => {
    console.log("AutoComplete Data:", autoCompleteData);
  }, [autoCompleteData]);

  return (
    <div className="mt-6">
      <h1 className="text-2xl my-2 text-center">Whats in My Fridge?</h1>
      <form onSubmit={(e) => e.preventDefault()} className="mb-4">
        <label className="block">
          <input
            value={query}
            onChange={handleChange}
            placeholder="Add Ingredient"
            className="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
      </form>
      {isLoading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}
      {autoCompleteData.length > 0 && (
        <ul className="mb-4 bg-white shadow-md rounded-lg">
          {autoCompleteData.map((suggestion) => (
            <li
              key={suggestion.id}
              onClick={() => handleAddIngredient(suggestion)}
              className="cursor-pointer p-2 border-b border-gray-300 hover:bg-gray-100"
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
      <div className="flex justify-between mb-2 items-center">
        <h2 className="text-xls font-bold">Selected Ingredients</h2>
        {!checkedStates.includes(true) ? (
          <button
            disabled={!checkedStates.includes(true)}
            type="submit"
            onClick={() => console.log("Find Recipes")}
            className="inline-flex justify-center items-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-400 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 h-10"
          >
            Find Recipes
          </button>
        ) : (
          <button
            type="submit"
            onClick={() => console.log("Find Recipes")}
            className="inline-flex justify-center items-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 h-10"
          >
            Find Recipes
          </button>
        )}
      </div>
      <div className="max-h-64 overflow-y-auto bg-white shadow-md rounded-lg">
        <ul>
          {selectedIngredients.map((ingredient, index) => (
            <li
              key={ingredient.id}
              className="p-2 border-b border-gray-300 flex justify-between items-center"
            >
              <button className="flex gap-4" onClick={() => handleCheck(index)}>
                <div>
                  {checkedStates[index] ? (
                    <MdOutlineCheckBox size={24} color="#10B981" />
                  ) : (
                    <MdCheckBoxOutlineBlank size={24} color="#D1D5DB" />
                  )}
                </div>
                {ingredient.name}
              </button>
              <button
                onClick={() => handleRemoveIngredient(index)}
                className="text-gray-500 hover:text-red-500"
              >
                <RiDeleteBin6Fill />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
