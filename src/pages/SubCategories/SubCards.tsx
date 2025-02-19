import { IonAlert, IonRippleEffect } from "@ionic/react";
import { Divider } from "primereact/divider";
import React, { useState } from "react";
import { useHistory } from "react-router";
import Axios from "axios";
import decrypt from "../../helper";

import physical from "../../assets/images/physical.png";
import stress from "../../assets/images/stress.png";
import tobacco from "../../assets/images/tobacco.png";
import alcohol from "../../assets/images/alcohol.png";
import dietry from "../../assets/images/DIATERY-01.png";
import bmi from "../../assets/images/bmi.png";
import sleep from "../../assets/images/sleep.png";
import familyhistory from "../../assets/images/familyhistory.png";
import { ScoreVerify } from "../../ScoreVerify";
import fastingtotal from "../../assets/images/FASTING_CHOLOSTROL.png";
import triglycerides from "../../assets/images/triglycerides.png";
import hdlcholestrol from "../../assets/images/HDL.png";
import ldlcholestrol from "../../assets/images/LDL.png";
import tchdl from "../../assets/images/HDL_TC_RATIO.png";
import bloodurea from "../../assets/images/BLOOD_UREA.png";
import serum from "../../assets/images/SERUM.png";
import egfr from "../../assets/images/EGFR.png";
import urine from "../../assets/images/URINE.png";
import usg from "../../assets/images/USG.png";
import rbs from "../../assets/images/RBS.png";
import fbs from "../../assets/images/FBS.png";
import ppbs from "../../assets/images/PPBS.png";
import ogtt from "../../assets/images/OGTT.png";
import gct from "../../assets/images/GCT.png";
import hba1c from "../../assets/images/HBA1c.png";

//
import physicalNew from "../../assets/logo_new/Physical Activity.svg";
import stressNew from "../../assets/logo_new/Stress.svg";
import tobaccoNew from "../../assets/logo_new/Tobacco.svg";
import alcoholNew from "../../assets/logo_new/Alcohol.svg";
import dietryNew from "../../assets/logo_new/Dietary.svg";
import bmiNew from "../../assets/logo_new/BMI.svg";
import sleepNew from "../../assets/logo_new/Sleep.svg";
import familyhistoryNew from "../../assets/logo_new/Family History.svg";
import { ScoreSlider } from "./ScoreSlider";
//

interface CardData {
  refQCategoryId: number;
  refCategoryLabel: string;
  refScore?: any;
  refScoreId?: any;
  UserScoreVerify?: any;
}

interface SubCardsProps {
  data: CardData[];
  categoryId: string;
  categroyName: string;
}

