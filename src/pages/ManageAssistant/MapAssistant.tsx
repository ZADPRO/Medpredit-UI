import {
  IonAccordion,
  IonAccordionGroup,
  IonAlert,
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonRippleEffect,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import decrypt from "../../helper";

const MapAssistant = () => {
  const { assistantId, assistantName, assistantCustId } = useParams<{
    assistantId: string;
    assistantName: string;
    assistantCustId: string;
  }>();

  const tokenString: any = localStorage.getItem("userDetails");
  const tokenObject = JSON.parse(tokenString);
  const token = tokenObject.token;

  const [doctorList, setDoctorList] = useState([]);

  const [load, setLoad] = useState(false);


  const [activeStatus, setActiveStatus] = useState();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    if (tokenString) {
      try {
        axios
          .post(
            `${import.meta.env.VITE_API_URL}/doctorsMapList`,
            {
              assistantId: assistantId,
              hospitalId: localStorage.getItem("hospitalId"),
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
              setDoctorList(data.doctorMapList);
              setActiveStatus(data.userStatus)
            }

            console.log(data);
          });
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
      setLoad(!load);
    }
  };

  const handleAdd = () => {
    if (tokenString) {
      try {
        axios
          .post(
            `${import.meta.env.VITE_API_URL}/addAssistantMap`,
            {
              doctorId: mapId,
              assistantId: assistantId,
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
              setModel(false);
              setMapId("");
              loadData();
            }
          });
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    }
  };

  const [model, setModel] = useState(false);

  const [mapId, setMapId] = useState("");


  const handleActiveStatus = (value: any, doctorId: any) => {
    if (tokenString) {
      try {
        axios
          .post(
            `${import.meta.env.VITE_API_URL}/postActiveStatus`,
            {
              doctorId: doctorId,
              value: value,
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
              loadData();
            }
          });
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    }
  };

  return (
    <IonPage>
      <IonHeader mode="ios">
        <IonToolbar className="pt-1 pb-1" mode="ios">
          <IonButtons slot="start">
            <IonBackButton mode="md" defaultHref="/configure"></IonBackButton>
          </IonButtons>
          <IonTitle>Map Assistant</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <IonAlert
          isOpen={model}
          cssClass="custom-alert"
          header="Are you sure to Map the Doctor?"
          backdropDismiss={false}
          buttons={[
            {
              text: "Yes",
              role: "confirm",
              handler: () => {
                handleAdd();
                setModel(false);
              },
              cssClass: "yes-button",
            },
            {
              text: "No",
              role: "cancel",
              handler: () => {
                setModel(false);
              },
              cssClass: "no-button",
            },
          ]}
          onDidDismiss={() => setModel(false)}
        />

        <div
          style={{
            display: "flex",
            background: "#e6e6e6",
            padding: "10px",
            borderRadius: "5px",
            fontWeight: "700",
            gap: "10px",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div>Name: {assistantName}</div>
            <div>ID: {assistantCustId}</div>


            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <button
                style={{ width: "48%" }}
                className={`optionButton ${activeStatus === "active" ? "selected" : ""
                  }`}
                onClick={() => {
                  handleActiveStatus("active", assistantId);
                }}
              >
                Active
              </button>
              <button
                style={{ width: "48%" }}
                className={`optionButton ${activeStatus === "inactive" ? "selected" : ""
                  }`}
                onClick={() => {
                  handleActiveStatus("inactive", assistantId);
                }}
              >
                Inactive
              </button>
            </div>
          </div>
        </div>
        <div style={{ marginTop: "20px" }}>
          <IonAccordionGroup>
            <IonAccordion value="first">
              <IonItem slot="header" color="light">
                <IonLabel>Mapped Doctors</IonLabel>
              </IonItem>
              <div className="ion-padding" slot="content">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    color: "#000",
                  }}
                >
                  {doctorList.filter((user: any) => user.hasassistant === true)
                    .length === 0 ? (
                    <>No Result Found</>
                  ) : null}
                  {doctorList.map((element: any) => (
                    <>
                      {element.hasassistant ? (
                        <>
                          <div
                            style={{
                              display: "flex",
                              background: "#e6e6e6",
                              padding: "10px",
                              borderRadius: "5px",
                              fontWeight: "700",
                              gap: "10px",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                            className="ion-activatable ripple-parent rectangle"
                          >
                            <IonRippleEffect></IonRippleEffect>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                              }}
                            >
                              <div>Name: {element.doctorname}</div>
                              <div>ID: {element.refUserCustId}</div>
                            </div>
                          </div>
                        </>
                      ) : null}
                    </>
                  ))}
                </div>
              </div>
            </IonAccordion>
            <IonAccordion value="second">
              <IonItem slot="header" color="light">
                <IonLabel>Unmapped Doctors</IonLabel>
              </IonItem>
              <div className="ion-padding" slot="content">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    color: "#000",
                  }}
                >
                  {doctorList.filter((user: any) => user.hasassistant === false)
                    .length === 0 ? (
                    <>No Result Found</>
                  ) : null}
                  {doctorList.map((element: any) => (
                    <>
                      {!element.hasassistant ? (
                        <>
                          <div
                            style={{
                              display: "flex",
                              background: "#e6e6e6",
                              padding: "10px",
                              borderRadius: "5px",
                              fontWeight: "700",
                              gap: "10px",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                              }}
                            >
                              <div>Name: {element.doctorname}</div>
                              <div>ID: {element.refUserCustId}</div>
                            </div>
                            <div
                              style={{
                                fontSize: "1rem",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <button
                                onClick={() => {
                                  setModel(true);
                                  setMapId(element.refUserId);
                                }}
                                style={{
                                  width: "100%",
                                  height: "2rem",
                                  borderRadius: "5px",
                                  background:
                                    "linear-gradient(160deg, #077556, #2f9f97)",
                                  color: "#fff",
                                  fontSize: "16px",
                                  cursor: "pointer",
                                  padding: "0px 5px",
                                }}
                              >
                                Map
                              </button>
                            </div>
                          </div>
                        </>
                      ) : null}
                    </>
                  ))}
                </div>
              </div>
            </IonAccordion>
          </IonAccordionGroup>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MapAssistant;
