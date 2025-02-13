import React from "react";
import "./FieldInputs.css"

interface TextInputProps {
  type?: "text" | "email" | "number";
  placeholder?: string;
  required?: boolean;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean
}

const TextInput: React.FC<TextInputProps> = ({
  type = "text",
  placeholder,
  required = false,
  name,
  value,
  error = false,
  onChange,
}) => {
  return (
    <div className={`custom-text-Input ${error ? "error" : ""}`}>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        required={required}
        
        onChange={onChange}
      />
    </div>
  );
};

export default TextInput;