const SubCards: React.FC<SubCardsProps> = ({
  data,
  categoryId,
  categroyName,
}) => {
  const history = useHistory();

  const handleCardClick = (cardTitle: any, refCategoryLabel: any) => {
    history.push(`/questions/${refCategoryLabel}/${cardTitle}`);
  };

  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const [selectedData, setSelectedData] = useState({
    cardTitle: "",
    refCategoryLabel: 0,
    refScoreId: "",
    refQCategoryId: 0,
  });

  const getImage = (refQCategoryId: number) => {
    switch (refQCategoryId) {
      case 8:
        return physicalNew;
      case 9:
        return stressNew;
      case 10:
        return tobaccoNew;
      case 11:
        return alcoholNew;
      case 12:
        return dietryNew;
      case 13:
        return bmiNew;
      case 43:
        return sleepNew;
      case 51:
        return familyhistoryNew;
      case 213:
        return fastingtotal;
      case 214:
        return triglycerides;
      case 215:
        return hdlcholestrol;
      case 216:
        return ldlcholestrol;
      case 217:
        return tchdl;
      case 218:
        return bloodurea;
      case 219:
        return serum;
      case 220:
        return egfr;
      case 221:
        return urine;
      case 222:
        return urine;
      case 223:
        return urine;
      case 224:
        return usg;
      case 202:
        return rbs;
      case 203:
        return fbs;
      case 204:
        return ppbs;
      case 205:
        return ogtt;
      case 206:
        return gct;
      case 207:
        return hba1c;
      default:
        return "https://via.placeholder.com/150";
    }
  };

  const handleremoveScore = () => {
    const tokenString = localStorage.getItem("userDetails");

    if (tokenString) {
      try {
        const tokenObject = JSON.parse(tokenString);
        const token = tokenObject.token;

        Axios.post(
          `${import.meta.env.VITE_API_URL}/resetScore `,
          {
            refPatientId: localStorage.getItem("currentPatientId"),
            refQCategoryId: selectedData.refQCategoryId,
            refHospitalId: localStorage.getItem("hospitalId"),
            employeeId:
              tokenObject.roleType === 1
                ? null
                : localStorage.getItem("currentDoctorId"),
          },
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        ).then((response) => {
          const data = decrypt(
            response.data[1],
            response.data[0],
            import.meta.env.VITE_ENCRYPTION_KEY
          );

          if (data.status) {
            handleCardClick(
              selectedData.refCategoryLabel,
              selectedData.cardTitle
            );
          }
        });
      } catch (error) {
        console.error("Error parsing token:", error);
      }
    } else {
      console.error("No token found in localStorage.");
    }
  };

  return (
    <div className="subCardContents ion-padding-top">
      <IonAlert
        isOpen={isAlertOpen}
        cssClass="custom-alert"
        header="Do you want to re-enter the question?"
        backdropDismiss={false}
        buttons={[
          {
            text: "Yes",
            role: "confirm",
            handler: () => {
              setIsAlertOpen(false);
              handleremoveScore();
            },
            cssClass: "yes-button",
          },
          {
            text: "No",
            role: "cancel",
            handler: () => {},
            cssClass: "no-button",
          },
        ]}
        onDidDismiss={() => setIsAlertOpen(false)}
      />
      <div className="subCardsParent">
        {data.map((card) => (
          <div
            key={card.refQCategoryId}
            className="subCard gradientBackground02_opacity ion-activatable ripple-parent rectangle"
            onClick={() => {
              if (card.refScore === null) {
                handleCardClick(card.refQCategoryId, card.refCategoryLabel);
              } /*else {
                setIsAlertOpen(true);
                setSelectedData({
                  refScoreId: card.refScoreId,
                  refCategoryLabel: card.refQCategoryId,
                  cardTitle: card.refCategoryLabel,
                  refQCategoryId: card.refQCategoryId,
                });
              }*/
            }}
            style={{ cursor: "pointer" }}
          >
            {card.refScore === null ? (<>
            
<IonRippleEffect></IonRippleEffect>
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem"
            }}>
            <img src={getImage(card.refQCategoryId)} alt="Card Thumbnail" />
            <div>
              <div className="subCardHeader">
                <p data-text={card.refCategoryLabel}>
                  {card.refCategoryLabel.split(" ").length === 2
                    ? card.refCategoryLabel.split(" ").join("\n") // Force a line break for two words
                    : card.refCategoryLabel}
                </p>
              </div>
            </div>
            </div></>) : (<>
            <div style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem"
            }}>
            <img src={getImage(card.refQCategoryId)} alt="Card Thumbnail" />
            <div>
              <div className="subCardHeader">
                <p data-text={card.refCategoryLabel}>
                  {card.refCategoryLabel.split(" ").length === 2
                    ? card.refCategoryLabel.split(" ").join("\n") // Force a line break for two words
                    : card.refCategoryLabel}
                </p>
              </div>
            </div>
            </div>
            
            <div className="subCardSliderBar">
                {card.refScore === null ? (
                  <div style={{ color: "#607274" }}>
                    <i
                      className="pi pi-angle-right"
                      style={{ fontSize: "2rem" }}
                    ></i>
                  </div>
                ) : (
                  <ScoreSlider
                    userScoreVerify={card.UserScoreVerify}
                    refScore={card.refScore}
                  />
                )}
              </div></>)}
           {/*} <IonRippleEffect></IonRippleEffect>
            <div style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem"
            }}>
            <img src={getImage(card.refQCategoryId)} alt="Card Thumbnail" />
            <div>
              <div className="subCardHeader">
                <p data-text={card.refCategoryLabel}>
                  {card.refCategoryLabel.split(" ").length === 2
                    ? card.refCategoryLabel.split(" ").join("\n") // Force a line break for two words
                    : card.refCategoryLabel}
                </p>
              </div>
            </div>
            </div>
            
            <div className="subCardSliderBar">
                {card.refScore === null ? (
                  <div style={{ color: "#607274" }}>
                    <i
                      className="pi pi-angle-right"
                      style={{ fontSize: "2rem" }}
                    ></i>
                  </div>
                ) : (
                  <ScoreSlider
                    userScoreVerify={card.UserScoreVerify}
                    refScore={card.refScore}
                  />
                )}
              </div>
            */}

            
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubCards;
