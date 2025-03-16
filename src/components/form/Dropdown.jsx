import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const Dropdown = ({
  className = "",
  name,
  id,
  label,
  placeholder = "Select an option",
  options = [],
  value,
  onChange,
  required = false,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (option) => {
    if (!disabled) {
      onChange(option);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      {label && (
        <label className="text-md font-medium">
          {label}
          {required && (
            <span className="text-danger text-lg font-medium"> *</span>
          )}
        </label>
      )}

      <button
        type="button"
        id={id}
        name={name}
        className={`w-full border rounded-md px-2 py-2 transition-colors duration-200 font-normal flex justify-between items-center focus:outline-none focus:ring-0 
          ${disabled ? "bg-disabled cursor-not-allowed" : "cursor-pointer"} 
          ${isOpen ? "border-primary" : "border-gray"}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <span className={selectedOption ? "" : "text-placeholder"}>
          {selectedOption ? selectedOption.option : placeholder}
        </span>
        {isOpen ? (
          <ChevronUp strokeWidth={1.5} />
        ) : (
          <ChevronDown strokeWidth={1.5} />
        )}
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-1 w-full bg-light border divide-y divide-gray border-gray rounded-md shadow-lg max-h-60 overflow-y-auto z-10">
          {options.length > 0 ? (
            options.map((opt) => (
              <div
                key={opt.value}
                className={`px-3 py-2 cursor-pointer transition-colors duration-150 
                  ${
                    value === opt.value
                      ? "bg-dark text-light"
                      : " hover:bg-hover "
                  }`}
                onClick={() => handleSelect(opt)}
              >
                {opt.option}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-placeholder">
              No options available
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
