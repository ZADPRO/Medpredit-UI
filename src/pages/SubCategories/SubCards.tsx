import { IonAlert, IonModal, IonRippleEffect } from "@ionic/react";
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
import physicalNew from "../../assets/logo_new/Physical Activity.png";
import stressNew from "../../assets/logo_new/Stress.png";
import tobaccoNew from "../../assets/logo_new/Tobacco.png";
import alcoholNew from "../../assets/logo_new/Alcohol.png";
import dietryNew from "../../assets/logo_new/Dietary.png";
import bmiNew from "../../assets/logo_new/BMI.png";
import sleepNew from "../../assets/logo_new/Sleep.png";
import familyhistoryNew from "../../assets/logo_new/Family History.png";
import rbsNew from "../../assets/logo_new/RBS.png";
import fbsNew from "../../assets/logo_new/FBS.png";
import ppbsNew from "../../assets/logo_new/PPBS.png";
import ogttNew from "../../assets/logo_new/OGTT.png";
import gctNew from "../../assets/logo_new/GCT.png";
import hba1cNew from "../../assets/logo_new/HBA1c.png";
import fastingtotalNew from "../../assets/logo_new/FASTING_CHOLOSTROL.png";
import triglyceridesNew from "../../assets/logo_new/triglycerides.png";
import hdlcholestrolNew from "../../assets/logo_new/HDL.png";
import ldlcholestrolNew from "../../assets/logo_new/LDL.png";
import tchdlNew from "../../assets/logo_new/HDL_TC_RATIO.png";
import bloodureaNew from "../../assets/logo_new/BLOOD_UREA.png";
import serumNew from "../../assets/logo_new/SERUM.png";
import egfrNew from "../../assets/logo_new/EGFR.png";
import urineNew from "../../assets/logo_new/URINE.png";
import usgNew from "../../assets/logo_new/USG.png";

