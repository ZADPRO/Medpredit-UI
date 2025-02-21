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
}) => {
  return (
    <div className={`custom-search-bar ${className || ""}`}>
      <input
        type={type}
        className="custom-search-input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <div style={{ display: "flex", flexDirection: "row" }}>
        {
          value ? (
            <button className="custom-search-button" onClick={onClear}>
              <IonIcon size="large" color="primary" icon={closeSharp}></IonIcon>
            </button>
          ) : null
        }
        <button className="custom-search-button" onClick={onSearch}>
          <IonIcon size="large" color="primary" icon={searchCircle}></IonIcon>
        </button>
      </div>
    </div>
  );
};

export default SearchInput;