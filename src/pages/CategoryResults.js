// import { useGetRecipesQuery } from "../slices/fetchDataSlice";
import ResultsCard from "../components/ResultsCard";

const data = [
  {
    id: 715415,
    title: "Red Lentil Soup with Chicken and Turnips",
    image: "https://img.spoonacular.com/recipes/715415-312x231.jpg",
    imageType: "jpg",
  },
  {
    id: 716406,
    title: "Asparagus and Pea Soup: Real Convenience Food",
    image: "https://img.spoonacular.com/recipes/716406-312x231.jpg",
    imageType: "jpg",
  },
  {
    id: 644387,
    title: "Garlicky Kale",
    image: "https://img.spoonacular.com/recipes/644387-312x231.jpg",
    imageType: "jpg",
  },
  {
    id: 715446,
    title: "Slow Cooker Beef Stew",
    image: "https://img.spoonacular.com/recipes/715446-312x231.jpg",
    imageType: "jpg",
  },
  {
    id: 782601,
    title: "Red Kidney Bean Jambalaya",
    image: "https://img.spoonacular.com/recipes/782601-312x231.jpg",
    imageType: "jpg",
  },
  {
    id: 716426,
    title: "Cauliflower, Brown Rice, and Vegetable Fried Rice",
    image: "https://img.spoonacular.com/recipes/716426-312x231.jpg",
    imageType: "jpg",
  },
  {
    id: 716004,
    title:
      "Quinoa and Chickpea Salad with Sun-Dried Tomatoes and Dried Cherries",
    image: "https://img.spoonacular.com/recipes/716004-312x231.jpg",
    imageType: "jpg",
  },
  {
    id: 716627,
    title: "Easy Homemade Rice and Beans",
    image: "https://img.spoonacular.com/recipes/716627-312x231.jpg",
    imageType: "jpg",
  },
  {
    id: 664147,
    title: "Tuscan White Bean Soup with Olive Oil and Rosemary",
    image: "https://img.spoonacular.com/recipes/664147-312x231.jpg",
    imageType: "jpg",
  },
  {
    id: 640941,
    title: "Crunchy Brussels Sprouts Side Dish",
    image: "https://img.spoonacular.com/recipes/640941-312x231.jpg",
    imageType: "jpg",
  },
];

export default function CategoryResults({ activeCategory }) {
  // const { data, error, isLoading } = useGetRecipesQuery({
  //   type: activeCategory,
  // });

  console.log(data.results);

  return (
    <div>
      <div className="text-2xl my-4 text-center">{activeCategory}</div>
      {data && (
        <div className="flex flex-wrap justify-center gap-2 mt-4 ">
          {data.map((recipe) => (
            <div key={recipe.id}>
              <ResultsCard recipeInfoData={recipe} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
