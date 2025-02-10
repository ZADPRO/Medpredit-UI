// import { Calendar } from "primereact/calendar";
// import React, { useState } from "react";
// import { Nullable } from "primereact/ts-helpers";
// import { Divider } from "primereact/divider";
// import ShowCard from "../ShowCard/ShowCard";
// import Domain from "../Domain/Domain";

// interface TimeInputBoxProps {
//   type: string;
//   label: {
//     questionType: string;
//     questionText: string;
//     questionId: number;
//     options: [
//       {
//         backwardQId: string;
//         forwardQId: string;
//         refOptionId: number;
//         refOptionLabel: string;
//       }
//     ];
//   };
//   onEdit: (questionType: any, value: any, forwardQId: string) => void;
// }

// const TimeInputBox: React.FC<TimeInputBoxProps> = ({ label, type, onEdit }) => {
//   const [time, setTime] = useState<Nullable<Date>>(null);

//   const forwardQId = label.options[0]?.forwardQId || "";

//   const getFormate = (value: any) => {
//     const formattedTime = value.toLocaleTimeString("en-GB", {
//       hour: "2-digit",
//       minute: "2-digit",
//     });

//     return formattedTime;
//   };

//   // Trigger onEdit whenever time is updated
//   const handleTimeChange = (e: any) => {
//     setTime(e.value);
//   };

//   return (
//     <div className="questionsOutline">
//       <form
//         onSubmit={(e: any) => {
//           e.preventDefault();
//           onEdit(label.questionType, getFormate(time), forwardQId);
//         }}
//       >
//         <div className="questions inputText">
//           <Domain questionId={label.questionId} />
//           <p className="question ">{label.questionText}</p>
//           <ShowCard questionId={label.questionId} />
//           <div className="p-inputgroup flex-1">
//             <Calendar
//               id="calendar-timeonly"
//               value={time}
//               onChange={handleTimeChange}
//               timeOnly
//               placeholder="Enter Time"
//               hourFormat="12"
//               className="w-full"
//               required
//             />
//             <button type="submit">
//               <span className="p-inputgroup-addon">
//                 <i className="pi pi-arrow-right"></i>
//               </span>
//             </button>
//           </div>
//           <Divider />
//         </div>
//       </form>
//     </div>
//   );
// };

// export default TimeInputBox;


import { Divider } from "primereact/divider";
import { InputNumber } from "primereact/inputnumber";
import React, { useState } from "react";
import Domain from "../Domain/Domain";
import { IonDatetime, IonModal } from "@ionic/react";
import TimeInputBox24 from "./TimeInputBox24";
import { InputText } from "primereact/inputtext";

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
  label: {
    questionType: string;
    questionText: string;
    questionId: number;
    options: [
      {
        backwardQId: string;
        forwardQId: string;
        refOptionId: number;
        refOptionLabel: string;
      }
    ];
  };
  onEdit: (questionType: any, value: any, forwardQId: string) => void;
}

const TimeInputBox: React.FC<HrsInputBox> = ({ label, type, onEdit }) => {
  const [hrsValue, setHrsValue] = useState<number | null>(null);
  const [minsValue, setMinsValue] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const [localInput, setLocalInput]: any = useState();

  const getFormate = (value: any) => {
    const date = new Date(value);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleButtonClick = () => {
    const forwardQId = label.options[0]?.forwardQId || "";
    onEdit(label.questionType, getFormate(localInput), forwardQId);
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Set selected hours and minutes from the modal
  const handleSetTime = () => {
    setHrsValue(hrsValue);
    setMinsValue(minsValue);
    closeModal();
    // handleButtonClick();
  };




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
          <div style={{ width: "100%", background: "#f4f5f7" }}>
            <IonDatetime
              presentation="time"
              value={localInput}
              onIonChange={(e) => {
                setLocalInput(e.detail.value);
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
                    console.log('====================================');
                    console.log("Updated Time:", hours, minutes);
                    console.log('====================================');
                  }
                }
              }}
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
                  setHrsValue(null);
                  setMinsValue(null);
                  closeModal();
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
                }}
              >
                Clear
              </div>
              <div
                onClick={handleSetTime}
                style={{
                  width: "40%",
                  background: "green",
                  padding: "15px",
                  textAlign: "center",
                  fontSize: "1rem",
                  color: "#fff",
                  borderRadius: "10px",
                  fontWeight: "700",
                }}
              >
                Set
              </div>
            </div>
          </div>
        </IonModal>

        <div className="questions inputText">
          <Domain questionId={label.questionId} />
          <p className="question">{label.questionText}</p>
          <div className="p-inputgroup flex-1">
            <InputText
              value={localInput ? getFormate(localInput) : ""}
              placeholder="Enter Time"
              onClick={openModal}
              required
            />
            {/* <InputNumber
              value={minsValue}
              placeholder="In Mins"
              onClick={openModal}
              min={0}
              max={59}
              required
            /> */}
            <button type="submit">
              <span className="p-inputgroup-addon">
                <i className="pi pi-arrow-right"></i>
              </span>
            </button>
          </div>
          <Divider />
        </div>
      </form>
    </div>
  );
};

export default TimeInputBox;
