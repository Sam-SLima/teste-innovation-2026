import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const InputLogin = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className, ...rest }, ref) => {
    return (
      <div>
        {label && <label htmlFor={id}>{label}</label>}
        <input
          id={id}
          ref={ref}
          className={`
            border rounded px-3 py-2 outline-none
            focus:ring-2 focus:ring-blue-500
            ${error ? "border-red-500" : "border-gray-300"}
            ${className}
          `}
        />
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    );
  },
);

export default InputLogin;
