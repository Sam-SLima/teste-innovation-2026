import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  placeholder?: string;
  value?: string;
}

const InputLogin = forwardRef<HTMLInputElement, InputProps>(
  ({ label, value, error, placeholder, id, className, ...rest }, ref) => {
    return (
      <div>
        {label && <label htmlFor={id}>{label}</label>}
        <input
          id={id}
          ref={ref}
          value={value}
          placeholder={placeholder}
          className={`
            border-none rounded-full px-3 py-2 outline-none
            ${error ? "border-red-500" : "border-gray-300"}
            ${className}
          `}
          {...rest}
        />
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    );
  },
);

export default InputLogin;
