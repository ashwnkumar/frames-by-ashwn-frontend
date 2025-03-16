import { CircleAlert, Eye, EyeOff } from "lucide-react";
import React, { useState, useMemo } from "react";

const Input = ({
  className = "",
  name,
  id,
  label,
  placeholder,
  value,
  type = "text",
  error,
  onChange,
  onKeyDown,
  required = false,
  disabled = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = useMemo(() => {
    return type === "password" ? (showPassword ? "text" : "password") : type;
  }, [type, showPassword]);

  return (
    <div className={`flex flex-col w-full ${className}`}>
      {label && (
        <label className="text-md font-medium">
          {label}
          {required && (
            <span className="text-danger text-lg font-medium"> *</span>
          )}
        </label>
      )}

      <div className="relative w-full">
        <input
          type={inputType}
          name={name}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          disabled={disabled}
          
          className={`w-full border rounded-md px-2 py-2 transition-colors duration-200 font-normal focus:outline-none focus:border-brand  
            ${error ? "border-danger" : "border-gray"} 
            ${disabled ? "bg-disabled cursor-not-allowed" : ""} 
            ${
              type === "number"
                ? "[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                : ""
            }`}
        />

        {error && (
          <CircleAlert
            strokeWidth={1.5}
            stroke="var(--color-danger)"
            className={`absolute ${
              type === "password" ? "right-10" : "right-2"
            } top-1/2 -translate-y-1/2`}
          />
        )}

        {type === "password" && (
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff strokeWidth={1.5} />
            ) : (
              <Eye strokeWidth={1.5} />
            )}
          </button>
        )}
      </div>

      {error && (
        <span className="text-danger text-sm font-medium">{error}</span>
      )}
    </div>
  );
};

export default Input;
