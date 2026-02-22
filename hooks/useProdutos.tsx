import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Produto } from "@/app/types/produto";

interface Filtros {
  nome_produto: string;
  codigo_produto: string;
}

export const useProdutos = (filtros: Filtros) => {
  return useQuery<Produto[]>({
    queryKey: ["produtos", filtros],

    queryFn: async () => {
      const temFiltro =
        filtros.nome_produto.trim() || filtros.codigo_produto.trim();

      if (temFiltro) {
        const res = await api.post(
          "/api/innova-dinamica/produtos/listar",
          filtros,
        );
        return res.data;
      }

      const res = await api.get("/api/innova-dinamica/produtos/listar");
      return res.data;
    },

    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};
