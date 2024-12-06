import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useState } from "react";

export default function ResultsCard({ recipeInfoData }) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="flex flex-col bg-white shadow-lg rounded-lg">
      <div className="relative rounded-lg overflow-hidden">
        <img
          src={recipeInfoData.image}
          alt={recipeInfoData.title}
          className="w-full h-52 object-cover"
        />
        <div className="absolute top-0 right-0 m-4">
          <button onClick={handleLike}>
            {isLiked ? (
              <FaHeart color={"#f27e8a"} size={20} />
            ) : (
              <FaRegHeart className="text-red-700" size={20} />
            )}
          </button>
        </div>
        <div className="absolute bottom-0 bg-gradient-to-t from-black to-transparent w-full p-4">
          <div className="text-md font-bold text-white">
            {recipeInfoData.title}
          </div>
          {/* <div className="text-sm text-gray-300">
            {recipeInfoData.readyInMinutes} minutes
          </div> */}
        </div>
      </div>
    </div>
  );
}
