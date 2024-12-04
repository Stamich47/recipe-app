import { FaBars, FaHeart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import BiteSizeLogo from "./assets/BiteSizeLogo.png";

export default function NavBar() {
  return (
    <div className="navbar p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <button>
            <CgProfile size={30} color="#006D77" />
          </button>
        </div>
        <div>
          <img src={BiteSizeLogo} alt="BiteSize" className="w-48" />
        </div>
        <div>
          <ul className="flex space-x-5">
            <li className="flex items-center">
              <button className="hover:text-gray-400">
                <FaHeart size={24} color={"#f27e8a"} />
              </button>
            </li>
            <li className="flex items-center">
              <button className="hover:text-gray-400">
                <FaBars size={24} color="#006D77" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
