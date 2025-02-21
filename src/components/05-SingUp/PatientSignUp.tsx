import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router";
import PatientSigupForm from "../../pages/PatientSigupForm/PatientSigupForm";
import { chevronBack } from "ionicons/icons";

const PatientSignUp = () => {
  const history = useHistory();
  const [presentation, setPresentation] = useState("date");
  return (
    <IonPage>
      {/* <IonHeader mode="ios">
        <IonToolbar className="pt-1 pb-1" mode="ios">
          <IonButtons
            onClick={() => {
              history.goBack();
            }}
            slot="start"
          >
            <IonBackButton mode="md" defaultHref="/enroll"></IonBackButton>
          </IonButtons>
          <IonTitle>Patient SignUp</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonContent>
        <div className="KnowAboutPatient medpredit-page-background" style={{ height: "100vh", overflow: "auto" }}  >
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
              onClick={() => history.goBack()}
              icon={chevronBack}
            ></IonIcon>
            <span>
              Patient SignUp
            </span>
            <span></span>
          </div>
          <PatientSigupForm />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PatientSignUp;
