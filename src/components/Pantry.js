import spices from "./assets/spices.png";
import meat from "./assets/meat.png";
import fruits from "./assets/fruits.png";

export default function Pantry() {
  return (
    <div className="pantry-container">
      <div className="text-2xl mt-10 my-3">My Pantry</div>
      <div className="flex justify-center gap-5">
        <div className="border  p-2 rounded-lg category-card">
          <div className="flex items-center justify-center">
            <img src={spices} alt="spices" className="rounded w-16" />
          </div>
          <div className="text-center mt-2">
            <span className="text-lg">Herbs & Spices</span>
          </div>
        </div>

        <div className="border p-2 rounded-lg category-card ">
          <div className="flex items-center justify-center">
            <img src={fruits} alt="spices" className="rounded w-16" />
          </div>
          <div className="text-center mt-2">
            <span className="text-lg">Fruits & Vegetables</span>
          </div>
        </div>
        <div className="border p-2 rounded-lg category-card">
          <div className="flex items-center justify-center">
            <img src={meat} alt="spices" className="rounded w-16" />
          </div>
          <div className="text-center mt-2">
            <span className="text-lg">Protein</span>
          </div>
        </div>
      </div>
    </div>
  );
}
