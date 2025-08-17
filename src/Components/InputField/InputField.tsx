import React, { useState } from "react";


export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  type?: "text" | "password";
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  clearable?: boolean;
}

const sizeClasses = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

const variantClasses = {
  filled:
    "bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-blue-500",
  outlined:
    "border border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500",
  ghost:
    "bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-0 rounded-none",
};

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  loading,
  type = "text",
  variant = "outlined",
  size = "md",
  clearable = false,
}) => {
  const [internalValue, setInternalValue] = useState(value || "");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    onChange?.(e);
  };

  const handleClear = () => {
    setInternalValue("");
    onChange?.({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
  };

  const inputId = label ? `${label.replace(/\s+/g, "-").toLowerCase()}-input` : undefined;
  const describedById = invalid
    ? `${inputId}-error`
    : helperText
    ? `${inputId}-helper`
    : undefined;

  return (
    <div className="flex flex-col space-y-1 w-full max-w-md">
      {label && (
        <label htmlFor={inputId} className="text-sm font-semibold text-gray-700 dark:text-gray-200">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={inputId}
          type={type === "password" && showPassword ? "text" : type}
          value={internalValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={invalid}
          aria-disabled={disabled}
          aria-describedby={describedById}
          className={`
            w-full rounded-md shadow-sm transition focus:outline-none
            ${sizeClasses[size]}
            ${variantClasses[variant]}
            ${invalid ? "border-red-500 text-red-600 placeholder-red-400 focus:ring-red-500" : ""}
            ${disabled ? "bg-gray-100 dark:bg-gray-800 cursor-not-allowed opacity-70" : ""}
          `}
        />

        {/* Loading spinner */}
        {loading && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin border-2 border-gray-400 border-t-transparent rounded-full w-5 h-5"></span>
        )}

        {/* Clear button */}
        {clearable && internalValue && !disabled && !loading && type !== "password" && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear input"
          >
            ✕
          </button>
        )}

        {/* Password toggle */}
        {type === "password" && !loading && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        )}
      </div>

      {helperText && !invalid && (
        <p id={`${inputId}-helper`} className="text-xs text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      )}
      {invalid && errorMessage && (
        <p id={`${inputId}-error`} className="text-xs text-red-600">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
