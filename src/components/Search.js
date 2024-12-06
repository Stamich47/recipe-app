// import { useGetAutoCompleteQuery } from "../slices/fetchDataSlice";
import { useState } from "react";
import Dropdown from "./Dropdown";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  // const { data } = useGetAutoCompleteQuery(searchTerm);

  const options = ["Vegan", "Vegetarian", "Gluten Free", "Dairy Free"];

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    console.log(searchTerm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      "search submitted with term:",
      searchTerm,
      "and filters:",
      selectedOptions
    );
  };

  // const filteredData = data?.filter((recipe) =>
  //   recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="search-container flex gap-2 justify-center">
          <label className="relative block">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <svg
                className="h-5 w-5 fill-slate-300"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12.9 14.32a8 8 0 111.41-1.41l4.38 4.38-1.41 1.41-4.38-4.38zM8 14a6 6 0 100-12 6 6 0 000 12z" />
              </svg>
            </span>
            <input
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm h-10"
              placeholder="Search Recipes..."
              type="text"
              name="search"
              value={searchTerm}
              onChange={handleInputChange}
            />
          </label>
          {/* {filteredData && filteredData.length > 0 && (
          <ul className="autocomplete-list absolute bg-white border border-slate-300 rounded-md mt-1 w-full shadow-lg">
            {filteredData.map((recipe) => (
              <li
                key={recipe.id}
                className="autocomplete-item p-2 hover:bg-slate-100 cursor-pointer"
              >
                {recipe.title}
              </li>
            ))}
          </ul>
        )} */}
          <Dropdown
            options={options}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          />
          <button
            type="submit"
            className="inline-flex justify-center items-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-blue-600 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 h-10"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
