"use client";

import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "@/services/authService";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginRequest,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 5000),
  });
};
