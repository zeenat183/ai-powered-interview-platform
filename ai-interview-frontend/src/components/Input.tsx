interface InputProps {
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  const Input = ({ label, type, value, onChange }: InputProps) => {
    return (
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-1">
          {label}
        </label>
        <input
          type={type}
          value={value}
          onChange={onChange}
          required
          className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
    );
  };
  
  export default Input;
  