import { instance } from "@/entities/song/api/base-axios";
import { SongFavoriteType, SongId } from "@/entities/song/types/songs-types";

export const addToFavorites = async (songId: SongId) => {
  const response = await instance.post("/favorites", { songId });
  return response.data;
};

export const removeFromFavorites = async (favoriteId: string) => {
  const response = await instance.delete(`/favorites/${favoriteId}`);
  return response.data;
};

export const getFavorites = async (): Promise<SongFavoriteType[]> => {
  const response = await instance.get("/favorites");
  return response.data;
};
