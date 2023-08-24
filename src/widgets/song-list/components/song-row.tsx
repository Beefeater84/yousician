import Image from "next/image";
import { SongType } from "@/entities/song/types/songs-types";
import Level from "@/featured/level/components/level";
import SongToFavorites from "@/featured/song-to-favorites/components/SongToFavorites";
import styles from "./song-list.module.scss";

interface SongRowProps {
  song: SongType;
  isFavorite: boolean;
  favoriteId: string;
}
export default function SongRow({
  song,
  isFavorite,
  favoriteId,
}: SongRowProps) {
  const { images, title, artist, level, id } = song;

  return (
    <div
      className={`
        px-[1rem]
        table:px-0
        ${styles.row}
    `}
    >
      <div>
        <Image
          src={images}
          alt={`Cover for "${title}"`}
          width="63"
          height="63"
        />
      </div>
      <div className={styles.titleWrap}>
        <span className={styles.title}>{title}</span>
        <span className={styles.artist}>{artist}</span>
      </div>
      <div>
        <Level difficulty={level} />
      </div>
      <div>
        <SongToFavorites
          songId={id}
          isFavorite={isFavorite}
          favoriteId={favoriteId}
        />
      </div>
    </div>
  );
}
