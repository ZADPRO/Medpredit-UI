import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import risk from "../../assets/images/risk.jpg";
import symptoms from "../../assets/images/symptoms.jpg";
import vitals from "../../assets/images/vitals.jpg";
import blood from "../../assets/images/blood.jpg";
import menstrual from "../../assets/images/MENSTRURAL.jpg";
import treatementDetails from "../../assets/KnowAbout/treatmentDetails.jpg";
import previousIllness from "../../assets/KnowAbout/previousIllness.jpg";
import Axios from "axios";
import dyslipidemia from "../../assets/images/dyslipidemia.jpg";
import renalcomplication from "../../assets/images/renalcomplication.jpg";

//
import riskNew from "../../assets/logo_new/Risk Factor.svg";
import previousIllnessNew from "../../assets/logo_new/Previous Illness.svg";
import treatementDetailsNew from "../../assets/logo_new/Treatment Details.svg";
import vitalsNew from "../../assets/logo_new/Vital Signs.svg";
import bloodNew from "../../assets/logo_new/Blood Sugar Level.svg";
import dyslipidemiaNew from "../../assets/logo_new/Dyslipidemia.svg";
import renalcomplicationNew from "../../assets/logo_new/Renal Complication.svg";
import menstrualNew from "../../assets/logo_new/Menstrual.png";
//
import "./KnowCards.css";
import decrypt from "../../helper";
import { arrowForward, chevronForward } from "ionicons/icons";
import { IonAlert, IonIcon, IonRippleEffect } from "@ionic/react";

interface CardData {
  refQCategoryId: number;
  refCategoryLabel: string;
}

interface KnowCardsValues {
  cardData: CardData[];
  latestReport: any[];
}

