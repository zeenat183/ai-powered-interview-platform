interface ButtonProps {
    children: React.ReactNode;
    type?: "submit" | "button";
    disabled?: boolean;
  }
  
  const Button = ({ children, type = "button", disabled = false }: ButtonProps) => {
    return (
      <button
        type={type}
        disabled={disabled}
        className={`w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition 
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {children}
      </button>
    );
  };
  
  export default Button;
  