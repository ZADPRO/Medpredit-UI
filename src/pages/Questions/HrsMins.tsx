import { Divider } from "primereact/divider";
import { InputNumber } from "primereact/inputnumber";
import React, { useEffect, useRef, useState } from "react";
import Domain from "../Domain/Domain";
import { IonDatetime, IonModal } from "@ionic/react";

interface Option {
  backwardQId: string;
  forwardQId: string;
  refOptionId: number;
  refOptionLabel: string;
}

interface Label {
  questionType: string;
  questionText: string;
  questionId: number;
  options: Option[];
}

interface HrsInputBox {
  type: string;
  label: Label;
  SubmitActive: (active: boolean) => void;
  onEdit: (
    questionType: string,
    hrsValue: number | null,
    minsValue: number | null,
    forwardQId: string
  ) => void;
}

const HrsMins: React.FC<HrsInputBox> = ({ label, type, onEdit, SubmitActive }) => {
  const [hrsValue, setHrsValue] = useState<number | null>(null);
  const [minsValue, setMinsValue] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const isFirstRender = useRef(true);

  const [localInput, setLocalInput] = useState<string>(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}T00:00:00`;
  });
  



  const handleButtonClick = () => {
    const forwardQId = label.options[0]?.forwardQId || "";
    onEdit(label.questionType, hrsValue, minsValue, forwardQId);
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    const now = new Date();
    setLocalInput(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}T00:00:00`);
    setIsOpen(false);
  };

  // Set selected hours and minutes from the modal
  const handleSetTime = () => {
    setHrsValue(hrsValue);
    setMinsValue(minsValue);
    closeModal();
    if(hrsValue !== null && minsValue !== null) {
      handleButtonClick();
    }
    else 
    if(hrsValue == null && minsValue == null) {
      setHrsValue(0);
    setMinsValue(0);
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // Mark first render as handled
      return;
    }
  
    if (hrsValue === 0 && minsValue === 0) {
      handleButtonClick();
    } else if (hrsValue === null && minsValue === null) {
      handleButtonClick();
    }
  }, [hrsValue, minsValue]);
  

  const handleClearTime = () => {
    setHrsValue(null);
    setMinsValue(null);
    closeModal();
  }

  console.log("localinput" ,localInput);
  console.log("hrs", hrsValue);
  console.log("min", minsValue);
  return (
    <div className="questionsOutline">
      <form
        onSubmit={(e: React.FormEvent) => {
          e.preventDefault();
          handleButtonClick();
        }}
      >
        <IonModal
          isOpen={isOpen}
          id="doctorDetailsGraph"
          initialBreakpoint={1}
          onDidDismiss={closeModal}
          animated={false}
        >
          <div style={{ width: "100%", background: "#effafe" }}>
            <IonDatetime
              presentation="time"
              value={localInput}
              hourCycle="h23"
              onIonChange={(e) => {
                if (typeof e.detail.value === 'string') {
                  setLocalInput(e.detail.value);
                }                
                const time = e.detail.value;
                console.log(time);

                if (typeof time === "string") {
                  // Extracting only the time part "HH:mm"
                  const timeParts = time.split("T")[1]?.split(":");
                  if (timeParts && timeParts.length === 3) {
                    const hours = parseInt(timeParts[0], 10); // Hours part
                    const minutes = parseInt(timeParts[1], 10); // Minutes part
                    setHrsValue(hours);
                    setMinsValue(minutes);
                  }
                }
              }}
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
                onClick={() => handleClearTime()}
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
                onClick={handleSetTime}
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

        <div className="questionsType inputText">
          <Domain questionId={label.questionId} />
          <p className="questionText">{label.questionText}</p>
          <div className="p-inputgroup flex-1" style={{ border: "1.5px solid #10416a", borderRadius: "10px" }}>
            <InputNumber
              id="hrsInputLeft"
              value={hrsValue}
              placeholder="In Hrs"
              onClick={openModal}
              min={0}
              max={23}
              required
            />
            <InputNumber
              id="hrsInput"
              value={minsValue}
              placeholder="In Mins"
              onClick={openModal}
              min={0}
              max={59}
              required
            />
            {/* <button type="submit" style={{ background: "transparent" }}>
              <span className="p-inputgroup-addon" style={{ background: "#10416a", color: "#fff", borderRadius: "50%", width: "10px", height: "45px" }}>
                <i className="pi pi-arrow-right"></i>
              </span>
            </button> */}
          </div>
          <Divider />
        </div>
      </form>
    </div>
  );
};

export default HrsMins;
