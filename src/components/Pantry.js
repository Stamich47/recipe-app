import refrigerator from "./assets/refrigerator.png";
import pantry from "./assets/pantry.png";
import { Link } from "react-router-dom";

export default function Pantry() {
  return (
    <div className="pantry-container flex justify-between mt-10">
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="text-2xl">My Fridge</div>
        <Link to="/fridge">
          <img src={refrigerator} alt="refrigerator" className="w-32" />
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="text-2xl">My Pantry</div>
        <Link to="/pantry">
          <img src={pantry} alt="pantry" className="w-32" />
        </Link>
      </div>
    </div>
  );
}
