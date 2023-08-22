export type SongLevelType =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15;

export type SongType = {
  id: string;
  title: string;
  artist: string;
  images: string;
  level: SongLevelType;
  search: string;
};

export type SongsType = SongType[];
