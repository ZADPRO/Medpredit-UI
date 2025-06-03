import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./Splashscreen.css";
import { IonContent, IonHeader, IonPage } from "@ionic/react";

import logo1 from "../../assets/logo/icon.svg";
import logo2 from "../../assets/logo/logo.svg";

import BACKGROUND02 from "../../assets/images_new/BACKGROUND-02.jpg";

const Splashscreen: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    const timer = setTimeout(() => {
      const tokenString = localStorage.getItem("userDetails");

      if (tokenString) {
        const tokenObject = JSON.parse(tokenString);
        const roleType = tokenObject.roleType;

        // if (roleType === 1 || roleType === 2 || roleType === 3) {
        //   history.replace("/home");
        // } else {
        //   history.replace("/login");
        // }

        if (roleType !== 1 || roleType !== 2 || roleType !== 3 || roleType !== 4 || roleType !== 5) {
          if (roleType === 5) {
            history.replace("/configure");
          } else {
            history.replace("/home");
          }
        } else {
          history.replace("/login");
        }

      } else {
        history.replace("/login");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [history]);

  return (
    <IonPage>
      {/*<IonContent>
        <div className="splashScreenContents ion-padding-start ion-padding-end">
          <img src={logo2} alt="" />
          {/* <p>MEDPREDiT</p> */
      /*}
        </div>
      </IonContent>*/}
      <IonHeader></IonHeader>

      <IonContent>
        {/* style={{ backgroundImage: `url(${BACKGROUND02})` }} */}
        <div className="splashScreenContents ion-padding-start ion-padding-end">
          <img src={logo2} alt="" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Splashscreen;
