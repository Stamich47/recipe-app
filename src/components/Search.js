import { useState, useEffect } from "react";
// import Dropdown from "./Dropdown";
import { Dropdown } from "flowbite-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveFilterOptions } from "../slices/searchResultsSlice";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const options = ["Vegan", "Vegetarian", "Gluten Free", "Dairy Free"];

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleOptionChange = (option) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((item) => item !== option)
        : [...prevSelected, option]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveFilterOptions(selectedOptions));
    navigate(`/search-results?query=${searchTerm.toLowerCase()}`);
    setSearchTerm("");
  };

  return (
    <div className="mb-2">
      <form onSubmit={handleSubmit}>
        <div className="search-container flex gap-2 justify-center">
          <label className="relative block flex-grow">
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
              onChange={handleSearchTermChange}
            />
          </label>

          <Dropdown label="Filter">
            <div>
              {options.map((option) => (
                <Dropdown.Item
                  key={option}
                  onClick={() => handleOptionChange(option)}
                >
                  <label
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleOptionChange(option);
                    }}
                    className="flex items-center w-full cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedOptions.includes(option)}
                      onChange={() => handleOptionChange(option)}
                      className="mr-2"
                    />
                    {option}
                  </label>
                </Dropdown.Item>
              ))}
            </div>
          </Dropdown>

          <button
            type="submit"
            className="inline-flex justify-center items-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-blue-500 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 h-10"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
