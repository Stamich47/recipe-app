import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { saveFavorite, removeFavorite } from "../slices/saveFavoriteSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ResultsCard({ recipeInfoData }) {
  const [isLiked, setIsLiked] = useState(false);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.saveFavorite.favorites);

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (isLiked) {
      dispatch(removeFavorite(recipeInfoData));
    }
    if (!isLiked) {
      dispatch(saveFavorite(recipeInfoData));
    }
  };

  useEffect(() => {
    setIsLiked(favorites.some((fav) => fav.id === recipeInfoData.id));
  }, [favorites, recipeInfoData.id]);

  return (
    <div className="flex flex-col bg-white shadow-lg rounded-md">
      <div className="relative rounded-md overflow-hidden">
        <img
          src={recipeInfoData.image}
          alt={recipeInfoData.title}
          className="w-full h-32 object-cover"
        />
        <div className="absolute top-0 right-0 m-2">
          <button onClick={handleLike}>
            {isLiked ? (
              <FaHeart color={"#f27e8a"} size={16} />
            ) : (
              <FaRegHeart className="text-red-700" size={16} />
            )}
          </button>
        </div>
        <div className="absolute bottom-0 bg-gradient-to-t from-black to-transparent w-full p-2">
          <div className="text-xs font-bold text-white bg-gray-500 bg-opacity-40 p-1 rounded-lg ">
            {recipeInfoData.title}
          </div>
          {/* <div className="text-xs text-gray-300">
            {recipeInfoData.readyInMinutes} minutes
          </div> */}
        </div>
      </div>
    </div>
  );
}
