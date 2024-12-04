import spices from "./assets/spices.png";

export default function Pantry() {
  return (
    <div>
      <div className="text-2xl mt-10 my-3">My Pantry</div>
      <div className="flex justify-between">
        <div className="flex gap-6">
          <div className="border border-gray-300 p-2 rounded-lg category-card w-32">
            <div className="flex items-center justify-center">
              <img src={spices} alt="spices" className="rounded" />
            </div>
            <div className="text-center mt-2">
              <span className="text-lg">Herbs & Spices</span>
            </div>
          </div>
        </div>
        <div className="flex gap-6">
          <div className="border border-gray-300 p-2 rounded-lg category-card w-32">
            <div className="flex items-center justify-center">
              <img src={spices} alt="spices" className="rounded" />
            </div>
            <div className="text-center mt-2">
              <span className="text-lg">Fruits & Vegetables</span>
            </div>
          </div>
        </div>
        <div className="flex gap-6">
          <div className="border border-gray-300 p-2 rounded-lg category-card w-32">
            <div className="flex items-center justify-center">
              <img src={spices} alt="spices" className="rounded" />
            </div>
            <div className="text-center mt-2">
              <span className="text-lg">Protein</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
