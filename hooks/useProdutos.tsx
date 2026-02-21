import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { api } from "@/services/api";

interface Filtros {
  nome_produto: string;
  codigo_produto: string;
}

export const useProdutos = (filtros: Filtros) => {
  return useQuery({
    queryKey: ["produtos", filtros],
    queryFn: async () => {
      const response = await api.post(
        "/api/innova-dinamica/produtos/listar",
        filtros,
      );

      return response.data;
    },
    placeholderData: keepPreviousData,
  });
};
