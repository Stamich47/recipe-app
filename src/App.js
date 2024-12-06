import "./App.css";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Search from "./components/Search";
import Footer from "./components/Footer";
import CategoryResults from "./pages/CategoryResults";
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
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
