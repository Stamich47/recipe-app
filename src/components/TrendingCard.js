import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { saveFavorite, removeFavorite } from "../slices/saveFavoriteSlice";
import { useDispatch, useSelector } from "react-redux";
import placeholder from "./assets/placeholder.png";
import { LuVegan } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function TrendingCard({ recipeInfoData }) {
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
    <div className="trending-card relative w-full max-w-sm overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <div className="relative rounded-md overflow-hidden">
        <Link to={`/recipe-info`} state={{ recipeInfoData }}>
          <img
            src={imgSource}
            alt={recipeInfoData.title}
            className="w-full h-48 object-cover"
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
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h1 className="text-white text-md font-semibold">
            {recipeInfoData.title}
          </h1>
        </div>
      </div>
    </div>
  );
}
