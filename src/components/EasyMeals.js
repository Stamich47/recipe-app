import { useState, useEffect } from "react";
import { supabase } from "../services/supabaseClient";

export default function EasyMeals() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("search_results")
          .select("results")
          .eq("search_term", "spaghetti")
          .single();

        if (error) throw error;
        setData(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    data.map((recipe) => {
      const ingredientCount = recipe.extendedIngredients.length;

      return (
        ingredientCount <= 10 && setFilteredData((prev) => [...prev, recipe])
      );
    });
  }, [data]);

  useEffect(() => {
    console.log(filteredData);
  }, [filteredData]);

  return (
    <div>
      <h1 className="text-2xl mt-6">10 Ingredients or Less!</h1>
    </div>
  );
}
