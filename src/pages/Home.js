import Discover from "../components/Discover";
import Categories from "../components/Categories";
import Trending from "../components/Trending";
import Pantry from "../components/Pantry";
import QuickMeals from "../components/QuickMeals";

export default function Main({ setActiveCategory }) {
  return (
    <div>
      <Categories setActiveCategory={setActiveCategory} />
      <Discover />
      <Trending />
      <QuickMeals />
      <Pantry />
    </div>
  );
}
