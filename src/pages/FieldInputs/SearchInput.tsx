import React from "react";
import { searchCircle, closeSharp } from "ionicons/icons";
import "./FieldInputs.css"; // Optional for custom styling
import { IonIcon } from "@ionic/react";

interface SearchBarProps {
  placeholder?: string;
  type: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch?: () => void;
  onClear?: () => void;
  className?: string;
}

const SearchInput: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  type,
  value,
  onChange,
  onSearch,
  className,
  onClear
}) => {const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  // Ensure only numbers and limit to 10 digits
  // if (/^\d{0,10}$/.test(e.target.value)) {
    onChange(e);
  // }
};

return (
  <div className={`custom-search-bar ${className || ""}`}>
    <input
      type={type}
      className="custom-search-input"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      maxLength={10} // Ensures max length of 10
    />
    <div style={{ display: "flex", flexDirection: "row", gap: "0.2rem" }}>
      {value ? (
        <button className="custom-search-button" onClick={onClear}>
          <IonIcon size="small" icon={closeSharp}></IonIcon>
        </button>
      ) : null}
      <button className="custom-search-button" onClick={onSearch}>
        <IonIcon size="large" icon={searchCircle}></IonIcon>
      </button>
    </div>
  </div>
);
};

export default SearchInput;