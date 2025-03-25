import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonRippleEffect,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import decrypt from "../../helper";
import axios from "axios";
import { useHistory } from "react-router";
import SearchInput from "../FieldInputs/SearchInput";
import { chevronBack } from "ionicons/icons";
import DoctorLogo from "../../assets/logo_new/Doctor.png";

const MangeDoctor = () => {
  const history = useHistory();
  const tokenString: any = localStorage.getItem("userDetails");
  const tokenObject = JSON.parse(tokenString);
  const token = tokenObject.token;

  const [usersList, setUsersList]: any = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search state
  const [loadingStatus, setLoadingStatus] = useState<boolean>(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    if (tokenString) {
      try {
        axios
          .post(
            `${import.meta.env.VITE_API_URL}/getUserList`,
            {
              roleId: "3",
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
              setUsersList(data.userList);

              console.log("====================================");
              console.log(data.userList);
              console.log("====================================");
            }
          });
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    }
    setLoadingStatus(false);
  };

  // Filter users based on search input
  const filteredUsers = usersList.filter(
    (user: any) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.refUserCustId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleActiveStatus = (index: any, value: any, doctorId: any) => {
    if (usersList[index].activeStatus != value) {
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
    }
  };

  return (
    <IonPage>
      {/* <IonHeader mode="ios">
        <IonToolbar className="pt-1 pb-1" mode="ios">
          <IonButtons slot="start">
            <IonBackButton mode="md" defaultHref="/configure"></IonBackButton>
          </IonButtons>
          <IonTitle>Manage Doctor</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      {loadingStatus ? (
        <>
          <IonContent>
            <div
              style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <i
                className="pi pi-spin pi-spinner"
                style={{ fontSize: "2rem", color: "#1a70b0" }}
              ></i>
            </div>
          </IonContent>
        </>
      ) : (
        <IonContent>
          <div
            className="KnowAboutPatient medpredit-page-background"
            style={{ height: "100vh", overflow: "auto" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "1.2rem",
                fontWeight: "600",
                margin: "1rem",
              }}
            >
              <IonIcon
                size="large"
                onClick={() => history.replace("/configure", {
                  direction: "backward",
                  animation: "slide",
                })}
                icon={chevronBack}
              ></IonIcon>
              <span>Manage Doctor</span>
              <span></span>
            </div>

            <div className="ion-padding">
              <SearchInput
                type="text"
                placeholder="Enter Name or ID"
                value={searchTerm}
                className="gradientBackground02_opacity"
                onChange={(e) => setSearchTerm(e.target.value)}
                onClear={() => {
                  setSearchTerm("");
                }}
              />
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((element: any, index: number) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        padding: "10px",
                        fontWeight: "700",
                        gap: "10px",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        borderBottom: "1px solid #21446c",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          width: "75%",
                          gap: "10px",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            width: "50px",
                            height: "50px",
                            backgroundColor: "#a9d5f1",
                            borderRadius: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <img
                            src={DoctorLogo}
                            style={{ width: "30px" }}
                            alt={element.refUserCustId}
                          />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "5px",
                            fontSize: "0.8rem",
                          }}
                        >
                          <div>{element.name}</div>
                          <div>{element.refUserCustId}</div>
                        </div>
                      </div>
                      <div
                        className="questionsbuttonGroup_01"
                        style={{
                          width: "25%",
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "column",
                          gap: "5px",
                        }}
                      >
                        <button
                          style={{
                            width: "100%",
                            padding: "3px",
                            fontSize: "0.7rem",
                            borderRadius: "5px",
                          }}
                          className={`questionsTextOptions_01 ${element.activeStatus === "active" ? "selected" : ""
                            }`}
                          onClick={() => {
                            handleActiveStatus(index, "active", element.Id);
                          }}
                        >
                          Active
                        </button>
                        <button
                          style={{
                            width: "100%",
                            padding: "3px",
                            fontSize: "0.7rem",
                            borderRadius: "5px",
                          }}
                          className={`questionsTextOptions_01 ${element.activeStatus === "inactive"
                              ? "selected"
                              : ""
                            }`}
                          onClick={() => {
                            handleActiveStatus(index, "inactive", element.Id);
                          }}
                        >
                          Inactive
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>No results found</div>
                )}
              </div>
            </div>
          </div>
        </IonContent>
      )}
    </IonPage>
  );
};

export default MangeDoctor;
