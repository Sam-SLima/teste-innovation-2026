"use client";

import React, { useState } from "react";
import { useLogin } from "@/hooks/useLogin";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { User, Lock } from "lucide-react";
import InputLogin from "@/components/inputLogin";
import LoginButton from "@/components/loginButton";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [credentialError, setCredentialError] = useState("");
  const [remember, setRemember] = useState(false);

  const { mutate, isPending } = useLogin();
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCredentialError("");

    mutate(
      { email, senha },
      {
        onSuccess: (data) => {
          if (Number(data.status) === 1) {
            setAuth(data.token_de_acesso, data.dados_usuario);

            document.cookie = `token=${data.token_de_acesso}; path=/; max-age=86400`;

            router.push("/produtos");
            return;
          }

          setCredentialError("Credenciais inválidas");
        },

        onError: (err: any) => {
          if (!err?.response) {
            setCredentialError("Sem conexão com o servidor");
            return;
          }

          if (err.response.status === 401) {
            setCredentialError("Sessão inválida. Tente novamente.");
            return;
          }

          if (err.response.status >= 500) {
            setCredentialError("Servidor indisponível. Tente novamente.");
            return;
          }

          setCredentialError("Erro inesperado. Tente novamente.");
        },
      },
    );
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/background-login.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" />

      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        <h1 className="text-2xl font-semibold text-lime-600 mb-6 text-center">
          Bem-vindo a Innovation Brindes
        </h1>

        <form
          onSubmit={handleSubmit}
          className="w-full bg-lime-600 rounded-2xl shadow-xl px-10 py-10 flex flex-col gap-5"
        >
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Usuário"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-full pl-12 pr-4 py-3 bg-gray-100 outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <InputLogin
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="w-full rounded-full pl-12 pr-4 py-3 bg-gray-100 outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-white">
            <label className="flex items-center gap-2 cursor-pointer">
              <InputLogin
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="accent-white"
              />
              Manter logado
            </label>

            <a href="#" className="hover:underline">
              Esqueceu a senha?
            </a>
          </div>

          {credentialError && (
            <span className="text-red-100 text-sm text-center font-medium">
              {credentialError}
            </span>
          )}

          <LoginButton
            type="submit"
            loading={isPending}
            disabled={!email || !senha}
            size="lg"
          >
            Login
          </LoginButton>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
