import {
  IonAccordion,
  IonAccordionGroup,
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const PhysicalInstructions: React.FC = () => {
  return (
    // <IonPage>
    //   <IonHeader>
    //     <IonToolbar className="" mode="ios">
    //       <IonButtons slot="start">
    //         <IonBackButton
    //           mode="md"
    //           defaultHref="questions/Physical%20Activity/8"
    //         ></IonBackButton>
    //       </IonButtons>
    //       <IonTitle>Physical Activity Instructions</IonTitle>
    //     </IonToolbar>
    //   </IonHeader>
      <IonContent className="ion-padding">
        <IonItem lines="none">
          <IonLabel style={{ textAlign: "justify", fontWeight: "bold" }}>
            We are going to assess your Physical Activity using Global Physical
            Activity Questionnaire (GPAQ)
          </IonLabel>{" "}
        </IonItem>

        <IonList inset={true} style={{ margin: "0" }}>
          <IonItem>
            <IonLabel style={{ textAlign: "justify" }}>
              The GPAQ covers several components of physical activity, such as
              intensity, duration, and frequency, and it assesses three domains
              in which physical activity is performed (occupational physical
              activity, transport-related physical activity, and physical
              activity during discretionary or leisure time).
            </IonLabel>
          </IonItem>

        </IonList>
      </IonContent>
    // </IonPage>
  );
};

export default PhysicalInstructions;
