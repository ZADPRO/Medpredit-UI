import { IonAccordion, IonAccordionGroup, IonContent, IonItem, IonLabel } from "@ionic/react";
import React from "react";

const DietaryInfo = () => {
    return (
        <IonContent className="ion-padding">
            <IonAccordionGroup>
                <IonAccordion value="first">
                    <IonItem slot="header" color="light">
                        <IonLabel className="font-bold">
                            Why Dietary assessment is important for prevention and control of Non Communicable diseases?
                        </IonLabel>
                    </IonItem>
                    <div className="" slot="content">
                        <IonItem>
                            <p className="font-bold">Dietary assessment plays a crucial role in controlling non-communicable diseases (NCDs) for several reasons:</p>
                        </IonItem>
                        <IonItem>
                            <IonLabel style={{ textAlign: "justify" }}>
                                <ul>
                                    <li>
                                        <b>Identifying Risk Factors:</b> Poor dietary habits, such as high intake of sugar, salt, and unhealthy fats, are major contributors to NCDs like diabetes, cardiovascular diseases, and certain cancers. Assessing dietary patterns helps identify these risk factors early.
                                    </li>
                                    <li>
                                        <b>Personalized Interventions:</b> By understanding an individual's dietary habits, healthcare providers can design tailored interventions to promote healthier eating patterns, reducing the risk of NCDs.
                                    </li>
                                    <li>
                                        <b>Monitoring Progress:</b> Regular dietary assessments allow for tracking changes in eating habits over time, ensuring that interventions are effective and sustainable.
                                    </li>
                                    <li>
                                        <b>Public Health Strategies:</b> On a larger scale, dietary assessments provide data to inform public health policies and programs aimed at improving population-wide nutrition and reducing the burden of NCDs.
                                    </li>
                                    <li>
                                        <b>Education and Awareness:</b> Assessments can highlight gaps in knowledge about healthy eating, enabling targeted education campaigns to encourage better dietary choices.
                                    </li>
                                </ul>
                            </IonLabel>
                        </IonItem>
                    </div>
                </IonAccordion>
            </IonAccordionGroup>
        </IonContent>
    );
};

export default DietaryInfo;
