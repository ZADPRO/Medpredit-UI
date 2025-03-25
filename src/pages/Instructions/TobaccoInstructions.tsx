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
import React from "react";

const TobaccoInstructions: React.FC = () => {
  return (
      <IonContent className="ion-padding">
        <IonAccordionGroup>
          <IonAccordion value="first">
            <IonItem slot="header" color="light">
              <IonLabel className="font-bold">
                Why Tobacco usage is a major hazard to mankind worldwide?
              </IonLabel>
            </IonItem>
            <div className="" slot="content">
              <IonItem>
                <IonLabel style={{ textAlign: "justify" }}>
                  Tobacco use remains the leading preventable cause of death in
                  the world accounting for about 1 in 5 deaths each year.
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel style={{ textAlign: "justify" }}>
                  {" "}
                  On average, people who smoke die about 10 years earlier than
                  people who have never smoked.
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel style={{ textAlign: "justify" }}>
                  Most people know smoking can cause cancer. But it can also
                  cause a number of other diseases and can damage nearly every
                  organ in the body, including the lungs, heart, blood vessels,
                  reproductive organs, mouth, skin, eyes, and bones.
                </IonLabel>
              </IonItem>
            </div>
          </IonAccordion>
        </IonAccordionGroup>
      </IonContent>
    // </IonPage>
  );
};

export default TobaccoInstructions;
