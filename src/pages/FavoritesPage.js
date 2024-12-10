import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import FavoritesCard from "../components/assets/FavoritesCard";

export default function FavoritesPage() {
  const favorites = useSelector((state) => state.saveFavorite.favorites);

  return (
    <div className="container mx-auto mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.map((favorite) => (
          <Link key={favorite.id} to={`/recipe/${favorite.id}`}>
            <FavoritesCard key={favorite.id} favorite={favorite} />
          </Link>
        ))}
      </div>
    </div>
  );
}