import { ScoreSlider } from "./ScoreSlider";
import { FaTruckArrowRight } from "react-icons/fa6";
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

  console.log(data);


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
        return fastingtotalNew;
      case 214:
        return triglyceridesNew;
      case 215:
        return hdlcholestrolNew;
      case 216:
        return ldlcholestrolNew;
      case 217:
        return tchdlNew;
      case 218:
        return bloodureaNew;
      case 219:
        return serumNew;
      case 220:
        return egfrNew;
      case 221:
        return urineNew;
      case 222:
        return urineNew;
      case 223:
        return urineNew;
      case 224:
        return usgNew;
      case 202:
        return rbsNew;
      case 203:
        return fbsNew;
      case 204:
        return ppbsNew;
      case 205:
        return ogttNew;
      case 206:
        return gctNew;
      case 207:
        return hba1cNew;
      default:
        return "https://via.placeholder.com/150";
    }
  };

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



  const evaluateScore = (
    userScoreVerify: any,
    refScore: number | string
  ) => {
    let label = "";
    let scoreValue = "";
    let color = "";

    console.log(refScore, userScoreVerify);

    userScoreVerify.forEach((element: any) => {
      switch (element.refAction) {
        case "equal":
          if (refScore.toString() === element.refValue.toString()) {
            label = element.refAnswerLabel;
            scoreValue = refScore.toString();
            color = element.refScoreColor;
            console.log(label);
          }
          break;

        case "notEqual":
          if (refScore.toString() != element.refValue.toString()) {
            label = element.refAnswerLabel;
            scoreValue = refScore.toString();
            color = element.refScoreColor;
            console.log(label);
          }
          break;

        case "lessThanEqual":
          console.log("lessthanEqual");
          if (parseFloat(refScore as string) <= parseFloat(element.refValue)) {
            label = element.refAnswerLabel;
            scoreValue = refScore.toString();
            color = element.refScoreColor;
            console.log(label);
          }
          break;

        case "greaterThanEqual":
          if (parseFloat(refScore as string) >= parseFloat(element.refValue)) {
            label = element.refAnswerLabel;
            scoreValue = refScore.toString();
            color = element.refScoreColor;
            console.log(label);
          }
          break;

        case "lessThan":
          if (parseFloat(refScore as string) < parseFloat(element.refValue)) {
            label = element.refAnswerLabel;
            scoreValue = refScore.toString();
            color = element.refScoreColor;
            console.log(label);
          }
          break;

        case "greaterThan":
          if (parseFloat(refScore as string) > parseFloat(element.refValue)) {
            label = element.refAnswerLabel;
            scoreValue = refScore.toString();
            color = element.refScoreColor;
            console.log(label);
          }
          break;

        case "rangeEqual":
          const [firstVal, secondVal] = element.refValue
            .split(",")
            .map(parseFloat);

          if (
            firstVal <= parseFloat(refScore as string) &&
            parseFloat(refScore as string) <= secondVal
          ) {
            label = element.refAnswerLabel;
            scoreValue = refScore.toString();
            color = element.refScoreColor;
            console.log(label);
          }
          break;

        default:
          console.log("Unknown refAction:", element.refAction);
      }
    });

    return label;
  };



  const [isModel, setIsModel] = useState(false);

  const [modelData, setModelData] = useState({
    name: "",
    status: "",
    fromDate: "",
    toDate: ""
  })


  const handleModel = (name: any, status: any, fromDate: any, toDate: any) => {

    setIsModel(true)
    setModelData({
      name: name,
      status: status,
      fromDate: fromDate,
      toDate: toDate
    })

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


  function addDaysToDate(isoDate: string, daysToAdd: number): string {
    const date = new Date(isoDate);
    date.setDate(date.getDate() + daysToAdd);
    return date.toISOString().split("T")[0]; // Return only YYYY-MM-DD format
  }

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

      <IonModal
        isOpen={isModel}
        id="doctorDetailsGraph"
        initialBreakpoint={1}
        onDidDismiss={() => {
          setIsModel(false);
        }}
        animated={false}
      >
        <div
          className="ion-padding "
          style={{
            background:
              "linear-gradient(227deg,rgba(255, 255, 255, 1) 39%,rgba(255, 255, 255, 1) 61%,rgba(217, 240, 255, 1) 100%)",
          }}
        >
          <div
            style={{
              fontSize: "1rem",
              color: "#1a3d61",
              fontWeight: "700",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>{modelData.name}</div>
            <div
              onClick={() => {
                setIsModel(false);
              }}
            >
              {" "}
              <i className="pi pi-times"></i>{" "}
            </div>
          </div>

          <div
            style={{
              textAlign: "center",
              fontSize: "1.4rem",
              fontWeight: "700",
              marginTop: "10px",
              marginBottom: "10px",
              color: "#1a3d61",
            }}
          >
            {modelData.status}
          </div>

          <div
            style={{
              color: "#5194ae",
              fontSize: "1rem",
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            <div>This report valid for</div>
            <div>
              ( {modelData.fromDate} to {modelData.toDate} )
            </div>
          </div>
        </div>
      </IonModal>

      <div className="subCardsParent">
        {data.map((card: any) => (
          <>
            {card.refPTcreatedDate &&
            getValidity(card.refQCategoryId) >
              -calculateDaysDifference(card.refPTcreatedDate) ? (
              <>
                <div key={card.refQCategoryId}>
                  {card.refPTcreatedDate &&
                  getValidity(card.refQCategoryId) >
                    -calculateDaysDifference(card.refPTcreatedDate) ? (
                    <>
                      <div
                        key={card.refQCategoryId}
                        className="subCard gradientBackground02_opacity_disabled ion-activatable ripple-parent rectangle"
                        onClick={() => {
                          handleModel(
                            card.refCategoryLabel,
                            evaluateScore(card.UserScoreVerify, card.refScore),
                            card.refPTcreatedDate.split("T")[0],
                            addDaysToDate(
                              card.refPTcreatedDate,
                              getValidity(card.refQCategoryId)
                            )
                          );
                        }}
                      >
                        {[8, 9, 10, 11, 12, 13, 43, 51].includes(
                          card.refQCategoryId
                        ) ? (
                          <>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "0.5rem",
                                opacity: "0.2",
                              }}
                            >
                              <img
                                src={getImage(card.refQCategoryId)}
                                alt="Card Thumbnail"
                              />
                              <div>
                                <div className="subCardHeader">
                                  <p data-text={card.refCategoryLabel}>
                                    {card.refCategoryLabel.split(" ").length ===
                                    2
                                      ? card.refCategoryLabel
                                          .split(" ")
                                          .join("\n") // Force a line break for two words
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
                                <>
                                  {[8, 9, 10, 11, 12, 13, 43, 51].includes(
                                    card.refQCategoryId
                                  ) ? (
                                    <div>
                                      <ScoreSlider
                                        userScoreVerify={card.UserScoreVerify}
                                        refScore={card.refScore}
                                      />
                                    </div>
                                  ) : null}
                                </>
                              )}
                            </div>
                          </>
                        ) : (
                          <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.5rem",
                            opacity: "0.2",
                          }}
                        >
                          <img
                            src={getImage(card.refQCategoryId)}
                            alt="Card Thumbnail"
                          />
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
                        ) }
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        key={card.refQCategoryId}
                        className="subCard gradientBackground02_opacity ion-activatable ripple-parent rectangle"
                        onClick={() => {
                          handleCardClick(
                            card.refQCategoryId,
                            card.refCategoryLabel
                          );
                        }}
                      >
                        <IonRippleEffect></IonRippleEffect>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.5rem",
                          }}
                        >
                          <img
                            src={getImage(card.refQCategoryId)}
                            alt="Card Thumbnail"
                          />
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
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <div
                  key={card.refQCategoryId}
                  className="subCard gradientBackground02_opacity ion-activatable ripple-parent rectangle"
                  onClick={() => {
                    handleCardClick(card.refQCategoryId, card.refCategoryLabel);
                  }}
                >
                  <IonRippleEffect></IonRippleEffect>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <img
                      src={getImage(card.refQCategoryId)}
                      alt="Card Thumbnail"
                    />
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
                </div>
              </>
            )}
          </>
          // <div
          //   key={card.refQCategoryId}
          //   className="subCard gradientBackground02_opacity ion-activatable ripple-parent rectangle"
          //   onClick={() => {
          //     if (card.refScore === null) {
          //       handleCardClick(card.refQCategoryId, card.refCategoryLabel);
          //     }
          //     else {
          //       if (
          //         getValidity(card.refQCategoryId) >
          //         -calculateDaysDifference(card.refPTcreatedDate)) {
          //         handleCardClick(card.refQCategoryId, card.refCategoryLabel);
          //       }
          //       else {
          //         handleModel(
          //           card.refCategoryLabel,
          //           evaluateScore(card.UserScoreVerify, card.refScore),
          //           // <ScoreVerify
          //           //   userScoreVerify={card.UserScoreVerify}
          //           //   refScore={card.refScore}
          //           // />,
          //           card.refPTcreatedDate.split("T")[0],
          //           addDaysToDate(
          //             card.refPTcreatedDate,
          //             getValidity(card.refQCategoryId)
          //           )
          //         )
          //       }
          //     }
          //   }}
          //   style={{ cursor: "pointer" }}
          // >

          //   {(card.refScore === null) ? (<>

          //     <IonRippleEffect></IonRippleEffect>
          //     <div style={{
          //       display: "flex",
          //       flexDirection: "column",
          //       alignItems: "center",
          //       justifyContent: "center",
          //       gap: "0.5rem"
          //     }}>
          //       <img src={getImage(card.refQCategoryId)} alt="Card Thumbnail" />
          //       <div>
          //         <div className="subCardHeader">
          //           <p data-text={card.refCategoryLabel}>
          //             {card.refCategoryLabel.split(" ").length === 2
          //               ? card.refCategoryLabel.split(" ").join("\n") // Force a line break for two words
          //               : card.refCategoryLabel}
          //           </p>
          //         </div>
          //       </div>
          //     </div></>) : getValidity(card.refQCategoryId) <
          //       -calculateDaysDifference(card.refPTcreatedDate) ? (
          //     <>
          //       <IonRippleEffect></IonRippleEffect>
          //       <div style={{
          //         display: "flex",
          //         flexDirection: "column",
          //         alignItems: "center",
          //         justifyContent: "center",
          //         gap: "0.5rem"
          //       }}>
          //         <img src={getImage(card.refQCategoryId)} alt="Card Thumbnail" />
          //         <div>
          //           <div className="subCardHeader">
          //             <p data-text={card.refCategoryLabel}>
          //               {card.refCategoryLabel.split(" ").length === 2
          //                 ? card.refCategoryLabel.split(" ").join("\n") // Force a line break for two words
          //                 : card.refCategoryLabel}
          //             </p>
          //           </div>
          //         </div>
          //       </div>
          //     </>
          //   ) : (<>
          //     {getValidity(card.refQCategoryId)}
          //     {-calculateDaysDifference(card.refPTcreatedDate)}
          //     {getValidity(card.refQCategoryId) < -calculateDaysDifference(card.refPTcreatedDate) ? "Yes" : "No1"}
          //     <div style={{
          //       display: "flex",
          //       flexDirection: "row",
          //       alignItems: "center",
          //       justifyContent: "center",
          //       gap: "0.5rem"
          //     }}

          //     >
          //       <img src={getImage(card.refQCategoryId)} alt="Card Thumbnail" />
          //       <div>
          //         <div className="subCardHeader">
          //           <p data-text={card.refCategoryLabel}>
          //             {card.refCategoryLabel.split(" ").length === 2
          //               ? card.refCategoryLabel.split(" ").join("\n") // Force a line break for two words
          //               : card.refCategoryLabel}
          //           </p>
          //         </div>
          //       </div>
          //     </div>

          //     <div className="subCardSliderBar">
          //       {card.refScore === null ? (
          //         <div style={{ color: "#607274" }}>
          //           <i
          //             className="pi pi-angle-right"
          //             style={{ fontSize: "2rem" }}
          //           ></i>
          //         </div>
          //       ) : (
          //         <>
          //           {
          //             [8, 9, 10, 11, 12, 13, 43, 51].includes(card.refQCategoryId) ? (
          //               <div>
          //                 <ScoreSlider
          //                   userScoreVerify={card.UserScoreVerify}
          //                   refScore={card.refScore}
          //                 />
          //               </div>
          //             ) : null
          //           }
          //         </>
          //       )}
          //     </div></>)}
          // </div>
        ))}
      </div>
    </div>
  );
};

export default SubCards;
