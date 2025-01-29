import { FaBars, FaHeart, FaHome } from "react-icons/fa";
// import { CgProfile } from "react-icons/cg";
import BiteSizeNew from "./assets/BiteSizedNew.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri";

export default function NavBar() {
  const favorites = useSelector((state) => state.saveFavorite.favorites);
  const location = useLocation();
  const navigate = useNavigate();

  const onRecipeInfoPage = location.pathname.includes("/recipe-info");

  const getPreviousPage = () => {
    const previousPage = location.state.from || "Home";
    return previousPage;
  };

  return (
    <div className="navbar mb-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center home nav-logo gap-2">
          {onRecipeInfoPage && (
            <button
              className="back-button flex items-center p-2 border rounded"
              onClick={() => navigate(-1)}
              aria-label={`Back to ${getPreviousPage()}`}
              label={`Back to ${getPreviousPage()}`}
            >
              <RiArrowGoBackFill size={24} color="#006D77" />
            </button>
          )}
          <Link to="/">
            <button className="back-button">
              <FaHome size={32} color="#006D77" />
            </button>
          </Link>
        </div>
        <div className="nav-logo">
          <img src={BiteSizeNew} alt="BiteSize" className="w-52" />
        </div>
        <div>
          <ul className="flex space-x-5 nav-logo">
            <li className="flex items-center">
              <button className="relative favorites-button">
                <Link to="/favorites">
                  <FaHeart size={28} color={"#f27e8a"}></FaHeart>
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs">
                    {favorites.length ? favorites.length : ""}
                  </span>
                </Link>
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
