import { api } from "./api";

export const getProdutos = async () => {
  const response = await api.get("/api/innova-dinamica/produtos/listar");
  return response.data;
};
