import { Link } from "react-router-dom";

const Button = ({
  children,
  onClick,
  className = "",
  disabled = false,
  loading = false,
  navTo,
  variant = "primary", // Default variant
  icon,
  label,
}) => {
  // Define variant styles
  const variants = {
    primary: "bg-dark text-light ",
    secondary: "text-dark hover:bg-hover",
    danger: "bg-danger text-white",
    outline: "border border-dark text-dark hover:bg-hover",
  };

  const commonClasses = `flex items-center justify-center  w-fit px-4 py-2 font-medium active:translate-y-0.5 transition-all duration-200 cursor-pointer rounded-md disabled:opacity-50 disabled:cursor-not-allowed  gap-2 
    ${variants[variant] || variants.primary} 
    ${loading ? "pointer-events-none cursor-not-allowed" : ""} 
    ${className}`;

  if (navTo) {
    return (
      <Link to={navTo} className={commonClasses}>
        <>
          {label && <span>{label}</span>}
          {icon && <span>{icon}</span>}
          {children}
        </>
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={commonClasses}
      disabled={disabled || loading}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
      ) : (
        <>
          {icon && <span>{icon}</span>}
          {label && <span>{label}</span>}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
