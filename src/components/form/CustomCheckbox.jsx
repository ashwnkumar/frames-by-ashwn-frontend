import { Check } from "lucide-react";

const CustomCheckbox = ({
  id,
  checked,
  onChange,
  labelText,
  labelProps = {},
  checkboxProps = {},
  className,
  onClick,
}) => {
  return (
    <div
      className={`inline-flex gap-3 items-center bg-light ${className}`}
      onClick={onClick}
    >
      <label
        className={`relative flex items-center cursor-pointer ${
          labelProps.className || ""
        }`}
        htmlFor={id}
        {...labelProps}
      >
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className={`peer h-5 w-5 appearance-none border border-primary rounded-sm transition-all 
            checked:border-dark bg-light checked:bg-primary-faded focus:outline-none ${
              checkboxProps.className || ""
            }`}
          {...checkboxProps}
        />
        <span className="absolute text-dark opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Check strokeWidth={1.5} size={12} absoluteStrokeWidth />
        </span>
      </label>
      {labelText && (
        <span className="text-dark font-normal cursor-pointer">
          {labelText}
        </span>
      )}
    </div>
  );
};

export default CustomCheckbox;
