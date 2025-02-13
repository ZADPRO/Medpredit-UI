import React, { useState } from "react";
import "./FieldInputs.css";

interface PasswordInputProps {
  placeholder?: string;
  name: string;
  value?: string;
  required?: boolean;
  error?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  placeholder,
  name,
  value,
  required = false,
  error = false,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`custom-password-Input ${error ? "error" : ""}`} >
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={onChange}
      />
      <button
        type="button"
        className="toggle-password"
        style={{ backgroundColor: "transparent" }}
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <i className="pi pi-eye" />
        ) : (
          <i className="pi pi-eye-slash" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
