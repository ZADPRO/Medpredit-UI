import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
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

const MangeDoctor = () => {
  const tokenString: any = localStorage.getItem("userDetails");
  const tokenObject = JSON.parse(tokenString);
  const token = tokenObject.token;

  const [usersList, setUsersList]: any = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search state

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
      <IonHeader mode="ios">
        <IonToolbar className="pt-1 pb-1" mode="ios">
          <IonButtons slot="start">
            <IonBackButton mode="md" defaultHref="/configure"></IonBackButton>
          </IonButtons>
          <IonTitle>Manage Doctor</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IconField iconPosition="left" style={{ width: "100%" }}>
          <InputIcon className="pi pi-search"> </InputIcon>
          <InputText
            placeholder="Search"
            style={{ width: "100%" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </IconField>
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
                    gap: "5px",
                    width: "100%",
                  }}
                >
                  <div>{element.name}</div>
                  <div>{element.refUserCustId}</div>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <button
                      style={{ width: "48%" }}
                      className={`optionButton ${
                        element.activeStatus === "active" ? "selected" : ""
                      }`}
                      onClick={() => {
                        handleActiveStatus(index, "active", element.Id);
                      }}
                    >
                      Active
                    </button>
                    <button
                      style={{ width: "48%" }}
                      className={`optionButton ${
                        element.activeStatus === "inactive" ? "selected" : ""
                      }`}
                      onClick={() => {
                        handleActiveStatus(index, "inactive", element.Id);
                      }}
                    >
                      Inactive
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No results found</div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MangeDoctor;
