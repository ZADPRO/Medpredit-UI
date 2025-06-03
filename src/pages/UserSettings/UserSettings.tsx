import { IonContent, IonHeader, IonIcon, IonPage, IonToolbar } from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import React from "react";
import { useHistory } from "react-router";

const UserSettings = () => {
  const history = useHistory();

  const savedUserData = localStorage.getItem("userProfileData");
  const parsedUserData = savedUserData ? JSON.parse(savedUserData) : null;

  const settingOptions = [
    {
      optionID: 1,
      title: "Change Phone Number",
      path: "/changePhoneNumber"
    },
    {
      optionID: 2,
      title: "Change Password",
      path: "/changePassword1"
    },
  ];

  return (
    <IonPage>
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
            <span>Profile</span>
            <span></span>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div
          style={{ height: "92vh", width: "100vw" }}
          className="KnowAboutPatient medpredit-page-background"
        >
          {/* <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "1.2rem",
              fontWeight: "600",
              margin: "1rem 1rem 0 1rem",
            }}
          >
            <IonIcon
              size="large"
              onClick={() => {
                history.goBack();
              }}
              icon={chevronBack}
            ></IonIcon>
            <span
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                whiteSpace: "nowrap",
              }}
            >
              Profile
            </span>
            <span></span>
          </div> */}

          <div
            style={{
              padding: "2rem",
              color: "#1865b5",
            }}
          >
            <h2>Hi, {parsedUserData?.name}</h2>
            <div style={{ padding: "0 1rem" }}>
              {settingOptions.map((option) => (
                <div
                  key={option.optionID}
                  onClick={() => {
                    history.push(`${option.path}`, {
                      direction: "forward",
                      animation: "slide",
                    });
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <p style={{
                    textDecoration: "underline"
                  }}>{option.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default UserSettings;
