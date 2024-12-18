import "./App.css";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Search from "./components/Search";
import Footer from "./components/Footer";
import CategoryResults from "./pages/CategoryResults";
import FavoritesPage from "./pages/FavoritesPage";
import FavoriteRecipePage from "./pages/FavoriteRecipePage";
// import SearchResults from "./pages/SearchResults";
import SearchResultsSupabase from "./pages/SearchResultsSupabase";
import FridgeResults from "./components/FridgeResults";
import PantryResults from "./components/PantryResults";

import { Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [activeCategory, setActiveCategory] = useState("");
  return (
    <div>
      <NavBar />
      <Search />
      <Routes>
        <Route
          path="/"
          element={<Home setActiveCategory={setActiveCategory} />}
        />
        <Route
          path="/category-results"
          element={<CategoryResults activeCategory={activeCategory} />}
        />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/recipe/:recipeId" element={<FavoriteRecipePage />} />
        <Route path="/search-results" element={<SearchResultsSupabase />} />
        <Route path="/fridge" element={<FridgeResults />} />
        <Route path="/pantry" element={<PantryResults />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
