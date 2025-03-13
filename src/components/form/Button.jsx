const Button = ({
  children,
  onClick,
  className = "",
  disabled = false,
  loading = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full px-4 py-2 bg-dark text-light font-medium active:translate-y-0.5 transition-all duration-200 cursor-pointer rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 
          ${loading ? "pointer-events-none cursor-not-allowed" : ""} 
          ${className}`}
      disabled={disabled || loading}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-t-transparent border-light rounded-full animate-spin"></span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