const KnowCards: React.FC<KnowCardsValues> = ({ cardData, latestReport }) => {
  console.log("cardData", cardData);
  const history = useHistory();

  const handleCardClick = (categoryId: number, categroyName: string) => {
    history.push(`/subCategories/${categoryId}/${categroyName}`);
  };

  function calculateFutureDate(daysToAdd: any) {
    const today = new Date(); // Get today's date
    today.setDate(today.getDate() + daysToAdd); // Add the given number of days
    return today.toLocaleDateString("en-GB"); // Format the date (dd-mm-yyyy)
  }
  console.log(latestReport);
  const getImage = (refQCategoryId: number) => {
    switch (refQCategoryId) {
      case 4:
        return riskNew;
      case 5:
        return menstrualNew;
      case 6:
        return vitalsNew;
      case 7:
        return bloodNew;
      case 94:
        return previousIllnessNew;
      case 201:
        return treatementDetailsNew;
      case 211:
        return dyslipidemiaNew;
      case 212:
        return renalcomplicationNew;
      default:
        return "https://via.placeholder.com/150";
    }
  };

  function addDaysToDate(isoDate: string, daysToAdd: number): string {
    console.log(isoDate, daysToAdd);

    const date = new Date(isoDate);
    date.setDate(date.getDate() + daysToAdd);
    return date.toISOString().split("T")[0]; // Return only YYYY-MM-DD format
  }

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

  const getVerifyCard = (questionId: any) => {
    console.log(questionId);

    switch (questionId) {
      case 94:
        return true;
      case 6:
        return true;
      case 5:
        return 1;
      default:
        return false;
    }
  };

  const getValidateDuration = (questionId: any) => {
    console.log(questionId);

    switch (parseInt(questionId)) {
      case 94:
        return 30;
      case 6:
        return 1;
      case 5:
        return 30;
      default:
        return 0;
    }
  };

  return (
    <>
      <div className="grid-container ion-padding">
        {cardData.map((card) => (
          <>
            {localStorage.getItem("currentPatientGender") === "male" &&
              card.refQCategoryId.toString() === "5" ? (
              <></>
            ) : (
              <>
                {getVerifyCard(card.refQCategoryId) &&
                  latestReport.find(
                    (item) =>
                      item.refQCategoryId === card.refQCategoryId.toString()
                  ) ? (
                  (() => {
                    // Store the found report in a variable to avoid redundant find calls
                    const reportItem = latestReport.find(
                      (item) =>
                        item.refQCategoryId === card.refQCategoryId.toString()
                    );

                    return (
                      <>
                        {reportItem?.refPTcreatedDate &&
                          getValidateDuration(card.refQCategoryId) >
                          -calculateDaysDifference(
                            reportItem.refPTcreatedDate
                          ) ? (
                          <>
                            <div
                              className="knowCardParent grid-item"
                              key={card.refQCategoryId}
                            >
                              <div style={{ color: "rgb(12, 67, 108)" }} className="knowCard boxShadow01 backgroundColor01 ion-activatable ripple-parent rectangle">
                                {/* <IonRippleEffect /> */}
                                <div className="knowCardcontent">
                                  <img
                                    src={getImage(card.refQCategoryId)}
                                    alt={card.refCategoryLabel}
                                  />
                                  <p style={{ fontSize: "1rem" }}>{card.refCategoryLabel}</p>
                                </div>
                                <div
                                  style={{

                                    fontSize: "0.5rem",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-end",
                                  }}
                                >
                                  <div>
                                    Taken:{" "}
                                    {new Date(reportItem.refPTcreatedDate)
                                      .toLocaleDateString("en-GB")
                                      .replace(/\//g, "-")}

                                  </div>
                                  <div>
                                    Valid:{" "}
                                    {new Date(addDaysToDate(
                                      reportItem.refPTcreatedDate,
                                      getValidateDuration(
                                        reportItem.refQCategoryId
                                      )
                                    )).toLocaleDateString("en-GB")
                                      .replace(/\//g, "-")}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div
                              className="knowCardParent grid-item"
                              // className={`grid-item ${
                              //   latestReport > 14 || latestReport === null
                              //     ? ""
                              //     : "disabled-card"
                              // }`}
                              key={card.refQCategoryId}
                              onClick={() => {
                                // if (latestReport > 14 || latestReport === null) {
                                if (
                                  card.refQCategoryId === 5 ||
                                  card.refQCategoryId === 6 ||
                                  card.refQCategoryId === 94 ||
                                  card.refQCategoryId === 201
                                ) {
                                  // checkSore(card.refQCategoryId, card.refCategoryLabel);

                                  localStorage.setItem(
                                    "getCategory",
                                    JSON.stringify({
                                      id: card.refQCategoryId,
                                      label: card.refCategoryLabel,
                                    })
                                  );
                                  history.push(
                                    `/questions/${card.refCategoryLabel}/${card.refQCategoryId}`
                                  );
                                } else {
                                  handleCardClick(
                                    card.refQCategoryId,
                                    card.refCategoryLabel
                                  );
                                }
                                // }
                              }}
                            >
                              <div className="knowCard gradientButton02 boxShadow01 ion-activatable ripple-parent rectangle">
                                <IonRippleEffect></IonRippleEffect>
                                <div className="knowCardcontent">
                                  <img
                                    src={getImage(card.refQCategoryId)}
                                    alt={card.refCategoryLabel}
                                  />
                                  <p style={{ fontSize: "1rem" }}>{card.refCategoryLabel}</p>
                                </div>
                                <IonIcon
                                  size="large"
                                  icon={chevronForward}
                                ></IonIcon>
                              </div>
                            </div>
                          </>
                        )}
                      </>
                    );
                  })()
                ) : (
                  <div
                    className="knowCardParent grid-item"
                    // className={`grid-item ${
                    //   latestReport > 14 || latestReport === null
                    //     ? ""
                    //     : "disabled-card"
                    // }`}
                    key={card.refQCategoryId}
                    onClick={() => {
                      // if (latestReport > 14 || latestReport === null) {
                      if (
                        card.refQCategoryId === 5 ||
                        card.refQCategoryId === 6 ||
                        card.refQCategoryId === 94 ||
                        card.refQCategoryId === 201
                      ) {
                        // checkSore(card.refQCategoryId, card.refCategoryLabel);

                        localStorage.setItem(
                          "getCategory",
                          JSON.stringify({
                            id: card.refQCategoryId,
                            label: card.refCategoryLabel,
                          })
                        );
                        history.push(
                          `/questions/${card.refCategoryLabel}/${card.refQCategoryId}`
                        );
                      } else {
                        handleCardClick(
                          card.refQCategoryId,
                          card.refCategoryLabel
                        );
                      }
                      // }
                    }}
                  >
                    <div className="knowCard gradientButton02 boxShadow01 ion-activatable ripple-parent">
                      <IonRippleEffect></IonRippleEffect>
                      <div className="knowCardcontent">
                        <img
                          src={getImage(card.refQCategoryId)}
                          alt={card.refCategoryLabel}
                        />
                        <p style={{ fontSize: "1rem" }}>{card.refCategoryLabel}</p>
                      </div>
                      <IonIcon size="large" icon={chevronForward}></IonIcon>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        ))}
      </div>
    </>
  );
};

export default KnowCards;
