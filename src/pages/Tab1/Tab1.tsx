import {
  IonContent,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Tab1.css";
import { useEffect, useState } from "react";
import Diabetes from "../KnowDisease/Diabetes";
import AppExitHandler from "../AppExitHandler/AppExitHandler";

const Tab1: React.FC = () => {


  return (
    <IonPage>
      <AppExitHandler />
      <IonContent fullscreen>
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>Home - Coming Soon</h1>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
