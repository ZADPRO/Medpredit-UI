import {
  IonAccordion,
  IonAccordionGroup,
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonRippleEffect,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import decrypt from "../../helper";
import { Divider } from "primereact/divider";
import { ScoreVerify } from "../../ScoreVerify";
import { FaChevronRight, FaUserDoctor } from "react-icons/fa6";
import ReportPDF from "../../pages/ReportPDF/ReportPDF";
import Graph from "../../pages/Graph/Graph";
import "./PastReport.css";
import { chevronBack, chevronBackCircle, download } from "ionicons/icons";

const PastReport: React.FC = () => {
  const history = useHistory();
  const modal = useRef<HTMLIonModalElement>(null);

  const { reportDate } = useParams<{
    reportDate: string;
  }>();

  const [loadingStatus, setLoadingStatus] = useState<boolean>(true);
  const [toggleTabs, setToggleTabs] = useState<number>(0);
  console.log(toggleTabs);
  const [doctorDetail, setDoctorDetail] = useState({
    doctorName: "",
    doctorId: "",
    hospital: "",
    hospitalAddress: "",
  });

  const [patientDetail, setPatientDetail] = useState({
    address1: "",
    address2: "",
    age: "",
    gender: "",
    patientId: "",
    patientName: "",
  });

  const [allCategory, setAllCategory] = useState<any[]>([]);

  const [structuredCategories, setStructuredCategories] = useState<any[]>([]);
  const [structuredScores, setstructuredScores] = useState<any[]>([]);

  const [allScore, setAllScore] = useState<any[]>([]);

  const [allScorVerify, setAllScoreVerify] = useState<any[]>([]);

  const [stressAnswer, setStressAnswer] = useState<any[]>([]);

  const [treatmentDetails, setTreatmentDetails] = useState<any[]>([]);

  const [rbs, setRbs] = useState<any[]>([]);
  const [fbs, setFbs] = useState<any[]>([]);
  const [ppbs, setPpbs] = useState<any[]>([]);
  const [ogtt, setOgtt] = useState<any[]>([]);
  const [gct, setGct] = useState<any[]>([]);
  const [hba1c, setHba1c] = useState<any[]>([]);
  const [fastingcholesterol, setFastingcholesterol] = useState<any[]>([]);
  const [fastingtriglycerides, setFastingtriglycerides] = useState<any[]>([]);
  const [hdl, setHdl] = useState<any[]>([]);
  const [ldl, setLdl] = useState<any[]>([]);
  const [tchdl, setTchdl] = useState<any[]>([]);
  const [kr, setKr] = useState<any[]>([]);
  const [kl, setKl] = useState<any[]>([]);
  const [echo, setEcho] = useState<any[]>([]);
  const [cortico, setCortico] = useState<any[]>([]);
  const [bloodurea, setBloodurea] = useState<any[]>([]);
  const [serum, SetSerum] = useState<any[]>([]);

  const [egfr, setEgfr] = useState<any[]>([]);

  const [urinesugar, setUrinesugar] = useState<any[]>([]);

  const [urinealbumin, setUrinealbumin] = useState<any[]>([]);

  const [urineketones, setUrineketones] = useState<any[]>([]);
  console.log("localStorage", localStorage);
  useEffect(() => {
    console.log("---------------------->", reportDate);

    const tokenString = localStorage.getItem("userDetails");
    const patientId = localStorage.getItem("currentPatientId");

    if (tokenString) {
      try {
        const tokenObject = JSON.parse(tokenString);
        const token = tokenObject.token;

        setLoadingStatus(true);

        axios
          .post(
            `${import.meta.env.VITE_API_URL}/getPastReportData `,
            {
              patientId: patientId,
              employeeId:
                tokenObject.roleType === 1
                  ? null
                  : localStorage.getItem("currentDoctorId"),
              hospitalId: localStorage.getItem("hospitalId"),
              reportDate: reportDate,
            },
            {
              headers: {
                Authorization: token,
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            const data = decrypt(
              response.data[1],
              response.data[0],
              import.meta.env.VITE_ENCRYPTION_KEY
            );


            console.log('====================================');
            console.log("134", data);
            console.log('====================================');

            setDoctorDetail({
              doctorName: data.doctorDetail.doctorName,
              doctorId: data.doctorDetail.doctorId,
              hospital: data.doctorDetail.hospital,
              hospitalAddress: data.doctorDetail.hospitalAddress,
            });
            setTreatmentDetails(data.treatmentDetails);

            setPatientDetail({
              address1: data.patientDetail.address1,
              address2: data.patientDetail.address2,
              age: data.patientDetail.age,
              gender: data.patientDetail.gender,
              patientId: data.patientDetail.patientId,
              patientName: data.patientDetail.patientName,
            });

            setRbs(data.rbs);
            setFbs(data.fbs);
            setPpbs(data.ppbs);
            setOgtt(data.ogtt);
            setGct(data.gct);
            setHba1c(data.hba1c);
            setFastingcholesterol(data.fastingcholesterol);
            setFastingtriglycerides(data.fastingtriglycerides);
            setHdl(data.hdl);
            setLdl(data.ldl);
            setTchdl(data.tchdl);
            setKr(data.kr);
            setKl(data.kl);
            setEcho(data.echo);
            setCortico(data.cortico);
            setBloodurea(data.bloodurea);

            SetSerum(data.serum);
            setEgfr(data.egfr);

            setUrinesugar(data.urinesugar);

            setUrinealbumin(data.urinealbumin);

            setUrineketones(data.urineketones);

            setAllScoreVerify(data.allScoreVerify);

            setAllCategory(data.allCategory);

            setStructuredCategories(structureCategories(data.allCategory));
            setAllScore(data.allScore);

            setStressAnswer(data.stressAnswer);

            setLoadingStatus(false);
          });
      } catch (error) {
        console.error("Error parsing token:", error);
      }
    } else {
      console.error("No token found in localStorage.");
    }
  }, []);
  console.log("-------------------------------47", allScore.find(item => item.refQCategoryId == 47));

  function structureCategories(data: any[]) {
    const categoryMap = new Map<number, any>();

    const gender = localStorage.getItem("currentPatientGender");

    // First, initialize the map with all categories
    data.forEach(item => {
      categoryMap.set(item.refQCategoryId, { ...item, subcategories: [] });
    });

    const structuredData: any[] = [];

    data.forEach(item => {
      if (item.refQSubCategory === "0") {
        // It's a parent category
        if (gender === "Male" && item.refCategoryLabel === "Menstrual Cycle") {
          return; // Skip this category if gender is Male
        }
        structuredData.push(categoryMap.get(item.refQCategoryId));
      } else {
        // Find the parent category and push this as a subcategory
        const parent = categoryMap.get(Number(item.refQSubCategory));
        if (parent) {
          if (gender === "male" && item.refCategoryLabel === "Menstrual History") {
            return; // Skip this subcategory if gender is Male
          }
          parent.subcategories.push(categoryMap.get(item.refQCategoryId));
        }
      }
    });


    return structuredData;
  }


  function calculateDaysDifference1(dateString: any) {
    const givenDate: any = new Date(dateString);
    const currentDate: any = new Date(reportDate); // Using reportDate directly
    currentDate.setHours(0, 0, 0, 0);

    const diffInMs = givenDate - currentDate;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    console.log("Days Difference:", diffInDays);

    return diffInDays;
  }



  console.log("structuredCategories", structuredCategories);

  const getSleepStatus = (questionId: any, scoreValue: any) => {
    if (parseInt(questionId) === 47) {
      switch (true) {
        case parseInt(scoreValue) > 85:
          return "No Difficulty";
        case parseInt(scoreValue) >= 75 && parseInt(scoreValue) <= 84:
          return "Mild Difficulty";
        case parseInt(scoreValue) >= 65 && parseInt(scoreValue) <= 74:
          return "Moderate Difficulty";
        case parseInt(scoreValue) < 65:
          return "Severe Difficulty";
        default:
          return "";
      }
    }
    else {
      switch (scoreValue) {
        case "0":
          return "No Difficulty";
        case "1":
          return "Mild Difficulty";
        case "2":
          return "Moderate Difficulty";
        case "3":
          return "Severe Difficulty";
        default:
          return "";
      }
    };
  }

  const getBMIstatus = (questionId: any, scoreValue: any) => {
    if (questionId === 22) {
      return "cm"
    }
    else if (questionId === 23) {
      return "kg"
    }
    else if (questionId === 24) {
      const tempGender = localStorage.getItem("currentPatientGender");
      if (tempGender == "male") {
        switch (true) {
          case parseInt(scoreValue) >= 0.95:
            return "- At Risk";
          case parseInt(scoreValue) > 0.90 && parseInt(scoreValue) < 0.95:
            return "- Average";
          case parseInt(scoreValue) > 0.85 && parseInt(scoreValue) < 0.90:
            return "- Good";
          case parseInt(scoreValue) <= 0.85:
            return "- Excellent";
          default:
            return "";
        }
      }

      else if (tempGender == "female") {
        switch (true) {
          case parseInt(scoreValue) >= 0.86:
            return "- At Risk";
          case parseInt(scoreValue) > 0.80 && parseInt(scoreValue) < 0.86:
            return "- Average";
          case parseInt(scoreValue) > 0.75 && parseInt(scoreValue) < 0.80:
            return "- Good";
          case parseInt(scoreValue) <= 0.75:
            return "- Excellent";
          default:
            return "";
        }
      }
    }

    else {
      return "";
    }
  }

  const getTobaccoStatus = (questionId: any, scoreValue: any) => {
    if (questionId === 39) {
      switch (true) {
        case parseFloat(scoreValue) == 0:
          return "- No risk";
        case parseFloat(scoreValue) <= 1:
          return "- Low risk";
        case parseFloat(scoreValue) >= 2.0 && parseFloat(scoreValue) <= 5.0:
          return "- Moderate risk";
        case parseInt(scoreValue) > 5.0:
          return "- Severe risk";
        default:
          return "";
      }
    } else {
      return "";
    }
  }

  const getValidateDuration = (questionId: any) => {
    console.log("questionId: ", questionId);

    switch (parseInt(questionId)) {
      case 94:
        return 30;
      case 5:
        return 30;
      case 6:
        return 1;
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
        return 30;
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

  type GraphData = {
    data: any; // Adjust the type according to your data structure
    label: string;
  };

  const getGraphProps = (refQCategoryId: number): GraphData => {
    const categoryMapping: Record<number, GraphData> = {
      202: { data: rbs, label: "RBS (CBS)" },
      203: { data: fbs, label: "FBS" },
      204: { data: ppbs, label: "PPBS" },
      205: { data: ogtt, label: "OGTT" },
      206: { data: gct, label: "GCT" },
      207: { data: hba1c, label: "HBA1c" },
      213: { data: fastingcholesterol, label: "Fasting Total Cholesterol" },
      214: { data: fastingtriglycerides, label: "Fasting total Triglycerides" },
      215: { data: hdl, label: "HDL - Cholesterol" },
      216: { data: ldl, label: "LDL - Cholesterol" },
      217: { data: tchdl, label: "TC: HDL ratio" },
      218: { data: bloodurea, label: "Blood urea" },
      219: { data: serum, label: "Serum creatinine" },
      220: { data: egfr, label: "eGFR" },
      221: { data: urinesugar, label: "Urine- sugar" },
      222: { data: urinealbumin, label: "Urine Albumin" },
      223: { data: urineketones, label: "Urine ketones" }
    };
    return categoryMapping[refQCategoryId] || { data: null, label: "" };
  };

  function isValidCategory(subCategoryId: NumberConstructor): boolean {
    // Convert subCategoryId to string for comparison
    const subCategoryIdStr = subCategoryId.toString();

    // Check if the subCategoryId exists in allScore
    const categoryExists = allScore.some(
      (answer) => answer.refQCategoryId === subCategoryIdStr
    );

    if (!categoryExists) return false;

    // Find the matching answer
    const matchedAnswer = allScore.find(
      (answer) => answer.refQCategoryId === subCategoryIdStr
    );

    if (!matchedAnswer || !matchedAnswer.refPTcreatedDate) return false;

    // Calculate the duration and days difference
    const duration = getValidateDuration(subCategoryId);
    const daysDifference = calculateDaysDifference(matchedAnswer.refPTcreatedDate);

    return duration > -daysDifference;
  }


  function calculateDaysDifference(dateString: any) {
    // Convert the given date string to a Date object
    const givenDate: any = new Date(dateString);

    // Get the current date and set time to midnight for accurate day difference
    const currentDate: any = new Date(reportDate);
    currentDate.setHours(0, 0, 0, 0);

    // Calculate the difference in milliseconds
    const diffInMs = givenDate - currentDate;

    // Convert milliseconds to days
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));


    console.log('====================================');
    console.log(diffInDays);
    console.log('====================================');

    return diffInDays;
  }


  const getTodayDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = today.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const [isAlertOpen, setIsAlertOpen] = useState(false);

  function formatTime(date: any) {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Calculate AM/PM
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    const hour12 = hours % 12;
    const displayHour = hour12 === 0 ? 12 : hour12; // Handle midnight and noon case

    // Format minutes (always two digits)
    const displayMinutes = minutes < 10 ? "0" + minutes : minutes;

    return `${displayHour}:${displayMinutes} ${ampm}`;
  };


  const Section = ({ title, ids, startIndex, sectionIndex, subcategories }: any) => (
    <div className="pastReport_AccCont_div2" style={{ marginTop: "10px" }}>
      <span>{`${sectionIndex}. ${title}`}</span>
      {subcategories
        .filter((subCategory_03: any) => ids.includes(subCategory_03.refQCategoryId))
        .map((subCategory_03: any, subIndex_03: any) => (
          <div
            className="pastReport_AccCont_div2_list"
            key={subCategory_03.refQCategoryId}
          >
            <span style={{ paddingLeft: "1rem" }}>
              {`${sectionIndex}.${subIndex_03 - startIndex} ${subCategory_03.refCategoryLabel}`}
            </span>
            <div
              className="pastReport_AccCont_div2_sublist"
              style={{ paddingLeft: "2rem" }}
            >
              <span>
                {allScore.find(
                  (item) => item.refQCategoryId.toString() === subCategory_03.refQCategoryId.toString()
                )?.refPTScore || "N/A"}
              </span>
            </div>
          </div>
        ))}
      <div style={{ width: "100%", borderBottom: "1px solid lightgrey" }}></div>
    </div>
  );


  return (
    <IonPage>
      {loadingStatus ? (
        <>
          <IonContent>
            <div
              style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <i
                className="pi pi-spin pi-spinner"
                style={{ fontSize: "2rem", color: "#1a70b0" }}
              ></i>
            </div>
          </IonContent>
        </>
      ) : (
        <>
          <IonContent fullscreen>
            <div className="pastReport medpredit-page-background">
              <div className="pastReport_toolBar ">
                <button
                  onClick={() => {
                    history.goBack();
                  }}
                >
                  <IonIcon size="large" icon={chevronBack}></IonIcon>
                </button>
                <div style={{ fontSize: "0.8rem", fontWeight: "bold" }}>
                  Report Date: {reportDate}
                </div>
                <ReportPDF reportDate={reportDate} />
              </div>

              <div className="pastReport_MainCategory">
                {structuredCategories.map(
                  (mainCategory, mainCategoryIndex) => (
                    <div
                      key={mainCategory.refQCategoryId}
                      className={
                        toggleTabs === mainCategoryIndex ? "selectedTab" : ""
                      }
                      onClick={() => setToggleTabs(mainCategoryIndex)}
                    >
                      {mainCategory.refCategoryLabel}
                    </div>
                  )
                )}
              </div>

              <div className="pastReport_AccordionContent">
                <IonAccordionGroup>
                  {structuredCategories[toggleTabs]?.subcategories?.map(
                    (subCategory: any, subIndex: any) => (
                      <IonAccordion key={subIndex}>
                        <IonItem slot="header" color="light">
                          <div>{subCategory.refCategoryLabel}</div>
                        </IonItem>

                        {((subCategory.refQCategoryId == 5) || (subCategory.refQCategoryId == 6)) && (
                          <div className="sss" slot="content">
                            {isValidCategory(subCategory.refQCategoryId) ? (
                              <div>
                                {subCategory?.subcategories?.length > 0 && (
                                  subCategory.subcategories.map(
                                    (subCategory_02: any, subIndex_02: any) => (
                                      <>
                                        <div
                                          className="pastReport_AccCont"
                                          key={subCategory_02.refQCategoryId}
                                        >
                                          <div className="pastReport_AccCont_div1">
                                            <span>
                                              {subCategory_02.refCategoryLabel}
                                            </span>
                                            <span>
                                              {structuredScores.map((answer) => {
                                                if (answer.refQCategoryId === subCategory_02.refQCategoryId.toString()) {
                                                  const totalScore: any = [];
                                                  allScorVerify.forEach((scoresVerify) => {
                                                    if (scoresVerify.refQCategoryId == subCategory_02.refQCategoryId) {
                                                      totalScore.push(scoresVerify);
                                                    }
                                                  }
                                                  );
                                                  return (
                                                    <div
                                                      key={answer.refQCategoryId}>
                                                      <ScoreVerify
                                                        userScoreVerify={totalScore} // Pass the totalScore directly
                                                        refScore={answer.refPTScore}
                                                      />
                                                    </div>
                                                  );
                                                }
                                                return null;
                                              }
                                              )}

                                            </span>
                                            <span style={{ color: "grey", textAlign: "end" }}>
                                              {
                                                allScore.find(item => item.refQCategoryId == subCategory_02.refQCategoryId)
                                                  ?.refPTScore === "No Answer"
                                                  ? "-"
                                                  : allScore.find(item => item.refQCategoryId == subCategory_02.refQCategoryId)
                                                    ?.refPTScore
                                              }
                                            </span>
                                          </div>
                                          <div
                                            style={{
                                              width: "100%",
                                              marginBottom: "rem",
                                            }}
                                          ></div>
                                        </div>
                                      </>
                                    )
                                  )
                                )}
                              </div>
                            ) : ((<div>{"No Data Filled"}</div>))}

                          </div>
                        )}

                        {/* {((subCategory.refQCategoryId == 7) && (subCategory.refQCategoryId == 211) && (subCategory.refQCategoryId == 212)) && (
                          <div slot="content">
                            {isValidCategory(subCategory.refQCategoryId)? (
                              <div>
                                  {subCategory?.subcategories?.length > 0 && (
                              subCategory.subcategories.map(
                                (subCategory_02: any, subIndex_02: any) => (
                                  <>
                                  <div
                                      className="pastReport_AccCont"
                                      key={subCategory_02.refQCategoryId}
                                    >
                                      <div className="pastReport_AccCont_div1">
                                        <span>
                                          {subCategory_02.refCategoryLabel}
                                        </span>
                                        <span>
                                        {allScore.map((answer) => {
                                          if (answer.refQCategoryId === subCategory_02.refQCategoryId.toString()) {
                                            const totalScore: any = [];
                                            allScorVerify.forEach((scoresVerify) => {
                                              if (scoresVerify.refQCategoryId == subCategory_02.refQCategoryId) {
                                                totalScore.push(scoresVerify);
                                              }
                                            }
                                          );
                                        return (
                                          <div
                                              key={answer.refQCategoryId}>
                                              <ScoreVerify
                                                userScoreVerify={totalScore} // Pass the totalScore directly
                                                refScore={answer.refPTScore}
                                              />
                                          </div>
                                          );
                                        }
                                        return null;
                                       }
                                    )}
                                        
                                        </span>
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          borderBottom: "1px solid #0c436c",
                                        }}
                                      />
                                      
                                      <div className="pastReport_AccCont_charts">
                                        <Graph
                                          data={getGraphProps(subCategory_02.refQCategoryId).data}
                                          label={getGraphProps(subCategory_02.refQCategoryId).label}
                                        />
                                      </div>
                                    </div>
                                  </>
                                )
                              )
                            )}
                            </div>) : (<div>{"No Data Filled"}</div>)}
                            
                          </div>
                        )} */}

                        {((subCategory.refQCategoryId == 7) || (subCategory.refQCategoryId == 211) || (subCategory.refQCategoryId == 212)) && (
                          <div slot="content">
                            {subCategory?.subcategories?.length > 0 && (
                              subCategory.subcategories.map(
                                (subCategory_02: any, subIndex_02: any) => (
                                  <>
                                    <div
                                      className="pastReport_AccCont"
                                      key={subCategory_02.refQCategoryId}
                                    >
                                      {isValidCategory(subCategory_02.refQCategoryId) ? (
                                        <>
                                          <div className="pastReport_AccCont_div1">
                                            <span>{subCategory_02.refCategoryLabel}</span>
                                            <span>
                                              {allScore.map((answer) => {
                                                if (answer.refQCategoryId === subCategory_02.refQCategoryId.toString()) {
                                                  const totalScore: any = [];
                                                  allScorVerify.forEach((scoresVerify) => {
                                                    if (scoresVerify.refQCategoryId == subCategory_02.refQCategoryId) {
                                                      totalScore.push(scoresVerify);
                                                    }
                                                  }
                                                  );
                                                  return (
                                                    <div
                                                      key={answer.refQCategoryId}>
                                                      <ScoreVerify
                                                        userScoreVerify={totalScore} // Pass the totalScore directly
                                                        refScore={answer.refPTScore}
                                                      />
                                                    </div>
                                                  );
                                                }
                                                return null;
                                              }
                                              )}
                                            </span>
                                          </div>
                                          <div
                                            style={{
                                              width: "100%",
                                              borderBottom: "1px solid #0c436c",
                                            }} />
                                          {subCategory_02?.subcategories.map(
                                            (subCategory_03: any, subIndex_03: any) => (
                                              <div style={{ display: "flex", justifyContent: "space-between", width: "85%", margin: "0 auto" }}>
                                                <span>{subCategory_03.refCategoryLabel}</span>
                                                <span>{allScore.find(item => item.refQCategoryId == subCategory_03.refQCategoryId)?.refPTScore}</span>
                                              </div>
                                            ))}
                                          <div className="pastReport_AccCont_charts">
                                            <Graph
                                              data={getGraphProps(subCategory_02.refQCategoryId).data}
                                              label={getGraphProps(subCategory_02.refQCategoryId).label}
                                            />
                                          </div>
                                        </>
                                      ) : (<>
                                        <div className="pastReport_AccCont_div1">
                                          <span>
                                            {subCategory_02.refCategoryLabel}
                                          </span>
                                          <span>
                                            {"No Data Filled"}
                                          </span>
                                        </div>
                                        <div
                                          style={{
                                            width: "100%",
                                            borderBottom: "1px solid #0c436c",
                                          }}
                                        ></div>
                                      </>)
                                      }
                                    </div>
                                  </>
                                )
                              )
                            )}
                          </div>
                        )}

                        {(subCategory.refQCategoryId === 4) && (
                          <div slot="content">
                            {subCategory?.subcategories?.length > 0 ? (
                              subCategory.subcategories.map(
                                (subCategory_02: any, subIndex_02: any) => (
                                  <>
                                    <div
                                      className="pastReport_AccCont"
                                      key={subCategory_02.refQCategoryId}
                                    >
                                      {isValidCategory(subCategory_02.refQCategoryId) ? (
                                        <>
                                          <div className="pastReport_AccCont_div1">
                                            <span>
                                              {subCategory_02.refCategoryLabel}
                                            </span>
                                            <span>
                                              {allScore.map((answer) => {
                                                if (answer.refQCategoryId === subCategory_02.refQCategoryId.toString()) {
                                                  const totalScore: any = [];
                                                  allScorVerify.forEach((scoresVerify) => {
                                                    if (scoresVerify.refQCategoryId == subCategory_02.refQCategoryId) {
                                                      totalScore.push(scoresVerify);
                                                    }
                                                  }
                                                  );
                                                  return (
                                                    <div
                                                      key={answer.refQCategoryId}>
                                                      <ScoreVerify
                                                        userScoreVerify={totalScore} // Pass the totalScore directly
                                                        refScore={answer.refPTScore}
                                                      />
                                                    </div>
                                                  );
                                                }
                                                return null;
                                              }
                                              )}

                                            </span>
                                          </div>
                                          <div
                                            style={{
                                              width: "100%",
                                              borderBottom: "1px solid #0c436c",
                                            }}
                                          ></div>
                                          {(subCategory_02.refQCategoryId == 8) ? (
                                            <div className="pastReport_AccCont_div2">
                                              {subCategory_02?.subcategories.map(
                                                (subCategory_03: any, subIndex_03: any) => (
                                                  <>
                                                    <div
                                                      className="pastReport_AccCont_div2_list"
                                                      key={subCategory_03.refQCategoryId}
                                                    >
                                                      {subCategory_03?.subcategories.length > 0 ? (
                                                        <>
                                                          <span>{`${subIndex_03 + 1}. ${subCategory_03.refCategoryLabel}`}</span>
                                                          <div>
                                                            {subCategory_03?.subcategories.map(
                                                              (subCategory_04: any, subIndex_04: any) => (
                                                                <div
                                                                  className="pastReport_AccCont_div2_sublist"
                                                                  key={subCategory_04.refQCategoryId}
                                                                >
                                                                  <span>{subCategory_04.refCategoryLabel}</span>
                                                                  <span>{allScore.find(item => item.refQCategoryId == subCategory_04.refQCategoryId)?.refPTScore}</span>
                                                                </div>
                                                              )
                                                            )}
                                                          </div>
                                                        </>
                                                      ) : (
                                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                          <span>{`${subIndex_03 + 1}. ${subCategory_03.refCategoryLabel}`}</span>
                                                          {subCategory_03.refQCategoryId == 21 ? (
                                                            (() => {
                                                              const scoreString = allScore.find(item => item.refQCategoryId == subCategory_03.refQCategoryId)?.refPTScore;

                                                              if (scoreString) {
                                                                const [hours, minutes] = scoreString.split(":").map(Number);
                                                                if (!isNaN(hours) && !isNaN(minutes)) {
                                                                  return <span>{`${hours} hrs ${minutes} min`}</span>;
                                                                }
                                                              }

                                                              return <span>{scoreString ?? 'No score'}</span>;

                                                            })()
                                                          ) : (
                                                            <span>{allScore.find(item => item.refQCategoryId == subCategory_03.refQCategoryId)?.refPTScore}</span>
                                                          )}
                                                        </div>
                                                      )}
                                                    </div>
                                                    <div
                                                      style={{
                                                        width: "100%",
                                                        borderBottom:
                                                          "1px solid lightgrey",
                                                      }}
                                                    ></div>
                                                  </>
                                                )
                                              )}
                                            </div>
                                          ) : ((subCategory_02.refQCategoryId == 9) ? (
                                            <div className="pastReport_AccCont_div2">
                                              {subCategory_02?.subcategories.map(
                                                (subCategory_03: any, subIndex_03: any) => (
                                                  <>
                                                    <div
                                                      className="pastReport_AccCont_div2_list"
                                                      key={subCategory_03.refQCategoryId}
                                                    >
                                                      <span>{`${subIndex_03 + 1}. ${subCategory_03.refCategoryLabel
                                                        }`}</span>

                                                      <div className="pastReport_AccCont_div2_sublist" style={{ flexDirection: "column" }}>
                                                        {(
                                                          allScore.find(
                                                            (item: { refQCategoryId: string }) =>
                                                              item.refQCategoryId === subCategory_03.refQCategoryId.toString()
                                                          )?.refPTScore || ''
                                                        )
                                                          .split(',')
                                                          .map((id: string) =>
                                                            stressAnswer.find(
                                                              (answer: { refOptionId: number; refOptionLabel: string }) =>
                                                                answer.refOptionId == Number(id)
                                                            )?.refOptionLabel || ''
                                                          )
                                                          .filter((label: string) => label) // Filter out any empty labels
                                                          .map((label: string, index: number) => (
                                                            <div key={index}>{label}</div>
                                                          ))
                                                        }
                                                      </div>

                                                    </div>
                                                    <div
                                                      style={{
                                                        width: "100%",
                                                        borderBottom:
                                                          "1px solid lightgrey",
                                                      }}
                                                    ></div>
                                                  </>
                                                )
                                              )}
                                            </div>
                                          ) : ((subCategory_02.refQCategoryId == 43) ? (
                                            <div className="pastReport_AccCont_div2">
                                              {subCategory_02?.subcategories.map(
                                                (subCategory_03: any, subIndex_03: any) => (
                                                  <>
                                                    <div
                                                      className="pastReport_AccCont_div2_list"
                                                      key={subCategory_03.refQCategoryId}
                                                    >
                                                      <span>{`${subIndex_03 + 1}. ${subCategory_03.refCategoryLabel
                                                        }`}</span>
                                                      {subCategory_03.subcategories.length > 0 ? (
                                                        <div>
                                                          {subCategory_03?.subcategories.map(
                                                            (subCategory_04: any, subIndex_04: any) => (
                                                              <div
                                                                className="pastReport_AccCont_div2_sublist"
                                                                key={subCategory_04.refQCategoryId}
                                                              >
                                                                <span>{subCategory_04.refCategoryLabel}</span>
                                                                <span>{allScore.find(item => item.refQCategoryId == subCategory_04.refQCategoryId)?.refPTScore}</span>
                                                              </div>
                                                            )
                                                          )}
                                                        </div>
                                                      ) : (
                                                        <div className="pastReport_AccCont_div2_sublist">
                                                          {subCategory_03.refQCategoryId == 47 ? (
                                                            <span>{allScore.find(item => item.refQCategoryId == subCategory_03.refQCategoryId)?.refPTScore + "%" + " - " + getSleepStatus(subCategory_03.refQCategoryId, allScore.find(item => item.refQCategoryId == subCategory_03.refQCategoryId)?.refPTScore)}</span>
                                                          ) : (
                                                            <span>{allScore.find(item => item.refQCategoryId == subCategory_03.refQCategoryId)?.refPTScore + " - " + getSleepStatus(subCategory_03.refQCategoryId, allScore.find(item => item.refQCategoryId == subCategory_03.refQCategoryId)?.refPTScore)}</span>
                                                          )}
                                                        </div>
                                                      )}

                                                    </div>
                                                    <div
                                                      style={{
                                                        width: "100%",
                                                        borderBottom:
                                                          "1px solid lightgrey",
                                                      }}
                                                    ></div>
                                                  </>
                                                )
                                              )}
                                            </div>
                                          ) : ((subCategory_02.refQCategoryId == 13) ? (
                                            <div className="pastReport_AccCont_div2">
                                              {subCategory_02?.subcategories.map(
                                                (subCategory_03: any, subIndex_03: any) => (
                                                  <>
                                                    <div
                                                      className="pastReport_AccCont_div2_list"
                                                      key={subCategory_03.refQCategoryId}
                                                    >
                                                      <span>{`${subIndex_03 + 1}. ${subCategory_03.refCategoryLabel
                                                        }`}</span>
                                                      {subCategory_03.subcategories.length > 0 ? (
                                                        <div>
                                                          {subCategory_03?.subcategories.map(
                                                            (subCategory_04: any, subIndex_04: any) => (
                                                              <div
                                                                className="pastReport_AccCont_div2_sublist"
                                                                key={subCategory_04.refQCategoryId}
                                                              >
                                                                <span>{subCategory_04.refCategoryLabel}</span>
                                                                <span>{allScore.find(item => item.refQCategoryId == subCategory_04.refQCategoryId)?.refPTScore}</span>
                                                              </div>
                                                            )
                                                          )}
                                                        </div>
                                                      ) : (
                                                        <div className="pastReport_AccCont_div2_sublist">
                                                          <span>{allScore.find(item => item.refQCategoryId == subCategory_03.refQCategoryId)?.refPTScore + " " +
                                                            getBMIstatus(subCategory_03.refQCategoryId, allScore.find(item => item.refQCategoryId == subCategory_03.refQCategoryId)?.refPTScore)}
                                                          </span>
                                                        </div>
                                                      )}

                                                    </div>
                                                    <div
                                                      style={{
                                                        width: "100%",
                                                        borderBottom:
                                                          "1px solid lightgrey",
                                                      }}
                                                    ></div>
                                                  </>
                                                )
                                              )}
                                            </div>
                                          ) : subCategory_02.refQCategoryId == 10 ? (
                                            <div className="pastReport_AccCont_div2">
                                              {subCategory_02?.subcategories.map(
                                                (subCategory_03: any, subIndex_03: any) => (
                                                  <>
                                                    <div
                                                      className="pastReport_AccCont_div2_list"
                                                      key={subCategory_03.refQCategoryId}
                                                    >
                                                      <span>{`${subIndex_03 + 1}. ${subCategory_03.refCategoryLabel
                                                        }`}</span>
                                                      {subCategory_03.subcategories.length > 0 ? (
                                                        <div>
                                                          {subCategory_03?.subcategories.map(
                                                            (subCategory_04: any, subIndex_04: any) => (
                                                              <div
                                                                className="pastReport_AccCont_div2_sublist"
                                                                key={subCategory_04.refQCategoryId}
                                                              >
                                                                <span>{subCategory_04.refCategoryLabel}</span>
                                                                <span>{allScore.find(item => item.refQCategoryId == subCategory_04.refQCategoryId)?.refPTScore}</span>
                                                              </div>
                                                            )
                                                          )}
                                                        </div>
                                                      ) : (
                                                        <div className="pastReport_AccCont_div2_sublist">
                                                          <span>{allScore.find(item => item.refQCategoryId == subCategory_03.refQCategoryId)?.refPTScore} {subCategory_03.refQCategoryId === 39 ? "PY" : ""} {getTobaccoStatus(subCategory_03.refQCategoryId, allScore.find(item => item.refQCategoryId == subCategory_03.refQCategoryId)?.refPTScore)}</span>
                                                        </div>
                                                      )}

                                                    </div>
                                                    <div
                                                      style={{
                                                        width: "100%",
                                                        borderBottom:
                                                          "1px solid lightgrey",
                                                      }}
                                                    ></div>
                                                  </>
                                                )
                                              )}
                                            </div>
                                          ) : subCategory_02.refQCategoryId == 12 ? (
                                            <>
                                              <Section title="Snack-Refresher-Starters" ids={[66, 67, 68, 69]} startIndex={-1} sectionIndex={1} subcategories={subCategory_02?.subcategories} />
                                              <Section title="Meal Composition" ids={[70, 71, 72, 73]} startIndex={-1} sectionIndex={2} subcategories={subCategory_02?.subcategories} />
                                              <Section title="Oil Intake" ids={[74, 75]} startIndex={-1} sectionIndex={3} subcategories={subCategory_02?.subcategories} />
                                              <Section title="Salt Intake" ids={[76, 77]} startIndex={-1} sectionIndex={4} subcategories={subCategory_02?.subcategories} />
                                              <Section title="Dairy Products" ids={[78]} startIndex={-1} sectionIndex={5} subcategories={subCategory_02?.subcategories} />
                                              <Section title="Meal Timing" ids={[79, 80]} startIndex={-1} sectionIndex={6} subcategories={subCategory_02?.subcategories} />
                                              <Section title="Meal Practices" ids={[81, 82, 83]} startIndex={-1} sectionIndex={7} subcategories={subCategory_02?.subcategories} />
                                            </>
                                          ) : (
                                            <div className="pastReport_AccCont_div2">
                                              {subCategory_02?.subcategories.map(
                                                (subCategory_03: any, subIndex_03: any) => (
                                                  <>
                                                    <div
                                                      className="pastReport_AccCont_div2_list"
                                                      key={subCategory_03.refQCategoryId}
                                                    >
                                                      <span>{`${subIndex_03 + 1}. ${subCategory_03.refCategoryLabel
                                                        }`}</span>
                                                      {subCategory_03.subcategories.length > 0 ? (
                                                        <div>
                                                          {subCategory_03?.subcategories.map(
                                                            (subCategory_04: any, subIndex_04: any) => (
                                                              <div
                                                                className="pastReport_AccCont_div2_sublist"
                                                                key={subCategory_04.refQCategoryId}
                                                              >
                                                                <span>{subCategory_04.refCategoryLabel}</span>
                                                                <span>{allScore.find(item => item.refQCategoryId == subCategory_04.refQCategoryId)?.refPTScore}</span>
                                                              </div>
                                                            )
                                                          )}
                                                        </div>
                                                      ) : (
                                                        <div className="pastReport_AccCont_div2_sublist">
                                                          <span>{allScore.find(item => item.refQCategoryId == subCategory_03.refQCategoryId)?.refPTScore}</span>
                                                        </div>
                                                      )}

                                                    </div>
                                                    <div
                                                      style={{
                                                        width: "100%",
                                                        borderBottom:
                                                          "1px solid lightgrey",
                                                      }}
                                                    ></div>
                                                  </>
                                                )
                                              )}
                                            </div>
                                          ))
                                          ))

                                          }
                                        </>) : (
                                        <>
                                          <div className="pastReport_AccCont_div1">
                                            <span>
                                              {subCategory_02.refCategoryLabel}
                                            </span>
                                            <span>
                                              {"No Data Filled"}
                                            </span>
                                          </div>
                                          <div
                                            style={{
                                              width: "100%",
                                              borderBottom: "1px solid #0c436c",
                                            }}
                                          ></div>
                                        </>
                                      )}

                                    </div>
                                  </>
                                )
                              )
                            ) : (
                              <p>No further subcategories</p> // Fallback if there are no subcategories
                            )}
                          </div>
                        )}

                        {(subCategory.refQCategoryId === 94) && (
                          <div slot="content">
                            {isValidCategory(subCategory.refQCategoryId) ? (
                              <div slot="content">
                                {subCategory.subcategories.map(
                                  (subCategory_02: any, subIndex_02: any) => (
                                    <>
                                      <div
                                        className="pastReport_AccCont"
                                        key={subCategory_02.refQCategoryId}
                                      >
                                        <div className="pastReport_AccCont_div1">
                                          <span>
                                            {subCategory_02.refCategoryLabel}
                                          </span>
                                          <span>
                                            {allScore.map((answer) => {
                                              if (answer.refQCategoryId === subCategory_02.refQCategoryId.toString()) {
                                                const totalScore: any = [];
                                                allScorVerify.forEach((scoresVerify) => {
                                                  if (scoresVerify.refQCategoryId == subCategory_02.refQCategoryId) {
                                                    totalScore.push(scoresVerify);
                                                  }
                                                }
                                                );
                                                return (
                                                  <div
                                                    key={answer.refQCategoryId}>
                                                    <ScoreVerify
                                                      userScoreVerify={totalScore} // Pass the totalScore directly
                                                      refScore={answer.refPTScore}
                                                    />
                                                  </div>
                                                );
                                              }
                                              return null;
                                            }
                                            )}

                                          </span>
                                        </div>
                                        <div
                                          style={{
                                            width: "100%",
                                            borderBottom: "1px solid #0c436c",
                                          }}
                                        ></div>
                                        <>

                                          <div className="pastReport_AccCont_div2">
                                            {subCategory_02?.subcategories.length > 0 ? (
                                              <>
                                                {subCategory_02?.subcategories.map(
                                                  (subCategory_03: any, subIndex_03: any) => (
                                                    <>
                                                      <div
                                                        className="pastReport_AccCont_div2_list"
                                                        key={subCategory_03.refQCategoryId}
                                                      >
                                                        <span>{`${subIndex_03 + 1}. ${subCategory_03.refCategoryLabel
                                                          }`}</span>
                                                        {subCategory_03.subcategories.length > 0 ? (
                                                          <div className="pastReport_AccCont_div2_sublist" style={{ display: "flex", flexDirection: "column", }}>
                                                            <span>{allScore.find(item => item.refQCategoryId == subCategory_03.refQCategoryId)?.refPTScore}</span>
                                                            <div>
                                                              {subCategory_03?.subcategories.map(
                                                                (subCategory_04: any, subIndex_04: any) => (
                                                                  <div
                                                                    className="pastReport_AccCont_div2_sublist"
                                                                    key={subCategory_04.refQCategoryId}
                                                                  >
                                                                    <span>{subCategory_04.refCategoryLabel}</span>
                                                                    <span>{allScore.find(item => item.refQCategoryId == subCategory_04.refQCategoryId)?.refPTScore}</span>
                                                                  </div>
                                                                )
                                                              )}
                                                            </div>
                                                          </div>
                                                        ) : (
                                                          <div className="pastReport_AccCont_div2_sublist">
                                                            <span>{allScore.find(item => item.refQCategoryId == subCategory_03.refQCategoryId)?.refPTScore}</span>
                                                          </div>
                                                        )}

                                                      </div>
                                                      <div
                                                        style={{
                                                          width: "100%",
                                                          borderBottom:
                                                            "1px solid lightgrey",
                                                        }}
                                                      ></div>
                                                    </>
                                                  )
                                                )}
                                              </>) : (<><span>{allScore.find(item => item.refQCategoryId == subCategory_02.refQCategoryId)?.refPTScore}</span></>)}

                                          </div></>


                                      </div>
                                    </>
                                  )
                                )
                                }
                              </div>
                            ) : (<div>{"No Data Filled"}</div>)}
                          </div>
                        )}

                        {(subCategory.refQCategoryId === 201) && (
                          <div slot="content">
                            {isValidCategory(subCategory.refQCategoryId) ? (
                              <div
                                className="pastReport_AccCont"
                                key={subCategory.refQCategoryId}
                              >
                                {treatmentDetails?.length > 0 ? (
                                  treatmentDetails.map((treatmentInfo, treatmentIndex) => (
                                    <div key={treatmentInfo.id}> {/* Make sure to use a unique key */}
                                      <div className="pastReport_AccCont_div1">
                                        <span>
                                          {subCategory.refCategoryLabel + " " + (treatmentIndex + 1)}
                                        </span>
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          borderBottom: "1px solid #0c436c",
                                        }}
                                      ></div>
                                      <>
                                        <div className="pastReport_AccCont_Treatment_div2">
                                          <div>
                                            <span>1. Name of Medicine</span>
                                            <span>{treatmentInfo.refTDMedName}</span>
                                          </div>
                                          <div style={{ width: "100%", paddingTop: "0.5rem", borderBottom: "1px solid lightgrey", }}></div>
                                        </div>
                                        <div className="pastReport_AccCont_Treatment_div2">
                                          <div>
                                            <span>2. Category</span>
                                            <span>{treatmentInfo.refTDCat}</span>
                                          </div>
                                          <div style={{ width: "100%", paddingTop: "0.5rem", borderBottom: "1px solid lightgrey", }}></div>
                                        </div>
                                        <div className="pastReport_AccCont_Treatment_div2">
                                          <div>
                                            <span>3. Strength (mg)</span>
                                            <span>{treatmentInfo.refTDStrength}</span>
                                          </div>
                                          <div style={{ width: "100%", paddingTop: "0.5rem", borderBottom: "1px solid lightgrey", }}></div>
                                        </div>
                                        <div className="pastReport_AccCont_Treatment_div2">
                                          <div>
                                            <span>4. ROA</span>
                                            <span>{treatmentInfo.refTDROA}</span>
                                          </div>
                                          <div style={{ width: "100%", paddingTop: "0.5rem", borderBottom: "1px solid lightgrey", }}></div>
                                        </div>
                                        <div className="pastReport_AccCont_Treatment_div2">
                                          <div>
                                            <span>5. Relation to Food</span>
                                            <span>{treatmentInfo.refTDRTF}</span>
                                          </div>
                                          <div style={{ width: "100%", paddingTop: "0.5rem", borderBottom: "1px solid lightgrey", }}></div>
                                        </div>

                                        <div className="pastReport_AccCont_Treatment_div2">
                                          <div>
                                            <span>6. Morning Dosage</span>
                                          </div>
                                          <div style={{ display: "flex", flexDirection: "column", marginLeft: "0.5rem" }}>
                                            <span>{"Dosage: " + (treatmentInfo.refTDMorningDosage ? treatmentInfo.refTDMorningDosage : "-")}</span>
                                            <span>{"Dosage Time: " + (treatmentInfo.refTDMorningDosageTime ? formatTime(new Date(treatmentInfo.refTDMorningDosageTime)) : "-")}</span>
                                          </div>
                                          <div style={{ width: "100%", paddingTop: "0.5rem", borderBottom: "1px solid lightgrey", }}></div>
                                        </div>

                                        <div className="pastReport_AccCont_Treatment_div2">
                                          <div>
                                            <span>7. Afternoon Dosage</span>
                                          </div>
                                          <div style={{ display: "flex", flexDirection: "column", marginLeft: "0.5rem" }}>
                                            <span>{"Dosage: " + (treatmentInfo.refTDAfternoonDosage ? treatmentInfo.refTDAfternoonDosage : "-")}</span>
                                            <span>{"Dosage Time: " + (treatmentInfo.refTDAfternoonDosageTime ? formatTime(new Date(treatmentInfo.refTDAfternoonDosageTime)) : "-")}</span>
                                          </div>
                                          <div style={{ width: "100%", paddingTop: "0.5rem", borderBottom: "1px solid lightgrey", }}></div>
                                        </div>

                                        <div className="pastReport_AccCont_Treatment_div2">
                                          <div>
                                            <span>8. Night Dosage</span>
                                          </div>
                                          <div style={{ display: "flex", flexDirection: "column", marginLeft: "0.5rem" }}>
                                            <span>{"Dosage: " + (treatmentInfo.refTDNightDosage ? treatmentInfo.refTDNightDosage : "-")}</span>
                                            <span>{"Dosage Time: " + (treatmentInfo.refTDNightDosageTime ? formatTime(new Date(treatmentInfo.refTDNightDosageTime)) : "-")}</span>
                                          </div>
                                          <div style={{ width: "100%", paddingTop: "0.5rem", borderBottom: "1px solid lightgrey", }}></div>
                                        </div>

                                        <div className="pastReport_AccCont_Treatment_div2">
                                          <div>
                                            <span>9. Duration</span>
                                          </div>
                                          <div style={{ display: "flex", flexDirection: "column", marginLeft: "0.5rem" }}>
                                            <span>{"Month: " + (treatmentInfo.refTDDurationMonth ? treatmentInfo.refTDDurationMonth : "-")}</span>
                                            <span>{"Year: " + (treatmentInfo.refTDDurationYear ? formatTime(new Date(treatmentInfo.refTDDurationYear)) : "-")}</span>
                                          </div>
                                          <div style={{ width: "100%", paddingTop: "0.5rem", borderBottom: "1px solid lightgrey", }}></div>
                                        </div>
                                      </>

                                    </div>
                                  ))
                                ) : (
                                  <></>
                                )}


                              </div>
                            ) : (<div>{"No Data Found"}</div>)}
                          </div>
                        )}
                      </IonAccordion>
                    )
                  )}
                </IonAccordionGroup>
              </div>

            </div>
          </IonContent>
        </>
      )}
    </IonPage>
  );
};

export default PastReport;
