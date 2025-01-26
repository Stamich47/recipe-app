import { FaHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { removeFavorite } from "../../slices/saveFavoriteSlice";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { LuVegan } from "react-icons/lu";

export default function FavoritesCard({ favorite }) {
  const [isVegan, setIsVegan] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    setIsVegan(favorite.vegan);
  }, [favorite.vegan]);

  const handleRemoveLike = (e) => {
    e.stopPropagation();
    dispatch(removeFavorite(favorite));
  };

  return (
    <div
      key={favorite.id}
      className="flex flex-col bg-white shadow-lg rounded-md results-card"
    >
      <div className="relative rounded-lg overflow-hidden">
        <Link
          key={favorite.id}
          to={`/recipe-info`}
          state={{ favorite, from: "Favorites" }}
        >
          <img
            src={favorite.image}
            alt={favorite.title}
            className="w-full h-52 object-cover"
          />
        </Link>
        <div className="absolute top-0 right-0 m-4">
          <button className="heart-button" onClick={handleRemoveLike}>
            <FaHeart color={"#f27e8a"} className="heart-icon" />
          </button>
        </div>
        <div className="absolute top-0 left-0 m-2">
          {isVegan && <LuVegan color={"#4CAF50"} className="vegan-icon" />}
        </div>
        <div className="absolute bottom-0 bg-gradient-to-t from-gray-800 to-transparent w-full p-2">
          <div className="text-s font-bold text-white bg-opacity-40 p-1 pt-6 rounded-lg ">
            {favorite.title}
          </div>
        </div>
      </div>
    </div>
  );
}
