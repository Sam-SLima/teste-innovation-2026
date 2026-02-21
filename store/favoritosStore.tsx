import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritosState {
  favoritos: string[];
  toggleFavorito: (codigo: string) => void;
}

export const useFavoritosStore = create<FavoritosState>()(
  persist(
    (set, get) => ({
      favoritos: [],
      toggleFavorito: (codigo) => {
        const exists = get().favoritos.includes(codigo);
        set({
          favoritos: exists
            ? get().favoritos.filter((c) => c !== codigo)
            : [...get().favoritos, codigo],
        });
      },
    }),
    { name: "favoritos-storage" },
  ),
);
