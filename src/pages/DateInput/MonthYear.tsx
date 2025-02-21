import { IonDatetime, IonModal } from "@ionic/react";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";

interface MonthYearPickerProps {
  value: string;
  onChange: (date: string) => void;
  placeholder?: string;
}

const MonthYearPicker: React.FC<MonthYearPickerProps> = ({
  value,
  onChange,
  placeholder = "Select Date",
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleDateChange = (e: CustomEvent) => {
    const selectedDate = e.detail.value as string;
    if (onChange) {
      onChange(selectedDate);
    }
  };

  return (
    <>
      <div className="p-inputgroup addFamilyInputField gradientBackground02_opacity">
        <InputText
          style={{ width: "100%", textAlign: "left" }}
          className="addFamilyInputText"
          value={value ? value.split("T")[0] : ""}
          placeholder={placeholder}
          onClick={() => {
            if (!value) {
              const today = new Date();
              const formattedDate = today.toISOString().slice(0, 7); // Format YYYY-MM
              onChange(formattedDate);
            }
            setIsOpen(true);
          }}
          readOnly
        />
      </div>
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
            value={value}
            onIonChange={handleDateChange}
          />
          <Divider />
          <div
            style={{
              background: "#effafe",
              display: "flex",
              justifyContent: "space-evenly",
              width: "100%",
              marginBottom: "10px",
            }}
          >
            <div
              onClick={() => {
                onChange("");
                setIsOpen(false);
              }}
              style={{
                width: "40%",
                background: "#ceebfb",
                padding: "15px",
                textAlign: "center",
                fontSize: "1.1rem",
                color: "#0c3f69",
                borderRadius: "10px",
                fontWeight: "600",
              }}
            >
              Clear
            </div>
            <div
              onClick={() => setIsOpen(false)}
              style={{
                width: "40%",
                background: "linear-gradient(27deg, rgba(16, 148, 231, 1) 0%, rgba(7, 117, 197, 1) 100%)",
                padding: "15px",
                textAlign: "center",
                fontSize: "1rem",
                color: "#fff",
                borderRadius: "10px",
                fontWeight: "700"
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

export default MonthYearPicker;
