import refrigerator from "./assets/refrigerator.png";
import pantry from "./assets/pantry.png";

export default function Pantry() {
  return (
    <div className="pantry-container flex justify-between mt-10">
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="text-2xl">My Fridge</div>
        <img src={refrigerator} alt="refrigerator" className="w-32" />
      </div>
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="text-2xl">My Pantry</div>
        <img src={pantry} alt="pantry" className="w-32" />
      </div>
    </div>
  );
}
