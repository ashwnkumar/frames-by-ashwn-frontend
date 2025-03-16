import { CircleAlert } from "lucide-react";
import React from "react";

const Textarea = ({
  className = "",
  name,
  id,
  label,
  placeholder,
  value,
  error,
  onChange,
  onKeyDown,
  required = false,
  disabled = false,
  rows = 3,
}) => {
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
        <textarea
          name={name}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          disabled={disabled}
          rows={rows}
          className={`w-full border rounded-md px-2 py-2 transition-colors duration-200 font-normal focus:outline-none focus:border-primary 
            ${error ? "border-danger" : "border-gray"} 
            ${disabled ? "bg-disabled cursor-not-allowed" : ""}`}
        ></textarea>

        {error && (
          <CircleAlert
            strokeWidth={1.5}
            stroke="var(--color-danger)"
            className="absolute right-2 top-3"
          />
        )}
      </div>

      {error && (
        <span className="text-danger text-sm font-medium">{error}</span>
      )}
    </div>
  );
};

export default Textarea;
