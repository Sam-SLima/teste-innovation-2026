import { api } from "./api";

interface LoginPayload {
  email: string;
  senha: string;
}

export const loginRequest = async (data: LoginPayload) => {
  console.log("DADOS ENVIADOS:", data);
  const response = await api.post("/api/innova-dinamica/login/acessar", data);

  return response.data;
};
