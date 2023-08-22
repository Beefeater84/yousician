import Image from "next/image";
import { SongType } from "@/entities/song/types/songs-types";
import styles from "./song-list.module.scss";

interface SongRowProps {
  song: SongType;
}
export default function SongRow({ song }: SongRowProps) {
  const { images, title, artist, level } = song;

  return (
    <div className={styles.row}>
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
      <div>{level}</div>
      <div>favorite</div>
    </div>
  );
}
