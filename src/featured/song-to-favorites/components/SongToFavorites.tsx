import FavoriteIcon from "@/shared/components/favorites/components/favorite";
import { SongId } from "@/entities/song/types/songs-types";
import {
  addToFavorites,
  removeFromFavorites,
} from "@/entities/song/api/favorites";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface SongToFavoritesProps {
  songId: SongId;
  isFavorite: boolean;
  favoriteId: string;
}

export default function SongToFavorites({
  songId,
  isFavorite,
  favoriteId,
}: SongToFavoritesProps) {
  const queryClient = useQueryClient();

  const toggleFavoriteMutation = useMutation({
    mutationFn: isFavorite ? removeFromFavorites : addToFavorites,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["/favorites"],
        exact: true,
      });
    },
  });

  const handleToggleFavorite = () => {
    const id = isFavorite ? favoriteId : songId;
    toggleFavoriteMutation.mutate(id);
  };

  return (
    <div className="song-to-favorites" onClick={handleToggleFavorite}>
      <FavoriteIcon
        isFavorite={isFavorite}
        isloading={toggleFavoriteMutation.isLoading}
      />
    </div>
  );
}
