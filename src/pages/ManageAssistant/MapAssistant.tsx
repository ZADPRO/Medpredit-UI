import {
  IonAccordion,
  IonAccordionGroup,
  IonAlert,
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
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
import { useHistory, useParams } from "react-router";
import decrypt from "../../helper";
import { chevronBack } from "ionicons/icons";

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
              hospitalId: localStorage.getItem("hospitalId")
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

  const history = useHistory();

  return (
    <IonPage>
      {/* <IonHeader mode="ios">
        <IonToolbar className="pt-1 pb-1" mode="ios">
          <IonButtons slot="start">
            <IonBackButton mode="md" defaultHref="/configure"></IonBackButton>
          </IonButtons>
          <IonTitle>Map Assistant</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonHeader>
        <IonToolbar>
          <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                background: "#fff",
                alignItems: "center",
                width: "100%",
                height:"8vh",
                fontSize: "1.2rem",
                fontWeight: "600",
                padding: "1rem",
                borderBottom: "1px solid #0c436c"
              }}
            >
              <span> <IonIcon
                size="large"
                onClick={() => history.goBack()}
                icon={chevronBack}
              ></IonIcon></span>
              <span style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}><div style={{ fontSize: "1rem" }}>{assistantName}</div>
                <div style={{ fontSize: "0.8rem" }}>{assistantCustId}</div></span>
              <span></span>
            </div>
        </IonToolbar>
      </IonHeader>
      <IonContent >
        <div className="KnowAboutPatient medpredit-page-background" style={{ height: "92vh", overflow: "auto" }}  >
          <div >
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

            {/* <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "1rem",
                fontWeight: "600",
                margin: "1rem",
              }}

            >
              <IonIcon
                size="large"
                onClick={() => history.goBack()}
                icon={chevronBack}
              ></IonIcon>
              <span>
                <div style={{ fontSize: "1rem" }}>{assistantName}</div>
                <div style={{ fontSize: "0.8rem" }}>{assistantCustId}</div>
              </span>
              <span></span>
            </div> */}

            <div className="ion-padding">
              <div
                style={{
                  display: "flex",
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
                  <div
                    className="questionsbuttonGroup_01"
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <button
                      style={{ width: "48%" }}
                      className={`questionsTextOptions_01 ${activeStatus === "active" ? "selected" : ""
                        }`}
                      onClick={() => {
                        handleActiveStatus("active", assistantId);
                      }}
                    >
                      Active
                    </button>
                    <button
                      style={{ width: "48%" }}
                      className={`questionsTextOptions_01 ${activeStatus === "inactive" ? "selected" : ""
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
              <div style={{ marginTop: "20px", display: "flex", gap: "10px", justifyContent: "center", alignItems: "center", width: "100%" }}>
                <IonAccordionGroup style={{ width: "100%", paddingBottom: "10px", display: "flex", gap: "10px", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                  <IonAccordion value="first" style={{ background: "transparent" }}>
                    <IonItem slot="header" color="dark" >
                      <IonLabel>Mapped Doctors</IonLabel>
                    </IonItem>
                    <div className="ion-padding" slot="content">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                          color: "#10416a",
                          fontSize: "0.9rem",
                          textAlign: "center"
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
                                    background: "#e1f3fd",
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
                                      justifyContent: "center",
                                      alignItems: "start",
                                      flexDirection: "column",
                                      gap: "5px",
                                      color: "#10416a"
                                    }}
                                  >
                                    <div style={{ fontSize: "1rem" }}>{element.doctorname}</div>
                                    <div style={{ fontSize: "0.8rem" }}>{element.refUserCustId}</div>
                                  </div>
                                </div>
                              </>
                            ) : null}
                          </>
                        ))}
                      </div>
                    </div>
                  </IonAccordion>
                  <IonAccordion value="second" style={{ background: "transparent" }}>
                    <IonItem slot="header" color="dark" >
                      <IonLabel>Unmapped Doctors</IonLabel>
                    </IonItem>
                    <div className="ion-padding" slot="content">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                          color: "#10416a",
                          fontSize: "0.9rem",
                          textAlign: "center"
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
                                    background: "#e1f3fd",
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
                                      justifyContent: "center",
                                      alignItems: "start",
                                      gap: "5px",
                                      color: "#10416a"
                                    }}
                                  >
                                    <div style={{ fontSize: "1rem" }}>{element.doctorname}</div>
                                    <div style={{ fontSize: "0.8rem" }}>{element.refUserCustId}</div>
                                  </div>
                                  <div
                                    className="questionsbuttonGroup_01"
                                    style={{
                                      fontSize: "1rem",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <button
                                      className="questionsTextOptions_01 selected"
                                      onClick={() => {
                                        setModel(true);
                                        setMapId(element.refUserId);
                                      }}
                                      style={{
                                        width: "100%",
                                        height: "2rem",
                                        borderRadius: "5px",
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
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MapAssistant;
