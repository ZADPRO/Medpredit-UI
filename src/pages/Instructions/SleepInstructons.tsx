import { IonContent } from "@ionic/react";
import React from "react";

const SleepInstructons = () => {
  return (
    <IonContent className="ion-padding">
      <div>
        <ul>
          <li>The following questions relate to your usual sleep habits during the{" "}
          <u>past month only</u>. Your answers should indicate the most accurate
          reply for the <u>majority</u> of days and nights in the past month.{" "}
          </li>

          <li>
          <b>Please answer all questions</b>.
          </li>
        </ul>
      </div>
    </IonContent>
  );
};

export default SleepInstructons;
