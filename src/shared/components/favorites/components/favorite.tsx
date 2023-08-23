import FavoriteBorderIcon from "@/featured/favorites/icons/favoriteBorderIcon";
import FavoriteActiveIcon from "@/featured/favorites/icons/favoriteActiveIcon";
import styles from "./favorite.module.scss";

interface FavoriteProps {
  isFavorite: boolean;
}

export default function Favorite({ isFavorite }: FavoriteProps) {
  return (
    <div className={styles.favorite}>
      {isFavorite ? <FavoriteActiveIcon /> : <FavoriteBorderIcon />}
    </div>
  );
}
