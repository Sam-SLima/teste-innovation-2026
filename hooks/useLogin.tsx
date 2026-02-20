"use client";

import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "@/services/authService";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginRequest,
  });
};
