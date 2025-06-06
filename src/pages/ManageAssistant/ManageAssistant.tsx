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
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import React, { useEffect, useState } from "react";
import decrypt from "../../helper";
import axios from "axios";
import { IoChevronForward } from "react-icons/io5";
import { InputText } from "primereact/inputtext";
import { useHistory } from "react-router";
import { chevronBack } from "ionicons/icons";
import SearchInput from "../FieldInputs/SearchInput";

const ManageAssistant = () => {
  const tokenString: any = localStorage.getItem("userDetails");
  const tokenObject = JSON.parse(tokenString);
  const token = tokenObject.token;

  const [usersList, setUsersList] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search state
  const [loadingStatus, setLoadingStatus] = useState<boolean>(true);

  useEffect(() => {
    if (tokenString) {
      try {
        axios
          .post(
            `${import.meta.env.VITE_API_URL}/getUserList`,
            {
              roleId: localStorage.getItem("createRoleId"),
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

            console.log(data)

            if (data.status) {
              setUsersList(data.userList);
            }
          });
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
      setLoadingStatus(false);
    }
  }, []);

  // Filter users based on search input
  const filteredUsers = usersList.filter(
    (user: any) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.refUserCustId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const history = useHistory();

  return (
    <IonPage>
      {/* <IonHeader mode="ios">
        <IonToolbar className="pt-1 pb-1" mode="ios">
          <IonButtons slot="start">
            <IonBackButton mode="md" defaultHref="/configure"></IonBackButton>
          </IonButtons>
          <IonTitle>Manage Assistant</IonTitle>
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
        <>
          <IonHeader>
            <IonToolbar>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  background: "#fff",
                  alignItems: "center",
                  width: "100%",
                  fontSize: "1.2rem",
                  height: "8vh",
                  fontWeight: "600",
                  padding: "1rem",
                  borderBottom: "1px solid #0c436c"
                }}
              >
                <span><IonIcon
                  size="large"
                  onClick={() => {
                    history.goBack();
                  }}
                  icon={chevronBack}
                ></IonIcon></span>
                <span>Manage Assistant</span>
                <span></span>
              </div>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <div className="KnowAboutPatient medpredit-page-background" style={{ height: "92vh", overflow: "auto" }}  >
              {/* <div
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
                <span>
                  Manage Assistant
                </span>
                <span></span>
              </div> */}



              <div className="ion-padding">

                <SearchInput
                  type="text"
                  placeholder="Enter Name or ID"
                  value={searchTerm}
                  className="gradientBackground02_opacity"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onClear={() => { setSearchTerm("") }}
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
                          background: "#badff1",
                          padding: "10px",
                          borderRadius: "10px",
                          fontWeight: "700",
                          gap: "10px",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                        className="ion-activatable ripple-parent rectangle"
                        onClick={() => {
                          history.push(
                            `/mapAssistant/${element.code}/${element.name}/${element.refUserCustId}`,
                            {
                              direction: "forward",
                              animation: "slide",
                            }
                          );
                        }}
                      >
                        <IonRippleEffect></IonRippleEffect>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "5px",
                          }}
                        >
                          <div>{element.name}</div>
                          <div>{element.refUserCustId}</div>
                        </div>
                        <div
                          style={{
                            fontSize: "1.4rem",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <IoChevronForward />
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
        </>
      )}
    </IonPage>
  );
};

export default ManageAssistant;
