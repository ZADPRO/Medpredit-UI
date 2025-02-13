import {
  IonAccordion,
  IonAccordionGroup,
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import img1 from "../../assets/info/physicalAct1.png";
import img2 from "../../assets/info/physicalAct2.png";
import img3 from "../../assets/info/physicalAct3.png";
import img4 from "../../assets/info/physicalAct4.png";

import React, { useRef } from "react";

const PhysicalInfo: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="" mode="ios">
          <IonButtons slot="start">
            <IonBackButton
              mode="md"
              defaultHref="questions/Stress/9"
            ></IonBackButton>
          </IonButtons>
          <IonTitle>Physical Activity Info</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div>
          <ul>
            <li>Physical inactivity is a major independent modifiable risk factor for non-communicable diseases (NCDs) such as</li>
            <ul>
              <li>Cardiovascular disease,</li>
              <li>Ischaemic stroke,</li>
              <li>Type 2 diabetes,</li>
              <li>Colon cancer, and Breast cancer.</li>
            </ul>
            <li>It is also associated with other important health outcomes including</li>
            <ul>
              <li>Mental health,</li>
              <li>As well as physical health.</li>
            </ul>
            <li>It is necessary to assess your physical activity and suggest necessary lifestyle modifications so that the Emergence of NCD will be prevented.</li>
          </ul>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PhysicalInfo;
