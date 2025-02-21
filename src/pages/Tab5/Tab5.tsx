import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Tab5.css";
import {
  IonAccordion,
  IonAccordionGroup,
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonRippleEffect,
  IonSegment,
  IonSegmentButton,
  IonSegmentContent,
  IonSegmentView,
  IonTitle,
  IonToolbar,
  SegmentValue,
} from "@ionic/react";
import diabetesNew from "../../assets/images_new/DIABETES-05.png";
import hypertensionNew from "../../assets/images_new/Hypertension.png";
import coronaryDiseaseNew from "../../assets/images_new/Coronary_Heart_Disease.png";
import strokeNew from "../../assets/images_new/Stroke.png";
import KnowDisease from "../KnowDisease/KnowDisease";

const Tab5: React.FC = () => {
  const [selectedSegment, setSelectedSegment] =
    useState<SegmentValue>("questions");
  const history = useHistory();

  const handleAddClick = () => {
    if (selectedSegment === "questions") {
      history.push("/addQuestions");
    } else if (selectedSegment === "employee") {
      history.push("/addEmployee");
    }
  };

  const [activeDisease, setActiveDisease] = useState<string>("Diabetes");

  useEffect(() => {
    console.log(activeDisease);
  }, [activeDisease]);

  return (
    <IonPage>
      {/*
      <IonContent fullscreen>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              width: "100%",
              height: "170px",
              justifyContent: "center",
              padding: "0px 10px",
              marginTop: "10px",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "48%",
                height: "80px",
                background:
                  activeDisease === 1
                    ? "linear-gradient(160deg, #077556, #2f9f97)"
                    : "#e6e6e6",

                borderRadius: "10px",
                padding: "10px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                color: activeDisease === 1 ? "#fff" : "#000",
              }}
              onClick={() => {
                setActiveDisease(1);
              }}
              className="ion-activatable ripple-parent rectangle"
            >
              <IonRippleEffect></IonRippleEffect>
              <img
                src={activeDisease != 1 ? diabetesImg : diabetesWhite}
                width={70}
              />
              <div
                style={{
                  width: "70%",
                  padding: "10px",
                  fontSize: "14px",
                  fontWeight: "700",
                  textAlign: "center",
                }}
              >
                Diabetes
              </div>
            </div>
            <div
              style={{
                width: "48%",
                height: "80px",
                borderRadius: "10px",
                padding: "10px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                background:
                  activeDisease === 2
                    ? "linear-gradient(160deg, #077556, #2f9f97)"
                    : "#e6e6e6",
                color: activeDisease === 2 ? "#fff" : "#000",
              }}
              onClick={() => {
                setActiveDisease(2);
              }}
              className="ion-activatable ripple-parent rectangle"
            >
              <IonRippleEffect></IonRippleEffect>
              <img
                src={activeDisease != 2 ? hypertension : hypertensionWhite}
                width={60}
              />
              <div
                style={{
                  width: "70%",
                  padding: "10px",
                  fontSize: "14px",
                  fontWeight: "700",
                  textAlign: "center",
                }}
              >
                Hypertension
              </div>
            </div>
            <div
              style={{
                width: "48%",
                height: "80px",
                borderRadius: "10px",
                padding: "10px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                background:
                  activeDisease === 3
                    ? "linear-gradient(160deg, #077556, #2f9f97)"
                    : "#e6e6e6",
                color: activeDisease === 3 ? "#fff" : "#000",
              }}
              onClick={() => {
                setActiveDisease(3);
              }}
              className="ion-activatable ripple-parent rectangle"
            >
              <IonRippleEffect></IonRippleEffect>
              <img
                src={activeDisease != 3 ? coronary : coronaryWhite}
                width={60}
              />
              <div
                style={{
                  width: "70%",
                  padding: "10px",
                  fontSize: "14px",
                  fontWeight: "700",
                  textAlign: "center",
                }}
              >
                Coronary Artery Disease
              </div>
            </div>
            <div
              style={{
                width: "48%",
                height: "80px",
                background:
                  activeDisease === 4
                    ? "linear-gradient(160deg, #077556, #2f9f97)"
                    : "#e6e6e6",
                borderRadius: "10px",
                padding: "10px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                color: activeDisease === 4 ? "#fff" : "#000",
              }}
              onClick={() => {
                setActiveDisease(4);
              }}
              className="ion-activatable ripple-parent rectangle"
            >
              <IonRippleEffect></IonRippleEffect>
              <img src={activeDisease != 4 ? stroke : strokeWhite} width={60} />
              <div
                style={{
                  width: "70%",
                  padding: "10px",
                  fontSize: "14px",
                  fontWeight: "700",
                  textAlign: "center",
                }}
              >
                Stroke
              </div>
            </div>
          </div>
        </div>
        <div style={{ padding: "10px", marginTop: "5px" }}>
          {activeDisease === 1 ? (
            <>
              <Diabetes />
            </>
          ) : activeDisease === 2 ? (
            <>
              <Hypertension />
            </>
          ) : activeDisease === 3 ? (
            <>
              <Coronary />
            </>
          ) : activeDisease === 4 ? (
            <>
              <Stroke />
            </>
          ) : null}
        </div>
      </IonContent> */}




      <IonContent fullscreen>
        <div className="tab5 medpredit-page-background">
          <div className="tab5TopDiv">
            <h2
              style={{
                margin: "0",
                fontSize: "1.2rem",
                textAlign: "center",
                color: "#0c436c"
              }}>
              Know About Disease
            </h2>
            <div className="tab5IonSegment">
              <IonSegment scrollable={true} onIonChange={(e) => setActiveDisease(e.detail.value as string)} mode="md" value={activeDisease}>
                <IonSegmentButton value="Diabetes" contentId="1">
                  <IonLabel>Diabetes</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="Hypertension" contentId="2">
                  <IonLabel>Hypertension</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="Coronary Artery Disease" contentId="3">
                  <IonLabel>Coronary Artery Disease</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="Stroke" contentId="4">
                  <IonLabel>Stroke</IonLabel>
                </IonSegmentButton>
              </IonSegment>
            </div>

            <div className="tab5IonSegmentView">
              <IonSegmentView>
                <IonSegmentContent id="1" hidden={activeDisease !== "Diabetes"}>
                  <img src={diabetesNew} />
                  <h1
                    style={{
                      margin: "0",
                      fontSize: "2rem",
                      color: "white",
                      marginRight: "auto",
                      paddingLeft: "1.5rem",
                      paddingBottom: "1rem"
                    }}>
                    Diabetes
                  </h1>
                </IonSegmentContent>
                <IonSegmentContent id="2" hidden={activeDisease !== "Hypertension"}>
                  <img src={hypertensionNew} />
                  <h1
                    style={{
                      margin: "0",
                      fontSize: "2rem",
                      color: "white",
                      marginRight: "auto",
                      paddingLeft: "1.5rem",
                      paddingBottom: "1rem"
                    }}>
                    Hypertension
                  </h1>
                </IonSegmentContent>
                <IonSegmentContent id="3" hidden={activeDisease !== "Coronary Artery Disease"}>
                  <img src={coronaryDiseaseNew} />
                  <h1
                    style={{
                      margin: "0",
                      fontSize: "1.5rem",
                      color: "white",
                      marginRight: "auto",
                      paddingLeft: "1.5rem",
                      paddingBottom: "1rem"
                    }}>
                    Coronary Artery Disease
                  </h1>
                </IonSegmentContent>
                <IonSegmentContent id="4" hidden={activeDisease !== "Stroke"}>
                  <img src={strokeNew} />
                  <h1
                    style={{
                      margin: "0",
                      fontSize: "2rem",
                      color: "white",
                      marginRight: "auto",
                      paddingLeft: "1.5rem",
                      paddingBottom: "1rem"
                    }}>
                    Stroke
                  </h1>
                </IonSegmentContent>
              </IonSegmentView>
            </div>
          </div>


          <div style={{ margin: "1rem 1.5rem 0 1.5rem", overflow: "scroll", height: "35vh" }}>
            {activeDisease ? <KnowDisease activeDisease={activeDisease} /> : null}
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab5;