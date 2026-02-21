import React, { ButtonHTMLAttributes, Children, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const SimpleButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, variant = "primary", size = "md", loading, className, ...rest },
    ref,
  ) => {
    const variants = {
      primary: "bg-[#7ab52f] text-white hover:bg-[#7ab52f]",
      secondary: "bg-white text-gray-900 hover:bg-white",
      danger: "bg-red-600 text-white-900 hover:bg-red-700",
    };

    const baseStyle =
      "inline-flex items-center justify-center rounded-full font-medium transition disabled:cursos-not-allowed";

    const sizes = {
      sm: "px-3 py-1 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };

    return (
      <div>
        <button
          ref={ref}
          className={`
                ${baseStyle}
                ${variants[variant]}
                ${sizes[size]}
                ${className}
                `}
          disabled={loading || rest.disabled}
          {...rest}
        >
          {loading ? "Entrando..." : children}
        </button>
      </div>
    );
  },
);

SimpleButton.displayName = "Button";

export default SimpleButton;
