import { IonContent, IonPage, IonRippleEffect } from "@ionic/react";
import React from "react";

import "./Intro.css";
import { useHistory } from "react-router";

import introImg from "../../assets/images/starting.png";
import introImgSvg from "../../assets/images/starting.svg";

const Intro: React.FC = () => {
  const history = useHistory();

  const handleNavigateSwipe = (route: string) => {
    history.push(route, {
      direction: "forward",
      animation: "slide",
    });
  };

  return (
    <IonPage>
      {/*
      <IonContent fullscreen>
        <div className="loginScreen">
          <img src={introImgSvg} alt="" />
          <div className="loginContents">
            <p className="welcomeIntro">
              Welcome to <span> MEDPREDiT</span>
            </p>
            <p className="description">Thank you for choosing Medpredit !</p>
            <p className="description">
              Using advanced technology and intelligent algorithms, Medpredit
              analyzes your medical data to provide real-time insights into your
              health, conditions, and treatments.
            </p>
            <button
              onClick={() => handleNavigateSwipe("/login")}
              style={{
                width: "90%",
                height: "3rem",
                margin: "5px 0px",
                borderRadius: "5px",
                background: "#1c70b0", // Green for enabled
                color: "#fff", // Lighter text color for disabled
                fontSize: "16px",
                cursor: "pointer", // Change cursor for disabled
              }}
              className="ion-activatable ripple-parent rectangle"
            >
              <IonRippleEffect></IonRippleEffect>
              Get Started
            </button>
          </div>
        </div>
      </IonContent>
      */}

      <IonContent fullscreen>
        <div className="loginScreen">
          <h2>Welcome to </h2>
          <h1 className="Medprit">MEDPREDiT</h1>
          <div className="description">
            <p>Thank you for choosing Medpredit !</p>
            <p>
              Using advanced technology and intelligent algorithms, Medpredit
              analyzes your medical data to provide real-time insights into your
              health, conditions, and treatments.
            </p>
          </div>
          <button

            style={{
              width: "60%",
              height: "3rem",
              margin: "2rem 0rem 0rem 0rem",
              borderRadius: "30px",
              background: "#fff", // Green for enabled
              color: "#31cbff", // Lighter text color for disabled
              fontSize: "20px",
              fontWeight: "bolder",
              cursor: "pointer", // Change cursor for disabled
            }}
            className="ion-activatable ripple-parent rectangle"
          >
            <IonRippleEffect></IonRippleEffect>
            Get Started
          </button>
        </div>
      </IonContent>

    </IonPage>
  );
};

export default Intro;