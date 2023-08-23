import FavoriteBorderIcon from "@/shared/components/favorites/icons/favoriteBorderIcon";
import FavoriteActiveIcon from "@/shared/components/favorites/icons/favoriteActiveIcon";
import FavoriteLoading from "@/shared/components/favorites/components/favorite-loading";
import styles from "./favorite.module.scss";

interface FavoriteProps {
  isFavorite: boolean;
  isloading?: boolean;
}

export default function FavoriteIcon({
  isFavorite,
  isloading = false,
}: FavoriteProps) {
  if (isloading) {
    return (
      <div className={styles.favorite}>
        <FavoriteLoading />
      </div>
    );
  }

  const classes = [styles.favorite];
  if (isFavorite) {
    classes.push(styles.active);
  }

  return (
    <div className={classes.filter(Boolean).join(" ")}>
      {isFavorite ? <FavoriteActiveIcon /> : <FavoriteBorderIcon />}
    </div>
  );
}
