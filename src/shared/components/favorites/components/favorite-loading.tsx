import styles from "./favorite.module.scss";

export default function FavoriteLoading() {
  return (
    <div className={styles["lds-ellipsis"]}>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}
