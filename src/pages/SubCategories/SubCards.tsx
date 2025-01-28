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

interface CardData {
  refQCategoryId: number;
  refCategoryLabel: string;
  refScore?: any;
  refScoreId?: any;
  UserScoreVerify?: any;
  refPTcreatedDate?: any;
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

  function calculateDaysDifference(dateString: any) {
    // Convert the given date string to a Date object
    const givenDate: any = new Date(dateString);

    // Get the current date and set time to midnight for accurate day difference
    const currentDate: any = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // Calculate the difference in milliseconds
    const diffInMs = givenDate - currentDate;

    // Convert milliseconds to days
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    return diffInDays;
  }

  function addDaysToDate(isoDate: string, daysToAdd: number): string {
    const date = new Date(isoDate);
    date.setDate(date.getDate() + daysToAdd);
    return date.toISOString().split("T")[0]; // Return only YYYY-MM-DD format
  }

  const getValidity = (refQCategoryId: number) => {
    switch (refQCategoryId) {
      case 8:
        return 14;
      case 9:
        return 14;
      case 10:
        return 14;
      case 11:
        return 14;
      case 12:
        return 14;
      case 13:
        return 14;
      case 43:
        return 14;
      case 51:
        return 14;
      case 202:
        return 1;
      case 203:
        return 1;
      case 204:
        return 1;
      case 205:
        return 1;
      case 206:
        return 1;
      case 207:
        return 1;
      case 213:
        return 1;
      case 214:
        return 1;
      case 215:
        return 1;
      case 216:
        return 1;
      case 217:
        return 1;
      case 218:
        return 1;
      case 219:
        return 1;
      case 220:
        return 1;
      case 221:
        return 1;
      case 222:
        return 1;
      case 223:
        return 1;
      case 224:
        return 1;
      default:
        return 0;
    }
  };

  const getImage = (refQCategoryId: number) => {
    switch (refQCategoryId) {
      case 8:
        return physical;
      case 9:
        return stress;
      case 10:
        return tobacco;
      case 11:
        return alcohol;
      case 12:
        return dietry;
      case 13:
        return bmi;
      case 43:
        return sleep;
      case 51:
        return familyhistory;
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
      {data.map((card) => (
        <div key={card.refQCategoryId}>
          {card.refPTcreatedDate &&
          getValidity(card.refQCategoryId) >=
            -calculateDaysDifference(card.refPTcreatedDate) ? (
            <div
              className="ion-activatable ripple-parent rectangle"
              style={{ cursor: "pointer" }}
            >
              <IonRippleEffect></IonRippleEffect>
              <div className="subCards">
                <img src={getImage(card.refQCategoryId)} alt="Card Thumbnail" />
                <div className="cardConts">
                  <div className="cardHeader">
                    <p
                      className="factorHeading"
                      style={{
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#373A40",
                      }}
                    >
                      {card.refCategoryLabel}
                    </p>
                    <div className="circularProgress">
                      {card.refScore === null ? (
                        <div style={{ color: "#607274" }}>
                          <i
                            className="pi pi-angle-right"
                            style={{ fontSize: "2rem" }}
                          ></i>
                        </div>
                      ) : (
                        <ScoreVerify
                          userScoreVerify={card.UserScoreVerify}
                          refScore={card.refScore}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>Taken: {card.refPTcreatedDate.split("T")[0]}</div>
                <div>
                  Valid:{" "}
                  {addDaysToDate(
                    card.refPTcreatedDate,
                    getValidity(card.refQCategoryId)
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div
              className="subCards ion-activatable ripple-parent rectangle"
              onClick={() => {
                // if (card.refScore === null) {
                handleCardClick(card.refQCategoryId, card.refCategoryLabel);
                // }
                // else {
                //   setIsAlertOpen(true);
                //   setSelectedData({
                //     refScoreId: card.refScoreId,
                //     refCategoryLabel: card.refQCategoryId,
                //     cardTitle: card.refCategoryLabel,
                //     refQCategoryId: card.refQCategoryId,
                //   });
                // }
              }}
              style={{ cursor: "pointer" }}
            >
              <IonRippleEffect></IonRippleEffect>
              <img src={getImage(card.refQCategoryId)} alt="Card Thumbnail" />
              <div className="cardConts">
                <div className="cardHeader">
                  <p
                    className="factorHeading"
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "#373A40",
                    }}
                  >
                    {card.refCategoryLabel}
                  </p>
                  {/* <div className="circularProgress">
                    {card.refScore === null ? (
                      <div style={{ color: "#607274" }}>
                        <i
                          className="pi pi-angle-right"
                          style={{ fontSize: "2rem" }}
                        ></i>
                      </div>
                    ) : (
                      <ScoreVerify
                        userScoreVerify={card.UserScoreVerify}
                        refScore={card.refScore}
                      />
                    )}
                  </div> */}
                </div>
              </div>
            </div>
          )}

          <Divider />
        </div>
      ))}
    </div>
  );
};

export default SubCards;
