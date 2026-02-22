import React from "react";
import clsx from "clsx";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
};

export default function LoginButton({
  children,
  loading,
  variant = "primary",
  size = "md",
  className,
  disabled,
  ...props
}: Props) {
  const base =
    "rounded-full font-medium transition flex items-center justify-center";

  const variants = {
    primary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
    secondary: "bg-white text-lime-600 hover:bg-gray-100",
  };

  const sizes = {
    sm: "py-2 px-4 text-sm",
    md: "py-3 px-6 text-base",
    lg: "py-3 px-8 text-lg",
  };

  return (
    <button
      disabled={disabled || loading}
      className={clsx(
        base,
        variants[variant],
        sizes[size],
        (disabled || loading) && "opacity-60 cursor-not-allowed",
        className,
      )}
      {...props}
    >
      {loading ? "Entrando..." : children}
    </button>
  );
}
