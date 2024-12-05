import NavBar from "../components/NavBar";
import Search from "../components/Search";
import Discover from "../components/Discover";
import Categories from "../components/Categories";
import Trending from "../components/Trending";
import Pantry from "../components/Pantry";
import Footer from "../components/Footer";

export default function Main() {
  return (
    <div>
      <NavBar />
      <Search />
      <Discover />
      <Categories />
      <Trending />
      <Pantry />
      <Footer />
    </div>
  );
}
