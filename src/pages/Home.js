import Discover from "../components/Discover";
import Categories from "../components/Categories";
import Trending from "../components/Trending";
import Pantry from "../components/Pantry";
import EasyMeals from "../components/EasyMeals";

export default function Main({ setActiveCategory }) {
  return (
    <div>
      <Categories setActiveCategory={setActiveCategory} />
      {/* <Discover /> */}
      {/* <Trending /> */}
      <EasyMeals />
      <Pantry />
    </div>
  );
}
