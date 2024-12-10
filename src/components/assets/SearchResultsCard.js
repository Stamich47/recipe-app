// import { FaHeart } from "react-icons/fa";
import placeholder from "./placeholder.png";
import { useState } from "react";

export default function SearchResultsCard({ recipe }) {
  const [imgSource, setImgSource] = useState(recipe.image || placeholder);

  const handleError = () => {
    setImgSource(placeholder);
  };

  return (
    <div className="flex flex-col bg-white shadow-lg rounded-md">
      <div className="relative rounded-md overflow-hidden">
        <img
          src={imgSource}
          alt={recipe.title}
          className="w-full h-32 object-cover"
          onError={handleError}
        />
        {/* <div className="absolute top-0 right-0 m-2">
          <button onClick={handleLike}>
            {isLiked ? (
              <FaHeart color={"#f27e8a"} size={16} />
            ) : (
              <FaRegHeart className="text-red-700" size={16} />
            )}
          </button>
        </div> */}
        <div className="absolute bottom-0 bg-gradient-to-t from-black to-transparent w-full p-2">
          <div className="text-xs font-bold text-white bg-gray-500 bg-opacity-40 p-1 rounded-lg ">
            {recipe.title}
          </div>
          <div className="text-xs text-gray-300">
            {recipe.readyInMinutes} minutes
          </div>
        </div>
      </div>
    </div>
  );
}
