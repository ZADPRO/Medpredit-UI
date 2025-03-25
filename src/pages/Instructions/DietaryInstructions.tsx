import { IonContent } from "@ionic/react";

const DietaryInsTructions = () => {
    return (
        <IonContent className="ion-padding">
            <div>
                <div>
                    I am going to assess your dietary risk pattern.
                </div>
                <ul>
                    <li><b>Step - 1: </b>Read</li>
                    <div style={{ padding: "10px 0px" }}>Now read/listen to the questions</div>
                    <li><b>Step - 2: </b>Recall</li>
                    <div style={{ padding: "10px 0px" }}>Recall how frequently you had that particular food category in your meal  for the past 15 days</div>
                    <li><b>Step - 3: </b> Choose the choices for the questions </li>
                </ul>
            </div>
        </IonContent>
    );
};

export default DietaryInsTructions;
