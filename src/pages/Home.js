import Discover from "../components/Discover";
import Categories from "../components/Categories";
import Trending from "../components/Trending";
import EasyMeals from "../components/EasyMeals";

export default function Main({ setActiveCategory }) {
  return (
    <div>
      <Categories setActiveCategory={setActiveCategory} />
      <Discover />
      <Trending />
      <EasyMeals />
    </div>
  );
}
