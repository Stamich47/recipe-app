import { useState, useEffect } from "react";
import { useGetAutoCompleteQuery } from "../slices/fetchDataSlice";

export default function FridgeResults() {
  const [query, setQuery] = useState("");
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

  const handleAddIngredient = (ingredient) => {
    setSelectedIngredients([...selectedIngredients, ingredient]);
    localStorage.setItem(
      "fridge",
      JSON.stringify([...selectedIngredients, ingredient])
    );
    setQuery("");
  };

  useEffect(() => {
    console.log("AutoComplete Data:", autoCompleteData);
  }, [autoCompleteData]);

  return (
    <div className="p-4">
      <form onSubmit={(e) => e.preventDefault()} className="mb-4">
        <label className="block mb-2">
          <input
            value={query}
            onChange={handleChange}
            placeholder="Add Ingredient"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </label>
      </form>
      {isLoading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}
      {autoCompleteData.length > 0 && (
        <ul className="mb-4">
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
      <h2 className="text-xl font-bold mb-2">Selected Ingredients</h2>
      <ul>
        {selectedIngredients.map((ingredient, index) => (
          <li key={ingredient.id} className="p-2 border-b border-gray-300">
            {ingredient.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
