import { FaHeart } from "react-icons/fa";

export default function FavoritesCard({ favorite }) {
  return (
    <div
      key={favorite.id}
      className="flex flex-col bg-white shadow-lg rounded-lg"
    >
      <div className="relative rounded-lg overflow-hidden">
        <img
          src={favorite.image}
          alt={favorite.title}
          className="w-full h-52 object-cover"
        />
        <div className="absolute top-0 right-0 m-4">
          <button>
            <FaHeart color={"#f27e8a"} size={20} />
          </button>
        </div>
        <div className="absolute bottom-0 bg-gradient-to-t from-black to-transparent w-full p-4">
          <div className="text-md font-bold text-white">{favorite.title}</div>
        </div>
      </div>
    </div>
  );
}
