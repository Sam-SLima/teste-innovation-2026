"use client";

import InputLogin from "@/components/inputLogin";
import { useState } from "react";

const LoginPage = () => {
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  return (
    <div>
      <form>
        <InputLogin
          id="name"
          label="name"
          type="text"
          placeholder="Digite seu email"
          required
        />
        <InputLogin
          id="password"
          label="Senha"
          type="password"
          error="Senha inválida"
          required
        />
      </form>
    </div>
  );
};

export default LoginPage;
