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

  const getImage = (refQCategoryId: number) => {
    switch (refQCategoryId) {
      case 4:
        return riskNew;
      case 5:
        return menstrual;
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

  // const checkSore = (refQCategoryId: any, refCategoryLabel: any) => {
  //   const tokenString = localStorage.getItem("userDetails");

  //   if (tokenString) {
  //     try {
  //       const tokenObject = JSON.parse(tokenString);
  //       const token = tokenObject.token;

  //       Axios.post(
  //         `${import.meta.env.VITE_API_URL}/getQuestionScore `,
  //         {
  //           patientId: localStorage.getItem("currentPatientId"),
  //           categoryId: refQCategoryId,
  //         },
  //         {
  //           headers: {
  //             Authorization: token,
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       ).then((response) => {
  //         const data = decrypt(
  //           response.data[1],
  //           response.data[0],
  //           import.meta.env.VITE_ENCRYPTION_KEY
  //         );

  //         if (data.status) {
  //           setIsAlertOpen(true);
  //           setSelectedData({
  //             refScoreId: "0",
  //             refCategoryLabel: refCategoryLabel,
  //             cardTitle: refQCategoryId,
  //             refQCategoryId: refQCategoryId,
  //           });
  //         } else {
  //           localStorage.setItem(
  //             "getCategory",
  //             JSON.stringify({ id: refQCategoryId, label: refCategoryLabel })
  //           );
  //           history.push(`/questions/${refCategoryLabel}/${refQCategoryId}`);
  //         }
  //       });
  //     } catch (error) {
  //       console.error("Error parsing token:", error);
  //     }
  //   } else {
  //     console.error("No token found in localStorage.");
  //   }
  // };

  // const [isAlertOpen, setIsAlertOpen] = useState(false);

  // const [selectedData, setSelectedData] = useState({
  //   cardTitle: "",
  //   refCategoryLabel: 0,
  //   refScoreId: "",
  //   refQCategoryId: 0,
  // });

  // console.log(latestReport);

  // const handleremoveScore = () => {
  //   const tokenString = localStorage.getItem("userDetails");

  //   if (tokenString) {
  //     try {
  //       const tokenObject = JSON.parse(tokenString);
  //       const token = tokenObject.token;

  //       Axios.post(
  //         `${import.meta.env.VITE_API_URL}/resetScore `,
  //         {
  //           refPatientId: localStorage.getItem("currentPatientId"),
  //           refQCategoryId: selectedData.refQCategoryId,
  //           refHospitalId: localStorage.getItem("hospitalId"),
  //           employeeId:
  //             tokenObject.roleType === 1
  //               ? null
  //               : localStorage.getItem("currentDoctorId"),
  //         },
  //         {
  //           headers: {
  //             Authorization: token,
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       ).then((response) => {
  //         const data = decrypt(
  //           response.data[1],
  //           response.data[0],
  //           import.meta.env.VITE_ENCRYPTION_KEY
  //         );

  //         if (data.status) {
  //           history.push(
  //             `/questions/${selectedData.refCategoryLabel}/${selectedData.refQCategoryId}`
  //           );
  //         }
  //       });
  //     } catch (error) {
  //       console.error("Error parsing token:", error);
  //     }
  //   } else {
  //     console.error("No token found in localStorage.");
  //   }
  // };

  const getVerifyCard = (questionId: any) => {
    switch (questionId) {
      case 94:
        return true;
      case 6:
        return true;
      default:
        return false;
    }
  };

  const getValidateDuration = (questionId: any) => {
    switch (parseInt(questionId)) {
      case 94:
        return 1;
      case 6:
        return 1;
      default:
        return 0;
    }
  };

  return (
    <>
      {/* <IonAlert
        isOpen={isAlertOpen}
        cssClass="custom-alert"
        header="Do you want to re-enter the question?"
        backdropDismiss={false}
        buttons={[
          {
            text: "Yes-->",
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
      /> */}
      {/* <div>
        {latestReport > 14 || latestReport === null ? (
          <></>
        ) : (
          <div
            style={{
              color: "#000",
              fontSize: "14px",
              textAlign: "center",
               dding: "10px",
              margin: "10px",
              background: "#e6e6e6",
              borderRadius: "5px",
            }}
          >
            <div>
              The current report is valid till{" "}
              {calculateFutureDate(14 - latestReport)}
            </div>
            <div>
              {" "}
              New assessment take on{" "}
              {calculateFutureDate(14 - latestReport + 1)}
            </div>
          </div>
        )}
      </div> */}
      {/* <div className="listView"></div> */}

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
                              <div className="knowCard gradientButton02 ion-activatable ripple-parent rectangle">
                                <IonRippleEffect />
                                <div className="knowCardcontent">
                                  <img
                                    src={getImage(card.refQCategoryId)}
                                    alt={card.refCategoryLabel}
                                  />
                                  <p>{card.refCategoryLabel}</p>
                                </div>
                                <IonIcon
                                  size="large"
                                  icon={chevronForward}
                                ></IonIcon>
                               {/*} <div
                                  style={{
                                    margin: "10px 0px",
                                    fontSize: "0.9rem",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "5px",
                                  }}
                                >
                                  <div>
                                    Taken:{" "}
                                    {reportItem.refPTcreatedDate.split("T")[0]}
                                  </div>
                                  <div>
                                    Valid:{" "}
                                    {addDaysToDate(
                                      reportItem.refPTcreatedDate,
                                      getValidateDuration(
                                        reportItem.refQCategoryId
                                      )
                                    )}
                                  </div>
                                </div>*/}
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
                              <div className="knowCard gradientButton02 ion-activatable ripple-parent rectangle">
                                <IonRippleEffect></IonRippleEffect>
                                <div className="knowCardcontent">
                                  <img
                                    src={getImage(card.refQCategoryId)}
                                    alt={card.refCategoryLabel}
                                  />
                                  <p>{card.refCategoryLabel}</p>
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
                    <div className="knowCard gradientButton02 ion-activatable ripple-parent">
                      <IonRippleEffect></IonRippleEffect>
                      <div className="knowCardcontent">
                        <img
                          src={getImage(card.refQCategoryId)}
                          alt={card.refCategoryLabel}
                        />
                        <p>{card.refCategoryLabel}</p>
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
