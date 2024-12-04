import Discover from "../components/Discover";
import Categories from "../components/Categories";
import Trending from "../components/Trending";
import Pantry from "../components/Pantry";
import Footer from "../components/Footer";

export default function Main() {
  return (
    <div>
      <h1 className="text-4xl text-center mt-10">Welcome to the Recipe App</h1>
      <Discover />
      <Categories />
      <Trending />
      <Pantry />
      <Footer />
    </div>
  );
}
