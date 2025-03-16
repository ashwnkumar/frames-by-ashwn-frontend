import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import CustomCheckbox from "./CustomCheckbox";

const MultiSelectDropdown = ({
  className = "",
  name,
  id,
  label,
  placeholder = "Select options",
  options = [],
  value = [],
  onChange,
  required = false,
  disabled = false,
  showCount = 3,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (option) => {
    if (!disabled) {
      const newValue = value.includes(option.value)
        ? value.filter((v) => v !== option.value)
        : [...value, option.value];
      onChange(newValue);
    }
  };

  const handleSelectAll = () => {
    if (value.length === options.length) {
      onChange([]);
    } else {
      onChange(options.map((opt) => opt.value));
    }
  };

  const handleClearAll = () => {
    onChange([]);
  };

  const handleRemove = (optionValue) => {
    onChange(value.filter((v) => v !== optionValue));
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
        <div className="flex flex-wrap gap-1">
          {value.length > 0 ? (
            <>
              {value.slice(0, showCount).map((selectedValue) => {
                const selectedOption = options.find(
                  (opt) => opt.value === selectedValue
                );
                return (
                  <span
                    key={selectedValue}
                    className="bg-dark text-white px-2 py-1 text-sm rounded flex items-center gap-1"
                  >
                    {selectedOption?.option}
                    <X
                      size={14}
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(selectedValue);
                      }}
                    />
                  </span>
                );
              })}
              {value.length > showCount && (
                <span className="text-placeholder">
                  +{value.length - showCount} more
                </span>
              )}
            </>
          ) : (
            <span className="text-placeholder">{placeholder}</span>
          )}
        </div>

        {isOpen ? (
          <ChevronUp strokeWidth={1.5} />
        ) : (
          <ChevronDown strokeWidth={1.5} />
        )}
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-1 w-full bg-light border border-gray rounded-md shadow-lg max-h-60 overflow-y-auto z-10">
          <div className="sticky top-0 z-10 bg-light border-b border-gray px-3 py-2 flex items-center gap-2">
            <CustomCheckbox
              checked={value.length === options.length}
              onChange={handleSelectAll}
            />
            <button
              type="button"
              className="text-sm font-medium"
              onClick={handleSelectAll}
            >
              {value.length === options.length ? "Deselect All" : "Select All"}
            </button>
          </div>

          {options.length > 0 ? (
            <>
              {options.map((opt) => (
                <div
                  key={opt.value}
                  className={`px-3 py-2 cursor-pointer transition-colors duration-150 flex items-center gap-2 
                    ${value.includes(opt.value) ? "" : "hover:bg-hover"}`}
                  onClick={() => handleSelect(opt)}
                >
                  <CustomCheckbox
                    checked={value.includes(opt.value)}
                    onChange={() => handleSelect(opt)}
                  />
                  {opt.option}
                </div>
              ))}

              {value.length > 0 && (
                <div className="sticky bottom-0 bg-light border-t border-gray px-3 py-2 flex items-center gap-2">
                  <button
                    type="button"
                    className="text-sm font-medium text-danger"
                    onClick={handleClearAll}
                  >
                    Clear All
                  </button>
                </div>
              )}
            </>
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

export default MultiSelectDropdown;
