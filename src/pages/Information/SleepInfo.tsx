import { IonContent } from "@ionic/react";
import React from "react";

const SleepInfo = () => {
  return (
    <IonContent className="ion-padding">
      <div>
            <span>Sleep disturbances can cause non-communicable diseases (NCDs)</span>
            <ul>
              <li><b>Heart disease:</b> Sleep deficiency is linked to a higher risk of heart disease. </li>
              <li><b>Stroke:</b> Sleep deficiency is linked to a higher risk of stroke. </li>
              <li><b>Diabetes:</b> Sleep deficiency is linked to a higher risk of diabetes.</li>
              <li><b>High blood pressure:</b> Sleep deficiency is linked to a higher risk of high blood pressure.</li>
              <li><b>Kidney disease:</b> Sleep deficiency is linked to a higher risk of kidney disease.</li>
              <li><b>Depression:</b> Sleep deficiency is linked to a higher risk of depression.</li>
              <li><b>Mental health:</b> Sleep disorders can affect mental health.</li>
              <li><b>Suicidal thoughts and behaviour:</b> Ongoing insomnia can raise the risk of suicidal thoughts and behaviour. </li>
            </ul>
            <span>Sleep disorders can also impact your quality of life. They can make it hard to focus and pay attention, which can impact driving safety, workplace errors.</span>

        </div>
    </IonContent>
  );
};

export default SleepInfo;
