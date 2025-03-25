import axios from "axios";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import React, { useEffect, useState } from "react";
import decrypt from "../../helper";
import { IonAlert, IonDatetime, IonModal } from "@ionic/react";
import ShowCard from "../ShowCard/ShowCard";
import { InputText } from "primereact/inputtext";
import { Divider } from "primereact/divider";
import Domain from "../Domain/Domain";
import { Dropdown } from "primereact/dropdown";

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
    // SubmitActive: (active: boolean) => void;
}

const UrineSugarPrev: React.FC<GraphValuesProps> = ({
    label,
    onEdit,
    // SubmitActive,
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
    >([]);

    const forwardQId = label.options[0]?.forwardQId || "";

    const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);

    const openModal = (index: number) => setOpenModalIndex(index);
    const closeModal = () => setOpenModalIndex(null);

    const handleChange = (
        index: number,
        field: keyof (typeof data)[0],
        value: any
    ) => {
        const updatedData = [...data];
        updatedData[index][field] = value; // Update the specific field
        setData(updatedData);
        // onEdit(label.questionType, updatedData, forwardQId);
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
            setIsAlertOpen({ status: true, id: index.toString() });
        }
        // if (updatedData.length === 0) {
        //   SubmitActive(false);
        // }
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
                            // if (updatedData.length === 0) {
                            //   SubmitActive(false);
                            // }
                        }
                    });
            } catch (error) {
                console.error("Error fetching patient data:", error);
            }
        }
    };

    const addItem = () => {
        const allFieldsFilled = data.every(
            (item) => item.date !== null && item.number !== null
        );

        if (allFieldsFilled) {
            setData([...data, { id: null, date: null, number: null, flag: "ui" }]);
        }
    };

    useEffect(() => {
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
                        const listdata = decrypt(
                            response.data[1],
                            response.data[0],
                            import.meta.env.VITE_ENCRYPTION_KEY
                        );
                        if (listdata.status) {

                            console.log("---->------------>", data)
                            if (listdata.data.length > 0) {
                                if (data.length === 0) {
                                    setData(listdata.data);
                                }
                                // onEdit(label.questionType, data.data, forwardQId);
                            }
                        }
                    });
            } catch (error) {
                console.error("Error fetching patient data:", error);
            }
        }
    }, [localStorage.getItem("testQuestion")]);

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            onEdit(label.questionType, data, forwardQId);
        }}>
            <div className="questions inputText">
                <Domain questionId={label.questionId} />
                <p className="questionText">{label.questionText}</p>

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
                            handler: () => { },
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
                            <div
                                className="p-inputgroup flex-1"
                                style={{
                                    border: "1.5px solid #10416a",
                                    borderRadius: "10px",
                                    marginBottom: "10px",
                                    backgroundColor: item.flag !== "ui" ? "lightblue" : "transparent",
                                }}
                            >
                                <InputText
                                    style={{ padding: "0", textAlign: "center" }}
                                    id="hrsInputLeft"
                                    disabled={item.flag === "perm" || item.flag === "temp"}
                                    value={item.date ? new Date(item.date).toISOString().split("T")[0] : ""}
                                    placeholder="Date"
                                    onClick={() => openModal(index)}
                                    required
                                />

                                <IonModal
                                    isOpen={openModalIndex === index}
                                    id="doctorDetailsGraph"
                                    initialBreakpoint={1}
                                    onDidDismiss={closeModal}
                                    animated={false}
                                >
                                    <div style={{ width: "100%", background: "#effafe" }}>
                                        <IonDatetime
                                            presentation="date"
                                            preferWheel={true}
                                            value={
                                                item.date
                                                    ? new Date(item.date).toISOString().split("T")[0]
                                                    : new Date().toISOString().split("T")[0]
                                            }
                                            onIonChange={(e) => {
                                                const selectedDate = e.detail.value as string; // Cast to string
                                                handleChange(index, "date", selectedDate ? new Date(selectedDate).toISOString() : "");
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
                                                onClick={() => {
                                                    handleChange(index, "date", "");
                                                    closeModal();
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
                                                onClick={() => {
                                                    const finalDate = item.date ? new Date(item.date) : new Date();
                                                    handleChange(index, "date", finalDate.toISOString());
                                                    closeModal();
                                                }}
                                                style={{
                                                    width: "40%",
                                                    background:
                                                        "linear-gradient(27deg, rgba(16, 148, 231, 1) 0%, rgba(7, 117, 197, 1) 100%)",
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
                                <Dropdown
                                    id="hrsInput"
                                    required
                                    value={item.number}
                                    onChange={(e) => handleChange(index, "number", e.value)}
                                    options={[{ label: "Nil 0" }, { label: "1+" }, { label: "2+" }, { label: "3+" }, { label: "4+" }]}
                                    placeholder="Choose Value"
                                    optionLabel="label"
                                    optionValue="label"
                                    disabled={item.flag === "perm" || item.flag === "temp"}
                                />
                                {/* <InputNumber
                                    id="hrsInput"
                                    disabled={item.flag === "perm" || item.flag === "temp"}
                                    style={{ borderRadius: "10px" }}
                                    value={item.number}
                                    onChange={(e) => handleChange(index, "number", e.value)}
                                    placeholder="mg/dl"
                                    required
                                /> */}
                                <div
                                    style={{
                                        width: "10%",
                                        height: "45px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        background: "transparent",
                                    }}
                                >
                                    <button
                                        type="button"
                                        onClick={() => removeItem(index)}
                                        style={{
                                            background: "#10416a",
                                            width: "30px",
                                            height: "30px",
                                            color: "#fff",
                                            borderRadius: "50%",
                                            padding: "5px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <i className="pi pi-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div
                        className="questionsbuttonGroup_01"
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <button
                            type="button"
                            className="p-button p-component questionsTextOptions_01 selected"
                            style={{
                                marginTop: "5px",
                                marginBottom: "5px",
                                width: "80%",
                                backgroundColor: "#219C90",
                                color: "#fff",
                                padding: "15px",
                                display: "flex",
                                justifyContent: "center",
                                borderRadius: "50px",
                            }}
                            onClick={addItem}
                        >
                            Add Previous Values
                        </button>
                    </div>

                    <div style={{ width: "100%", height: "35px", display: "flex", justifyContent: "flex-end", alignItems: "center", background: "transparent", marginTop: "10px" }}>
                        <button type="submit" style={{ background: "#10416a", width: "40px", height: "30px", color: "#fff", borderRadius: "10px", padding: "5px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default UrineSugarPrev;