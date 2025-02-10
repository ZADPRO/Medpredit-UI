import React, { useState } from "react";
import { IonModal, IonDatetime } from "@ionic/react";
import { InputText } from "primereact/inputtext";

interface DateSelectorProps {
  value: string;
  onChange: (date: string) => void;
  placeholder: string;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  const [pastreport, setPastReport] = useState<string>(""); // Local state
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleDateChange = (event: CustomEvent) => {
    const selectedDate = event.detail.value;
    setPastReport(selectedDate); // Update local state with selected date
  };

  return (
    <>
      {/* Input field to open modal */}
      <InputText
        type="text"
        value={value ? value.slice(0, 7) : ""} // Show value in "YYYY-MM" format
        placeholder={placeholder}
        className="w-full"
        onClick={() => {
          if (value.length === 0) {
            const today = new Date();
            const formattedDate = today.toISOString().slice(0, 7); // Default to current month
            onChange(formattedDate); // Set initial date
            setPastReport(formattedDate); // Sync local state
          } else {
            setPastReport(value); // Sync local state with prop value
          }
          setIsOpen(true); // Open modal
        }}
        readOnly
      />

      {/* Modal for date selection */}
      <IonModal
        isOpen={isOpen}
        id="doctorDetailsGraph"
        initialBreakpoint={1}
        onDidDismiss={() => setIsOpen(false)}
        animated={false}
      >
        <div style={{ width: "100%", background: "#f4f5f7" }}>
          <IonDatetime
            preferWheel={true}
            presentation="month-year"
            value={pastreport} // Use local state
            onIonChange={handleDateChange}
          />
          <div
            style={{
              background: "#f4f5f7",
              display: "flex",
              justifyContent: "space-evenly",
              width: "100%",
              marginBottom: "10px",
            }}
          >
            {/* Clear Button */}
            <div
              onClick={() => {
                onChange(""); // Clear the external value
                setPastReport(""); // Reset local state
                setIsOpen(false);
              }}
              style={{
                width: "40%",
                background: "#505050",
                padding: "15px",
                textAlign: "center",
                fontSize: "1rem",
                color: "#fff",
                borderRadius: "10px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Clear
            </div>
            {/* Set Button */}
            <div
              onClick={() => {
                onChange(pastreport); // Update external value
                setIsOpen(false); // Close modal
              }}
              style={{
                width: "40%",
                background: "green",
                padding: "15px",
                textAlign: "center",
                fontSize: "1rem",
                color: "#fff",
                borderRadius: "10px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Set
            </div>
          </div>
        </div>
      </IonModal>
    </>
  );
};

export default DateSelector;
