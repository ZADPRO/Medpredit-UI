import React from "react";
import { searchCircle } from "ionicons/icons";
import "./FieldInputs.css"; // Optional for custom styling
import { IonIcon } from "@ionic/react";

interface SearchBarProps {
  placeholder?: string;
  type: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch?: () => void;
  className?: string;
}

const SearchInput: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  type,
  value,
  onChange,
  onSearch,
  className,
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
      <button className="custom-search-button" onClick={onSearch}>
        <IonIcon size="large" color="primary" icon={searchCircle}></IonIcon>
      </button>
    </div>
  );
};

export default SearchInput;