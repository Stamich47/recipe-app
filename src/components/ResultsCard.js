import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { saveFavorite, removeFavorite } from "../slices/saveFavoriteSlice";
import { useDispatch, useSelector } from "react-redux";
import placeholder from "./assets/placeholder.png";
import { LuVegan } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function ResultsCard({ recipeInfoData }) {
  const [isLiked, setIsLiked] = useState(false);
  const [imgSource, setImgSource] = useState(
    recipeInfoData.image || placeholder
  );
  const [isVegan, setIsVegan] = useState(false);

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.saveFavorite.favorites);

  useEffect(() => {
    setIsVegan(recipeInfoData.vegan);
  }, [recipeInfoData.vegan]);

  const handleLike = (e) => {
    e.stopPropagation();
    if (isLiked) {
      dispatch(removeFavorite(recipeInfoData));
    } else {
      dispatch(saveFavorite(recipeInfoData));
    }
    setIsLiked(!isLiked);
  };

  const handleError = () => {
    setImgSource(placeholder);
  };

  useEffect(() => {
    setIsLiked(favorites.some((fav) => fav.id === recipeInfoData.id));
  }, [favorites, recipeInfoData.id]);

  return (
    <div className="flex flex-col bg-white shadow-lg rounded-md results-card">
      <div className="relative rounded-md overflow-hidden">
        <Link
          key={recipeInfoData.id}
          to={`/recipe-info`}
          state={{ recipeInfoData, from: "Results" }}
        >
          <img
            src={imgSource}
            alt={recipeInfoData.title}
            className="w-full h-40 object-cover"
            onError={handleError}
          />
        </Link>
        <div className="absolute top-0 right-0 m-2" onClick={handleLike}>
          <button className="heart-button">
            {isLiked ? (
              <FaHeart color={"#f27e8a"} className="heart-icon" />
            ) : (
              <FaRegHeart className="text-red-700 heart-icon" />
            )}
          </button>
        </div>
        <div className="absolute top-0 left-0 m-2">
          {isVegan && <LuVegan color={"#4CAF50"} className="vegan-icon" />}
        </div>
        <div className="absolute bottom-0 bg-gradient-to-t from-gray-800 to-transparent w-full p-2">
          <div className="text-xs font-bold text-white bg-gray-500 bg-opacity-40 p-1 rounded-lg ">
            {recipeInfoData.title}
          </div>
        </div>
      </div>
    </div>
  );
}
