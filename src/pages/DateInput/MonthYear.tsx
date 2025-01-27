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
      <InputText
        value={value ? value.split("T")[0] : ""}
        placeholder={placeholder}
        className="w-full"
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
              background: "#f4f5f7",
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
            <div
              onClick={() => setIsOpen(false)}
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

export default MonthYearPicker;
