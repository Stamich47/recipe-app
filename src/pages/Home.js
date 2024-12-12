// import Discover from "../components/Discover";
import Categories from "../components/Categories";
// import Trending from "../components/Trending";
import Pantry from "../components/Pantry";
import { useSelector } from "react-redux";

export default function Main({ setActiveCategory }) {
  const searchResults = useSelector(
    (state) => state.searchResults.searchResults
  );
  console.log(searchResults);

  return (
    <div>
      <Categories setActiveCategory={setActiveCategory} />
      {/* <Discover /> */}
      {/* <Trending /> */}
      <Pantry />
    </div>
  );
}
