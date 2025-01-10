import axios from "axios";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import React, { useEffect, useState } from "react";
import decrypt from "../../helper";
import { IonAlert } from "@ionic/react";

interface GraphValuesProps {
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
  SubmitActive: (active: boolean) => void;
}

const GraphValues: React.FC<GraphValuesProps> = ({
  label,
  onEdit,
  SubmitActive,
}) => {
  const tokenString: any = localStorage.getItem("userDetails");
  const tokenObject = JSON.parse(tokenString);
  const token = tokenObject.token;
  const category: any = localStorage.getItem("getQuestions");
  let categoryId: any = JSON.parse(category).id;

  const [data, setData] = useState<
    {
      id: any | null;
      date: Date | null;
      number: number | null;
      flag: String | null;
    }[]
  >([
    { id: null, date: null, number: null, flag: "ui" }, // Initial state for one item
  ]);

  const forwardQId = label.options[0]?.forwardQId || "";

  const handleChange = (
    index: number,
    field: keyof (typeof data)[0],
    value: any
  ) => {
    SubmitActive(true);
    if (data.length > 0) {
      onEdit(label.questionType, data, forwardQId);
    }
    const updatedData = [...data];
    updatedData[index][field] = value; // Update the specific field
    setData(updatedData);
  };

  const [isAlertOpen, setIsAlertOpen] = useState({
    status: false,
    id: "",
  });

  const removeItem = (index: number) => {
    const updatedData = data.filter((_, i) => i !== index); // Remove the item at the index
    if (data[index].flag === "ui") {
      setData(updatedData);
    } else if (data[index].flag === "temp") {
      console.log(data[index].id);
      setIsAlertOpen({ status: true, id: index.toString() });
    }
    if (updatedData.length === 0) {
      SubmitActive(true);
    }
  };

  const handleremoveScore = () => {
    const updatedData = data.filter((_, i) => i !== parseInt(isAlertOpen.id));
    if (tokenString) {
      try {
        axios
          .post(
            `${import.meta.env.VITE_API_URL}/deleteInvestigationDetail`,
            {
              investigationId: data[parseInt(isAlertOpen.id)].id,
            },
            {
              headers: {
                Authorization: token,
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            const data = decrypt(
              response.data[1],
              response.data[0],
              import.meta.env.VITE_ENCRYPTION_KEY
            );
            if (data.status) {
              setIsAlertOpen({ status: false, id: "" });
              setData(updatedData);
              if (updatedData.length === 0) {
                SubmitActive(true);
              }
            }
          });
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    }
  };

  const addItem = () => {
    setData([...data, { id: null, date: null, number: null, flag: "ui" }]); // Add a new item
  };

  useEffect(() => {
    console.log("====================================");
    console.log(label);
    console.log("====================================");

    let temp: any = label.questionId;

    if (temp === 330 && localStorage.getItem("testQuestion") === "329") {
      categoryId = "225";
    }

    if (temp === 336 && localStorage.getItem("testQuestion") === "335") {
      categoryId = "228";
    }

    if (temp === 340 && localStorage.getItem("testQuestion") === "339") {
      categoryId = "231";
    }

    if (temp === 340 && localStorage.getItem("testQuestion") === "338") {
      categoryId = "231";
    }

    if (temp === 345 && localStorage.getItem("testQuestion") === "343") {
      categoryId = "234";
    }

    if (temp === 345 && localStorage.getItem("testQuestion") === "342") {
      categoryId = "234";
    }

    if (temp === 345 && localStorage.getItem("testQuestion") === "344") {
      categoryId = "234";
    }

    if (tokenString) {
      try {
        axios
          .post(
            `${import.meta.env.VITE_API_URL}/getInvestigationDetails`,
            {
              patientId: localStorage.getItem("currentPatientId"),
              categoryId: categoryId,
            },
            {
              headers: {
                Authorization: token,
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            const data = decrypt(
              response.data[1],
              response.data[0],
              import.meta.env.VITE_ENCRYPTION_KEY
            );
            if (data.status) {
              if (data.data.length > 0) {
                setData(data.data);
                if (data.data.length > 0) {
                  onEdit(label.questionType, data.data, forwardQId);
                  console.log("################");
                }
                console.log(data.data);
              }
            }
          });
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    }
  }, [localStorage.getItem("testQuestion")]);

  return (
    <div className="questions inputText">
      <p className="question">{label.questionText}</p>
      <IonAlert
        isOpen={isAlertOpen.status}
        cssClass="custom-alert"
        header="Are you sure you want to delete the previous value?"
        backdropDismiss={false}
        buttons={[
          {
            text: "Yes",
            role: "confirm",
            handler: () => {
              handleremoveScore();
            },
            cssClass: "yes-button",
          },
          {
            text: "No",
            role: "cancel",
            handler: () => {},
            cssClass: "no-button",
          },
        ]}
        onDidDismiss={() => setIsAlertOpen({ status: false, id: "" })}
      />
      <div>
        {data.map((item, index) => (
          <div
            key={index}
            className="questions inputText"
            style={{ display: "flex", flexDirection: "row", width: "100%" }}
          >
            <div className="p-inputgroup flex-1 gap-1">
              <Calendar
                disabled={item.flag === "perm" || item.flag === "temp"}
                dateFormat="dd/mm/yy"
                value={item.date ? new Date(item.date) : null}
                onChange={(e) =>
                  handleChange(
                    index,
                    "date",
                    e.value ? e.value.toISOString() : ""
                  )
                }
                placeholder="Date"
              />
              <InputNumber
                disabled={item.flag === "perm" || item.flag === "temp"}
                style={{ borderRadius: "10px" }}
                value={item.number}
                onChange={(e) => handleChange(index, "number", e.value)}
                placeholder="mg/dl"
              />
              <Button
                disabled={item.flag === "perm"}
                icon="pi pi-trash"
                style={{ borderRadius: "10px" }}
                className="p-button-danger"
                onClick={() => removeItem(index)}
              />
              {/* <Button
                onClick={addItem}
                icon="pi pi-plus"
                style={{ borderRadius: "10px" }}
                className="p-button-success"
              /> */}
            </div>
          </div>
        ))}
        <button
          type="button"
          className="p-button p-component"
          style={{
            marginTop: "5px",
            marginBottom: "5px",
            width: "100%",
            backgroundColor: "#219C90",
            color: "#fff",
            padding: "15px",
            display: "flex",
            justifyContent: "center",
            borderRadius: "5px",
          }}
          onClick={addItem}
        >
          Add Previous Values
        </button>
      </div>
    </div>
  );
};

export default GraphValues;
