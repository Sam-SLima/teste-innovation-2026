"use client";

import React, { useState } from "react";
import { useLogin } from "@/hooks/useLogin";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

import InputLogin from "@/components/inputLogin";
import SimpleButton from "@/components/simpleButton";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [credentialError, setCredentialError] = useState("");

  const { mutate, isPending, error } = useLogin();
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("EMAIL:", email);
    console.log("SENHA:", senha);
    mutate(
      { email, senha },
      {
        onSuccess: (data) => {
          if (Number(data.status) === 1) {
            setAuth(data.token_de_acesso, data.dados_usuario);
            document.cookie = `token=${data.token_de_acesso}; path=/;`;
            router.push("/produtos");
          } else {
            setCredentialError("Usuário ou senha inválidos");
          }
        },
        onError: () => {
          setCredentialError("Erro ao conectar com o servidor.");
        },
      },
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1>Bem-vindo a Innovation brindes</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-80 bg-lime-600 p-8"
      >
        <InputLogin
          id="email"
          type="text"
          placeholder="Usuário"
          className="bg-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputLogin
          id="password"
          type="password"
          placeholder="senha"
          value={senha}
          className="bg-white flex flex-col"
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        {credentialError && (
          <span className="text-red-500 text-sm text-center">
            {credentialError}
          </span>
        )}

        <SimpleButton
          type="submit"
          disabled={isPending}
          variant="secondary"
          size="lg"
        >
          {isPending ? "Entrando..." : "Entrar"}
        </SimpleButton>
        {error && <span className="text-red-500">Erro ao fazer login.</span>}
      </form>
    </div>
  );
};

export default LoginPage;
