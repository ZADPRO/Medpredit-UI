import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router";
import PatientSigupForm from "../../pages/PatientSigupForm/PatientSigupForm";

const PatientSignUp = () => {
  const history = useHistory();
  const [presentation, setPresentation] = useState("date");
  return (
    <IonPage>
      <IonHeader mode="ios">
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
      </IonHeader>
      <IonContent className="ion-padding">
        <PatientSigupForm />
      </IonContent>
    </IonPage>
  );
};

export default PatientSignUp;
