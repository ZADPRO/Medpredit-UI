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

const PastReport: React.FC = () => {
  const history = useHistory();
  const modal = useRef<HTMLIonModalElement>(null);

  const { pastReport } = useParams<{
    pastReport: string;
  }>();

  const [loadingStatus, setLoadingStatus] = useState(true);

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

  useEffect(() => {
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
              employeeId: localStorage.getItem('currentDoctorId'),
              hospitalId: localStorage.getItem("hospitalId"),
              reportDate: pastReport
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

            console.log("====================================");
            console.log(data);
            console.log("====================================");

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


  const getValidateDuration = (questionId: any) => {
    switch (parseInt(questionId)) {
      case 94:
        return 1;
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


  function calculateDaysDifference(dateString: any) {
    // Convert the given date string to a Date object
    const givenDate: any = new Date(dateString);

    // Get the current date and set time to midnight for accurate day difference
    const currentDate: any = new Date(pastReport);
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


  function getLastDayOfMonth(yearMonth: any) {
    let [year, month] = yearMonth.split("-").map(Number);
    let lastDay = new Date(year, month, 0).getDate(); // Month is 0-indexed, so month 0 will be the last day of the previous month
    return `${String(lastDay).padStart(2, "0")}`;
  }

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
  }

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
          <IonHeader mode="ios">
            <IonToolbar className="pt-1 pb-1" mode="ios">
              <IonButtons
                onClick={() => {
                  history.goBack();
                }}
                slot="start"
              >
                <IonBackButton
                  mode="md"
                // defaultHref={`/knowAbout/${patient}/${patientId}`}
                ></IonBackButton>
              </IonButtons>
              <IonTitle>
                <div>
                  <div style={{ fontSize: "15px" }}>
                    {patientDetail.patientName} (Age: {patientDetail.age})
                  </div>
                  <div style={{ fontSize: "14px" }}>
                    {`Report Date: ${pastReport}`}
                  </div>
                </div>
              </IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent class="ion-padding" fullscreen>
            {/* <div
              style={{
                width: "100%",
                borderRadius: "5px",
                color: "#fff",
                fontWeight: "700",
                display: "flex",
                justifyContent: "flex-end",
              }}
              onClick={openModal}
            >
              <div
                style={{
                  fontSize: "25px",
                  background: "#1c70b0",
                  padding: "10px 10px 5px 10px",
                  borderRadius: "10px",
                }}
              >
                <FaUserDoctor />
              </div>
            </div> */}

            <IonModal
              isOpen={isOpen}
              id="doctorDetailsGraph"
              initialBreakpoint={1}
              onDidDismiss={closeModal}
              animated={false}
            >
              <div className="doctor-modal-content">
                {/* Header */}
                <div className="doctor-modal-header">Doctor Details</div>

                {/* Content */}
                <div className="doctor-modal-details">
                  <div>
                    Dr. {doctorDetail.doctorName} ({doctorDetail.doctorId})
                  </div>
                  <div>{doctorDetail.hospital},</div>
                  <div>{doctorDetail.hospitalAddress}</div>
                </div>

                {/* Close Button */}
                <button
                  className="doctor-modal-close-btn ion-activatable ripple-parent rectangle"
                  onClick={closeModal}
                >
                  <IonRippleEffect></IonRippleEffect>
                  Close
                </button>
              </div>
            </IonModal>

            <div>
              {allCategory && allCategory.length > 0
                ? allCategory.map((MainCategory: any) => (
                  <>
                    {MainCategory.refQSubCategory === "0" ? (
                      <div
                        style={{
                          background: "#f7f7f7",
                          padding: "10px",
                          borderRadius: "5px",
                          marginTop: "20px",
                          boxShadow:
                            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                        }}
                      >
                        <div style={{ fontSize: "16px" }}>
                          {MainCategory.refCategoryLabel}

                          <IonAccordionGroup>
                            {allCategory.map((subCategory) => {
                              const isMatchingCategory =
                                subCategory.refQSubCategory ===
                                MainCategory.refQCategoryId.toString();

                              return isMatchingCategory ? (
                                <>
                                  {localStorage
                                    .getItem("currentPatientGender")
                                    ?.toString() === "male" &&
                                    subCategory.refQCategoryId.toString() ===
                                    "5" ? (
                                    <></>
                                  ) : (
                                    <IonAccordion
                                      key={subCategory.refQCategoryId}
                                      value={subCategory.refQCategoryId}
                                    >
                                      <IonItem slot="header" color="light">
                                        <IonLabel>
                                          {subCategory.refCategoryLabel}
                                        </IonLabel>
                                      </IonItem>
                                      <div
                                        className="ion-padding"
                                        slot="content"
                                      >
                                        {allCategory.map(
                                          (category, index) => (
                                            <>
                                              {subCategory.refQCategoryId ===
                                                5 ||
                                                subCategory.refQCategoryId ===
                                                6 ||
                                                subCategory.refQCategoryId ===
                                                94 ? (
                                                <>
                                                  {index === 0 ? (
                                                    <>
                                                      {subCategory.refQCategoryId ===
                                                        94 ? (
                                                        <>
                                                          <div
                                                            style={{
                                                              textDecoration:
                                                                "underline",
                                                            }}
                                                          >
                                                            Insights
                                                          </div>
                                                          {getValidateDuration(
                                                            subCategory.refQCategoryId
                                                          ) >
                                                            -calculateDaysDifference(
                                                              allScore.some(
                                                                (answer) =>
                                                                  answer.refQCategoryId ===
                                                                  subCategory.refQCategoryId.toString()
                                                              ) &&
                                                              getValidateDuration(
                                                                subCategory.refQCategoryId
                                                              ) >
                                                              -calculateDaysDifference(
                                                                allScore.find(
                                                                  (
                                                                    answer
                                                                  ) =>
                                                                    answer.refQCategoryId ===
                                                                    subCategory.refQCategoryId.toString()
                                                                )
                                                                  .refPTcreatedDate
                                                              )
                                                            ) ? (
                                                            <div
                                                              style={{
                                                                marginTop:
                                                                  "10px",
                                                                display:
                                                                  "flex",
                                                                flexDirection:
                                                                  "column",
                                                                gap: "10px",
                                                                background:
                                                                  "#F2F9FF",
                                                                padding:
                                                                  "10px",
                                                                borderRadius:
                                                                  "5px",
                                                              }}
                                                            >
                                                              {allCategory
                                                                .filter(
                                                                  (
                                                                    insights
                                                                  ) =>
                                                                    insights.refQSubCategory ===
                                                                    subCategory.refQCategoryId.toString()
                                                                )
                                                                .map(
                                                                  (
                                                                    insights,
                                                                    bbb
                                                                  ) => (
                                                                    <div
                                                                      key={
                                                                        bbb
                                                                      }
                                                                      style={{
                                                                        marginTop:
                                                                          "10px",
                                                                      }}
                                                                    >
                                                                      <div
                                                                        style={{
                                                                          color:
                                                                            "red",
                                                                        }}
                                                                      >
                                                                        {
                                                                          insights.refCategoryLabel
                                                                        }
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          marginTop:
                                                                            "5px",
                                                                        }}
                                                                      >
                                                                        {allScore
                                                                          .filter(
                                                                            (
                                                                              answer
                                                                            ) =>
                                                                              answer.refQCategoryId ===
                                                                              insights.refQCategoryId.toString()
                                                                          )
                                                                          .map(
                                                                            (
                                                                              answer,
                                                                              aaa
                                                                            ) => (
                                                                              <>
                                                                                {aaa ===
                                                                                  0 ? (
                                                                                  <div
                                                                                    key={
                                                                                      aaa
                                                                                    }
                                                                                  >
                                                                                    {answer
                                                                                      .refPTScore
                                                                                      .length >
                                                                                      0
                                                                                      ? `${answer.refPTScore}`
                                                                                      : "NULL"}
                                                                                  </div>
                                                                                ) : null}

                                                                                {answer.refPTScore ===
                                                                                  "Yes" ? (
                                                                                  <>
                                                                                    {allCategory
                                                                                      .filter(
                                                                                        (
                                                                                          element
                                                                                        ) =>
                                                                                          element.refQSubCategory ===
                                                                                          insights.refQCategoryId.toString()
                                                                                      )
                                                                                      .map(
                                                                                        (
                                                                                          element,
                                                                                          idx
                                                                                        ) => (
                                                                                          <div
                                                                                            key={
                                                                                              idx
                                                                                            }
                                                                                            style={{
                                                                                              marginTop:
                                                                                                "10px",
                                                                                              color:
                                                                                                "red",
                                                                                            }}
                                                                                          >
                                                                                            {
                                                                                              element.refCategoryLabel
                                                                                            }
                                                                                            <div
                                                                                              style={{
                                                                                                marginTop:
                                                                                                  "5px",
                                                                                              }}
                                                                                            >
                                                                                              {allScore
                                                                                                .filter(
                                                                                                  (
                                                                                                    answer
                                                                                                  ) =>
                                                                                                    answer.refQCategoryId ===
                                                                                                    element.refQCategoryId.toString()
                                                                                                )
                                                                                                .map(
                                                                                                  (
                                                                                                    answer,
                                                                                                    index
                                                                                                  ) => (
                                                                                                    <>
                                                                                                      <div
                                                                                                        style={{
                                                                                                          color:
                                                                                                            "#000",
                                                                                                        }}
                                                                                                        key={
                                                                                                          index
                                                                                                        }
                                                                                                      >
                                                                                                        {answer
                                                                                                          .refPTScore
                                                                                                          .length >
                                                                                                          0
                                                                                                          ? answer.refPTScore
                                                                                                          : "NULL"}
                                                                                                      </div>
                                                                                                      <div></div>
                                                                                                      {answer.refQCategoryId ===
                                                                                                        "100" ||
                                                                                                        answer.refQCategoryId ===
                                                                                                        "108" ||
                                                                                                        answer.refQCategoryId ===
                                                                                                        "116" ||
                                                                                                        answer.refQCategoryId ===
                                                                                                        "124" ||
                                                                                                        answer.refQCategoryId ===
                                                                                                        "132" ||
                                                                                                        answer.refQCategoryId ===
                                                                                                        "140" ||
                                                                                                        answer.refQCategoryId ===
                                                                                                        "148" ||
                                                                                                        answer.refQCategoryId ===
                                                                                                        "156" ||
                                                                                                        answer.refQCategoryId ===
                                                                                                        "164" ||
                                                                                                        answer.refQCategoryId ===
                                                                                                        "172" ||
                                                                                                        answer.refQCategoryId ===
                                                                                                        "180" ||
                                                                                                        answer.refQCategoryId ===
                                                                                                        "188" ||
                                                                                                        answer.refQCategoryId ===
                                                                                                        "196" ? (
                                                                                                        <>
                                                                                                          {answer.refPTScore ===
                                                                                                            "Yes" ? (
                                                                                                            <>
                                                                                                              <div
                                                                                                                style={{
                                                                                                                  marginTop:
                                                                                                                    "5px",
                                                                                                                  display:
                                                                                                                    "flex",
                                                                                                                  flexDirection:
                                                                                                                    "column",
                                                                                                                  background:
                                                                                                                    "#F2F9FF",
                                                                                                                  paddingLeft:
                                                                                                                    "10px",
                                                                                                                  borderRadius:
                                                                                                                    "5px",
                                                                                                                }}
                                                                                                              >
                                                                                                                {allCategory
                                                                                                                  .filter(
                                                                                                                    (
                                                                                                                      subinsights
                                                                                                                    ) =>
                                                                                                                      subinsights.refQSubCategory ===
                                                                                                                      answer.refQCategoryId.toString()
                                                                                                                  )
                                                                                                                  .map(
                                                                                                                    (
                                                                                                                      insights,
                                                                                                                      bbb
                                                                                                                    ) => (
                                                                                                                      <div
                                                                                                                        key={
                                                                                                                          bbb
                                                                                                                        }
                                                                                                                        style={{
                                                                                                                          marginTop:
                                                                                                                            "10px",
                                                                                                                        }}
                                                                                                                      >
                                                                                                                        <div
                                                                                                                          style={{
                                                                                                                            color:
                                                                                                                              "red",
                                                                                                                          }}
                                                                                                                        >
                                                                                                                          {
                                                                                                                            insights.refCategoryLabel
                                                                                                                          }
                                                                                                                        </div>
                                                                                                                        <div
                                                                                                                          style={{
                                                                                                                            marginTop:
                                                                                                                              "5px",
                                                                                                                          }}
                                                                                                                        >
                                                                                                                          {allScore
                                                                                                                            .filter(
                                                                                                                              (
                                                                                                                                ansinsights
                                                                                                                              ) =>
                                                                                                                                ansinsights.refQCategoryId ===
                                                                                                                                insights.refQCategoryId.toString()
                                                                                                                            )
                                                                                                                            .map(
                                                                                                                              (
                                                                                                                                ansinsights,
                                                                                                                                index
                                                                                                                              ) => (
                                                                                                                                <>
                                                                                                                                  <div
                                                                                                                                    style={{
                                                                                                                                      color:
                                                                                                                                        "#000",
                                                                                                                                      paddingLeft:
                                                                                                                                        "10px",
                                                                                                                                    }}
                                                                                                                                    key={
                                                                                                                                      index
                                                                                                                                    }
                                                                                                                                  >
                                                                                                                                    {ansinsights
                                                                                                                                      .refPTScore
                                                                                                                                      .length >
                                                                                                                                      0
                                                                                                                                      ? ansinsights.refPTScore
                                                                                                                                      : "NULL"}
                                                                                                                                  </div>
                                                                                                                                </>
                                                                                                                              )
                                                                                                                            )}
                                                                                                                        </div>
                                                                                                                      </div>
                                                                                                                    )
                                                                                                                  )}
                                                                                                              </div>
                                                                                                            </>
                                                                                                          ) : null}
                                                                                                        </>
                                                                                                      ) : null}
                                                                                                    </>
                                                                                                  )
                                                                                                )}
                                                                                            </div>
                                                                                          </div>
                                                                                        )
                                                                                      )}
                                                                                  </>
                                                                                ) : null}
                                                                              </>
                                                                            )
                                                                          )}

                                                                        <Divider />
                                                                      </div>
                                                                    </div>
                                                                  )
                                                                )}
                                                            </div>
                                                          ) : (
                                                            <div
                                                              style={{
                                                                marginTop:
                                                                  "10px",
                                                              }}
                                                            >
                                                              No Data Filled
                                                            </div>
                                                          )}
                                                        </>
                                                      ) : (
                                                        <>
                                                          <div
                                                            style={{
                                                              textDecoration:
                                                                "underline",
                                                            }}
                                                          >
                                                            Insights
                                                          </div>
                                                          {allScore.some(
                                                            (answer) =>
                                                              answer.refQCategoryId ===
                                                              subCategory.refQCategoryId.toString()
                                                          ) &&
                                                            getValidateDuration(
                                                              subCategory.refQCategoryId
                                                            ) >
                                                            -calculateDaysDifference(
                                                              allScore.find(
                                                                (answer) =>
                                                                  answer.refQCategoryId ===
                                                                  subCategory.refQCategoryId.toString()
                                                              )
                                                                .refPTcreatedDate
                                                            ) ? (
                                                            <div
                                                              style={{
                                                                marginTop:
                                                                  "10px",
                                                                display:
                                                                  "flex",
                                                                flexDirection:
                                                                  "column",
                                                                gap: "10px",
                                                                background:
                                                                  "#F2F9FF",
                                                                padding:
                                                                  "10px",
                                                                borderRadius:
                                                                  "5px",
                                                              }}
                                                            >
                                                              {allCategory
                                                                .filter(
                                                                  (
                                                                    insights
                                                                  ) =>
                                                                    insights.refQSubCategory ===
                                                                    subCategory.refQCategoryId.toString()
                                                                )
                                                                .map(
                                                                  (
                                                                    insights,
                                                                    bbb
                                                                  ) => (
                                                                    <div
                                                                      key={
                                                                        bbb
                                                                      }
                                                                      style={{
                                                                        marginTop:
                                                                          "10px",
                                                                      }}
                                                                    >
                                                                      <div
                                                                        style={{
                                                                          color:
                                                                            "red",
                                                                        }}
                                                                      >
                                                                        {
                                                                          insights.refCategoryLabel
                                                                        }
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          marginTop:
                                                                            "5px",
                                                                        }}
                                                                      >
                                                                        {allScore
                                                                          .filter(
                                                                            (
                                                                              answer
                                                                            ) =>
                                                                              answer.refQCategoryId ===
                                                                              insights.refQCategoryId.toString()
                                                                          )
                                                                          .map(
                                                                            (
                                                                              answer,
                                                                              aaa
                                                                            ) => (
                                                                              <>
                                                                                {aaa ===
                                                                                  0 ? (
                                                                                  <div
                                                                                    key={
                                                                                      aaa
                                                                                    }
                                                                                  >
                                                                                    {answer
                                                                                      .refPTScore
                                                                                      .length >
                                                                                      0
                                                                                      ? `${answer.refPTScore}`
                                                                                      : "NULL"}
                                                                                  </div>
                                                                                ) : null}
                                                                              </>
                                                                            )
                                                                          )}
                                                                        {allCategory
                                                                          .filter(
                                                                            (
                                                                              element
                                                                            ) =>
                                                                              element.refQSubCategory ===
                                                                              insights.refQCategoryId.toString()
                                                                          )
                                                                          .map(
                                                                            (
                                                                              element,
                                                                              idx
                                                                            ) => (
                                                                              <div
                                                                                key={
                                                                                  idx
                                                                                }
                                                                                style={{
                                                                                  marginTop:
                                                                                    "10px",
                                                                                  color:
                                                                                    "red",
                                                                                }}
                                                                              >
                                                                                {
                                                                                  element.refCategoryLabel
                                                                                }
                                                                                <div
                                                                                  style={{
                                                                                    marginTop:
                                                                                      "5px",
                                                                                  }}
                                                                                >
                                                                                  {allScore
                                                                                    .filter(
                                                                                      (
                                                                                        answer
                                                                                      ) =>
                                                                                        answer.refQCategoryId ===
                                                                                        element.refQCategoryId.toString()
                                                                                    )
                                                                                    .map(
                                                                                      (
                                                                                        answer,
                                                                                        index
                                                                                      ) => (
                                                                                        <div
                                                                                          key={
                                                                                            index
                                                                                          }
                                                                                        >
                                                                                          {answer
                                                                                            .refPTScore
                                                                                            .length >
                                                                                            0
                                                                                            ? answer.refPTScore
                                                                                            : "NULL"}
                                                                                        </div>
                                                                                      )
                                                                                    )}
                                                                                </div>
                                                                              </div>
                                                                            )
                                                                          )}
                                                                      </div>
                                                                    </div>
                                                                  )
                                                                )}
                                                            </div>
                                                          ) : (
                                                            <div
                                                              style={{
                                                                marginTop:
                                                                  "10px",
                                                              }}
                                                            >
                                                              No Data Filled
                                                            </div>
                                                          )}
                                                        </>
                                                      )}
                                                    </>
                                                  ) : null}
                                                </>
                                              ) : subCategory.refQCategoryId ===
                                                201 ? (
                                                <>
                                                  {index === 0 ? (
                                                    <>
                                                      {treatmentDetails.length >
                                                        0 ? (
                                                        <>
                                                          {treatmentDetails.map(
                                                            (
                                                              details,
                                                              index
                                                            ) => (
                                                              <>
                                                                <div>
                                                                  <div
                                                                    style={{
                                                                      color:
                                                                        "red",
                                                                    }}
                                                                  >
                                                                    Name of
                                                                    Medicine
                                                                  </div>
                                                                  <div
                                                                    style={{
                                                                      marginTop:
                                                                        "5px",
                                                                    }}
                                                                  >
                                                                    {
                                                                      details.refTDMedName
                                                                    }
                                                                  </div>
                                                                  <div
                                                                    style={{
                                                                      color:
                                                                        "red",
                                                                      marginTop:
                                                                        "10px",
                                                                    }}
                                                                  >
                                                                    Category
                                                                  </div>
                                                                  <div
                                                                    style={{
                                                                      marginTop:
                                                                        "5px",
                                                                    }}
                                                                  >
                                                                    {
                                                                      details.refTDCat
                                                                    }
                                                                  </div>
                                                                  <div
                                                                    style={{
                                                                      color:
                                                                        "red",
                                                                      marginTop:
                                                                        "10px",
                                                                    }}
                                                                  >
                                                                    Strength
                                                                    (mg)
                                                                  </div>
                                                                  <div
                                                                    style={{
                                                                      marginTop:
                                                                        "5px",
                                                                    }}
                                                                  >
                                                                    {
                                                                      details.refTDStrength
                                                                    }
                                                                  </div>
                                                                  <div
                                                                    style={{
                                                                      color:
                                                                        "red",
                                                                      marginTop:
                                                                        "10px",
                                                                    }}
                                                                  >
                                                                    ROA
                                                                  </div>
                                                                  <div
                                                                    style={{
                                                                      marginTop:
                                                                        "5px",
                                                                    }}
                                                                  >
                                                                    {
                                                                      details.refTDROA
                                                                    }
                                                                  </div>
                                                                  <div
                                                                    style={{
                                                                      color:
                                                                        "red",
                                                                      marginTop:
                                                                        "10px",
                                                                    }}
                                                                  >
                                                                    Relation
                                                                    to Food
                                                                  </div>
                                                                  <div
                                                                    style={{
                                                                      marginTop:
                                                                        "5px",
                                                                    }}
                                                                  >
                                                                    {
                                                                      details.refTDRTF
                                                                    }
                                                                  </div>
                                                                  <div
                                                                    style={{
                                                                      color:
                                                                        "red",
                                                                      marginTop:
                                                                        "10px",
                                                                    }}
                                                                  >
                                                                    Morning
                                                                    Dosage
                                                                  </div>
                                                                  <div
                                                                    style={{
                                                                      marginTop:
                                                                        "5px",
                                                                    }}
                                                                  >
                                                                    {details.refTDMorningDosage
                                                                      ? details.refTDMorningDosage
                                                                      : "No answer"}
                                                                    ,&nbsp;
                                                                    {details.refTDMorningDosageTime
                                                                      ? formatTime(
                                                                        new Date(
                                                                          details.refTDMorningDosageTime
                                                                        )
                                                                      )
                                                                      : "No answer"}
                                                                  </div>
                                                                  <div
                                                                    style={{
                                                                      color:
                                                                        "red",
                                                                      marginTop:
                                                                        "10px",
                                                                    }}
                                                                  >
                                                                    Afternoon
                                                                    Dosage
                                                                  </div>
                                                                  <div
                                                                    style={{
                                                                      marginTop:
                                                                        "5px",
                                                                    }}
                                                                  >
                                                                    {details.refTDAfternoonDosage
                                                                      ? details.refTDAfternoonDosage
                                                                      : "No answer"}
                                                                    ,&nbsp;
                                                                    {details.refTDAfternoonDosageTime
                                                                      ? formatTime(
                                                                        new Date(
                                                                          details.refTDAfternoonDosageTime
                                                                        )
                                                                      )
                                                                      : "No answer"}
                                                                  </div>
                                                                  <div
                                                                    style={{
                                                                      color:
                                                                        "red",
                                                                      marginTop:
                                                                        "10px",
                                                                    }}
                                                                  >
                                                                    Evening
                                                                    Dosage
                                                                  </div>
                                                                  <div
                                                                    style={{
                                                                      marginTop:
                                                                        "5px",
                                                                    }}
                                                                  >
                                                                    {details.refTDEveningDosage
                                                                      ? details.refTDEveningDosage
                                                                      : "No answer"}
                                                                    ,&nbsp;
                                                                    {details.refTDEveningDosageTime
                                                                      ? formatTime(
                                                                        new Date(
                                                                          details.refTDEveningDosageTime
                                                                        )
                                                                      )
                                                                      : "No answer"}
                                                                  </div>
                                                                  <div
                                                                    style={{
                                                                      color:
                                                                        "red",
                                                                      marginTop:
                                                                        "10px",
                                                                    }}
                                                                  >
                                                                    Night
                                                                    Dosage
                                                                  </div>
                                                                  <div
                                                                    style={{
                                                                      marginTop:
                                                                        "5px",
                                                                    }}
                                                                  >
                                                                    {details.refTDNightDosage
                                                                      ? details.refTDNightDosage
                                                                      : "No answer"}
                                                                    ,&nbsp;
                                                                    {details.refTDNightDosageTime
                                                                      ? formatTime(
                                                                        new Date(
                                                                          details.refTDNightDosageTime
                                                                        )
                                                                      )
                                                                      : "No answer"}
                                                                  </div>
                                                                  <div
                                                                    style={{
                                                                      color:
                                                                        "red",
                                                                      marginTop:
                                                                        "10px",
                                                                    }}
                                                                  >
                                                                    Duration
                                                                  </div>
                                                                  <div
                                                                    style={{
                                                                      display:
                                                                        "flex",
                                                                      justifyContent:
                                                                        "space-between",
                                                                      padding:
                                                                        "0px 10%",
                                                                    }}
                                                                  >
                                                                    <div
                                                                      style={{
                                                                        marginTop:
                                                                          "5px",
                                                                      }}
                                                                    >
                                                                      Month:{" "}
                                                                      {
                                                                        details.refTDDurationMonth
                                                                      }
                                                                    </div>
                                                                    <div
                                                                      style={{
                                                                        marginTop:
                                                                          "5px",
                                                                      }}
                                                                    >
                                                                      Year:{" "}
                                                                      {
                                                                        details.refTDDurationYear
                                                                      }
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                                <Divider />
                                                              </>
                                                            )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <>
                                                          No Treatment Details
                                                          Available
                                                        </>
                                                      )}
                                                    </>
                                                  ) : null}
                                                </>
                                              ) : (
                                                <>
                                                  {category.refQSubCategory ===
                                                    subCategory.refQCategoryId.toString() ? (
                                                    <IonAccordionGroup>
                                                      <IonAccordion
                                                        key={
                                                          category.refQCategoryId
                                                        }
                                                        value={
                                                          category.refQCategoryId
                                                        }
                                                      >
                                                        <IonItem
                                                          slot="header"
                                                          color="light"
                                                        >
                                                          <IonLabel>
                                                            {
                                                              category.refCategoryLabel
                                                            }
                                                          </IonLabel>
                                                        </IonItem>
                                                        <div
                                                          className="ion-padding"
                                                          slot="content"
                                                        >
                                                          {category.refQCategoryId ===
                                                            51 ? (
                                                            <></>
                                                          ) : (
                                                            <>
                                                              {allScore.some(
                                                                (answer) =>
                                                                  answer.refQCategoryId ===
                                                                  category.refQCategoryId.toString()
                                                              ) &&
                                                                getValidateDuration(
                                                                  category.refQCategoryId
                                                                ) >
                                                                -calculateDaysDifference(
                                                                  allScore.find(
                                                                    (
                                                                      answer
                                                                    ) =>
                                                                      answer.refQCategoryId ===
                                                                      category.refQCategoryId.toString()
                                                                  )
                                                                    .refPTcreatedDate
                                                                ) ? (
                                                                <>
                                                                  <div
                                                                    style={{
                                                                      display:
                                                                        "flex",
                                                                      justifyContent:
                                                                        "space-between",
                                                                    }}
                                                                  >
                                                                    <div
                                                                      style={{
                                                                        textDecoration:
                                                                          "underline",
                                                                      }}
                                                                    >
                                                                      Summary
                                                                    </div>
                                                                    <div>
                                                                      {allScore.map(
                                                                        (
                                                                          answer
                                                                        ) => {
                                                                          if (
                                                                            answer.refQCategoryId ===
                                                                            category.refQCategoryId.toString()
                                                                          ) {
                                                                            const totalScore: any =
                                                                              [];

                                                                            allScorVerify.forEach(
                                                                              (
                                                                                scoresVerify
                                                                              ) => {
                                                                                if (
                                                                                  scoresVerify.refQCategoryId ==
                                                                                  category.refQCategoryId
                                                                                ) {
                                                                                  totalScore.push(
                                                                                    scoresVerify
                                                                                  );
                                                                                }
                                                                              }
                                                                            );

                                                                            return (
                                                                              <div
                                                                                key={
                                                                                  answer.refQCategoryId
                                                                                }
                                                                              >
                                                                                <ScoreVerify
                                                                                  userScoreVerify={
                                                                                    totalScore
                                                                                  } // Pass the totalScore directly
                                                                                  refScore={
                                                                                    answer.refPTScore
                                                                                  }
                                                                                />
                                                                              </div>
                                                                            );
                                                                          }
                                                                          return null;
                                                                        }
                                                                      )}
                                                                    </div>
                                                                  </div>
                                                                  <Divider />
                                                                </>
                                                              ) : null}
                                                            </>
                                                          )}
                                                          {allScore.some(
                                                            (answer) =>
                                                              answer.refQCategoryId ===
                                                              category.refQCategoryId.toString()
                                                          ) &&
                                                            getValidateDuration(
                                                              category.refQCategoryId
                                                            ) >
                                                            -calculateDaysDifference(
                                                              allScore.find(
                                                                (answer) =>
                                                                  answer.refQCategoryId ===
                                                                  category.refQCategoryId.toString()
                                                              )
                                                                .refPTcreatedDate
                                                            ) ? (
                                                            <>
                                                              <div
                                                                style={{
                                                                  textDecoration:
                                                                    "underline",
                                                                }}
                                                              >
                                                                Insights
                                                              </div>
                                                              <div
                                                                style={{
                                                                  marginTop:
                                                                    "10px",
                                                                  display:
                                                                    "flex",
                                                                  flexDirection:
                                                                    "column",
                                                                  gap: "10px",
                                                                  background:
                                                                    "#F2F9FF",
                                                                  padding:
                                                                    "10px",
                                                                  borderRadius:
                                                                    "5px",
                                                                }}
                                                              >
                                                                {allCategory.map(
                                                                  (
                                                                    insights
                                                                  ) => (
                                                                    <>
                                                                      {insights.refQSubCategory ===
                                                                        category.refQCategoryId.toString() ? (
                                                                        <>
                                                                          <div
                                                                            style={{
                                                                              marginTop:
                                                                                "10px",
                                                                            }}
                                                                          >
                                                                            <div
                                                                              style={{
                                                                                color:
                                                                                  "red",
                                                                              }}
                                                                            >
                                                                              {
                                                                                insights.refCategoryLabel
                                                                              }
                                                                            </div>
                                                                            <div
                                                                              style={{
                                                                                marginTop:
                                                                                  "5px",
                                                                              }}
                                                                            >
                                                                              {allScore.map(
                                                                                (
                                                                                  answer
                                                                                ) =>
                                                                                  answer.refQCategoryId ===
                                                                                    insights.refQCategoryId.toString() ? (
                                                                                    <>
                                                                                      {answer.refQCategoryId ===
                                                                                        "21" ? (
                                                                                        <>
                                                                                          {answer
                                                                                            .refPTScore
                                                                                            .length >
                                                                                            0 ? (
                                                                                            <>
                                                                                              {
                                                                                                answer.refPTScore.split(
                                                                                                  ":"
                                                                                                )[0]
                                                                                              }{" "}
                                                                                              hrs{" "}
                                                                                              {
                                                                                                answer.refPTScore.split(
                                                                                                  ":"
                                                                                                )[1]
                                                                                              }{" "}
                                                                                              mins
                                                                                            </>
                                                                                          ) : (
                                                                                            <>
                                                                                              Null
                                                                                            </>
                                                                                          )}
                                                                                        </>
                                                                                      ) : answer.refQCategoryId ===
                                                                                        "25" ||
                                                                                        answer.refQCategoryId ===
                                                                                        "26" ||
                                                                                        answer.refQCategoryId ===
                                                                                        "27" ||
                                                                                        answer.refQCategoryId ===
                                                                                        "28" ? (
                                                                                        <>
                                                                                          {answer.refPTScore
                                                                                            .split(
                                                                                              ","
                                                                                            )
                                                                                            .map(
                                                                                              (
                                                                                                score: any,
                                                                                                index: any
                                                                                              ) => (
                                                                                                <div
                                                                                                  key={
                                                                                                    index
                                                                                                  }
                                                                                                  style={{
                                                                                                    marginTop:
                                                                                                      "",
                                                                                                  }}
                                                                                                >
                                                                                                  {index +
                                                                                                    1}

                                                                                                  .{" "}
                                                                                                  {
                                                                                                    stressAnswer.find(
                                                                                                      (
                                                                                                        ans: any
                                                                                                      ) =>
                                                                                                        ans.refOptionId.toString() ===
                                                                                                        score
                                                                                                    )
                                                                                                      ?.refOptionLabel
                                                                                                  }
                                                                                                </div>
                                                                                              )
                                                                                            )}
                                                                                        </>
                                                                                      ) : (
                                                                                        <>
                                                                                          {answer
                                                                                            .refPTScore
                                                                                            .length >
                                                                                            0 ? (
                                                                                            <>
                                                                                              {
                                                                                                answer.refPTScore
                                                                                              }
                                                                                            </>
                                                                                          ) : (
                                                                                            <>
                                                                                              Null
                                                                                            </>
                                                                                          )}
                                                                                        </>
                                                                                      )}
                                                                                    </>
                                                                                  ) : null
                                                                              )}

                                                                              <>
                                                                                {allCategory.map(
                                                                                  (
                                                                                    element
                                                                                  ) =>
                                                                                    element.refQSubCategory ===
                                                                                      insights.refQCategoryId.toString() ? (
                                                                                      <>
                                                                                        <div
                                                                                          style={{
                                                                                            marginTop:
                                                                                              "10px",
                                                                                            color:
                                                                                              "red",
                                                                                          }}
                                                                                        >
                                                                                          {
                                                                                            element.refCategoryLabel
                                                                                          }
                                                                                        </div>
                                                                                        <div
                                                                                          style={{
                                                                                            marginTop:
                                                                                              "5px",
                                                                                          }}
                                                                                        >
                                                                                          {allScore.map(
                                                                                            (
                                                                                              answer
                                                                                            ) =>
                                                                                              answer.refQCategoryId ===
                                                                                                element.refQCategoryId.toString() ? (
                                                                                                <>
                                                                                                  {answer
                                                                                                    .refPTScore
                                                                                                    .length >
                                                                                                    0 ? (
                                                                                                    <>
                                                                                                      {
                                                                                                        answer.refPTScore
                                                                                                      }
                                                                                                    </>
                                                                                                  ) : (
                                                                                                    <>
                                                                                                      NULL
                                                                                                    </>
                                                                                                  )}

                                                                                                  <>
                                                                                                    {allCategory.map(
                                                                                                      (
                                                                                                        val
                                                                                                      ) =>
                                                                                                        val.refQSubCategory ===
                                                                                                          answer.refQCategoryId.toString() ? (
                                                                                                          <>
                                                                                                            <div
                                                                                                              style={{
                                                                                                                marginTop:
                                                                                                                  "10px",
                                                                                                                color:
                                                                                                                  "red",
                                                                                                              }}
                                                                                                            >
                                                                                                              {
                                                                                                                val.refCategoryLabel
                                                                                                              }
                                                                                                            </div>
                                                                                                            <div
                                                                                                              style={{
                                                                                                                marginTop:
                                                                                                                  "5px",
                                                                                                              }}
                                                                                                            >
                                                                                                              {allScore.map(
                                                                                                                (
                                                                                                                  ans
                                                                                                                ) =>
                                                                                                                  ans.refQCategoryId ===
                                                                                                                    val.refQCategoryId.toString() ? (
                                                                                                                    <>
                                                                                                                      {answer
                                                                                                                        .refPTScore
                                                                                                                        .length >
                                                                                                                        0 ? (
                                                                                                                        <>
                                                                                                                          {
                                                                                                                            ans.refPTScore
                                                                                                                          }
                                                                                                                        </>
                                                                                                                      ) : (
                                                                                                                        <>
                                                                                                                          NULL
                                                                                                                        </>
                                                                                                                      )}
                                                                                                                    </>
                                                                                                                  ) : null
                                                                                                              )}
                                                                                                            </div>
                                                                                                          </>
                                                                                                        ) : (
                                                                                                          <>

                                                                                                          </>
                                                                                                        )
                                                                                                    )}
                                                                                                  </>
                                                                                                </>
                                                                                              ) : null
                                                                                          )}
                                                                                        </div>
                                                                                      </>
                                                                                    ) : (
                                                                                      <>

                                                                                      </>
                                                                                    )
                                                                                )}
                                                                              </>
                                                                              <Divider />
                                                                            </div>
                                                                          </div>
                                                                        </>
                                                                      ) : null}
                                                                    </>
                                                                  )
                                                                )}
                                                                {category.refQCategoryId ===
                                                                  202 ||
                                                                  203 ||
                                                                  204 ||
                                                                  205 ||
                                                                  206 ||
                                                                  224 ? (
                                                                  <>
                                                                    <Graph
                                                                      data={
                                                                        category.refQCategoryId ===
                                                                          202
                                                                          ? rbs
                                                                          : category.refQCategoryId ===
                                                                            203
                                                                            ? fbs
                                                                            : category.refQCategoryId ===
                                                                              204
                                                                              ? ppbs
                                                                              : category.refQCategoryId ===
                                                                                205
                                                                                ? ogtt
                                                                                : category.refQCategoryId ===
                                                                                  206
                                                                                  ? gct
                                                                                  : category.refQCategoryId ===
                                                                                    207
                                                                                    ? hba1c
                                                                                    : category.refQCategoryId ===
                                                                                      213
                                                                                      ? fastingcholesterol
                                                                                      : category.refQCategoryId ===
                                                                                        214
                                                                                        ? fastingtriglycerides
                                                                                        : category.refQCategoryId ===
                                                                                          215
                                                                                          ? hdl
                                                                                          : category.refQCategoryId ===
                                                                                            216
                                                                                            ? ldl
                                                                                            : category.refQCategoryId ===
                                                                                              217
                                                                                              ? tchdl
                                                                                              : category.refQCategoryId ===
                                                                                                218
                                                                                                ? bloodurea
                                                                                                : category.refQCategoryId ===
                                                                                                  219
                                                                                                  ? serum
                                                                                                  : category.refQCategoryId ===
                                                                                                    220
                                                                                                    ? egfr
                                                                                                    : category.refQCategoryId ===
                                                                                                      221
                                                                                                      ? urinesugar
                                                                                                      : category.refQCategoryId ===
                                                                                                        222
                                                                                                        ? urinealbumin
                                                                                                        : category.refQCategoryId ===
                                                                                                          223
                                                                                                          ? urineketones
                                                                                                          : null
                                                                      }
                                                                      label={
                                                                        category.refQCategoryId ===
                                                                          202
                                                                          ? "RBS (CBS)"
                                                                          : category.refQCategoryId ===
                                                                            203
                                                                            ? "FBS"
                                                                            : category.refQCategoryId ===
                                                                              204
                                                                              ? "PPBS"
                                                                              : category.refQCategoryId ===
                                                                                205
                                                                                ? "OGTT"
                                                                                : category.refQCategoryId ===
                                                                                  206
                                                                                  ? "GCT"
                                                                                  : category.refQCategoryId ===
                                                                                    207
                                                                                    ? "HBA1c"
                                                                                    : category.refQCategoryId ===
                                                                                      213
                                                                                      ? "Fasting Total Cholesterol"
                                                                                      : category.refQCategoryId ===
                                                                                        214
                                                                                        ? "Fasting total Triglycerides"
                                                                                        : category.refQCategoryId ===
                                                                                          215
                                                                                          ? "HDL - Cholesterol"
                                                                                          : category.refQCategoryId ===
                                                                                            216
                                                                                            ? "LDL - Cholesterol"
                                                                                            : category.refQCategoryId ===
                                                                                              217
                                                                                              ? "TC: HDL ratio"
                                                                                              : category.refQCategoryId ===
                                                                                                218
                                                                                                ? "Blood urea"
                                                                                                : category.refQCategoryId ===
                                                                                                  219
                                                                                                  ? "Serum creatinine"
                                                                                                  : category.refQCategoryId ===
                                                                                                    220
                                                                                                    ? "eGFR"
                                                                                                    : category.refQCategoryId ===
                                                                                                      221
                                                                                                      ? "Urine- sugar"
                                                                                                      : category.refQCategoryId ===
                                                                                                        222
                                                                                                        ? "Urine Albumin"
                                                                                                        : category.refQCategoryId ===
                                                                                                          223
                                                                                                          ? "Urine ketones"
                                                                                                          : ""
                                                                      }
                                                                    />
                                                                  </>
                                                                ) : null}

                                                                {category.refQCategoryId ===
                                                                  224 ? (
                                                                  <>
                                                                    <Graph
                                                                      data={
                                                                        kr
                                                                      }
                                                                      label="Kidney Right"
                                                                    />
                                                                    <Graph
                                                                      data={
                                                                        kl
                                                                      }
                                                                      label="Kidney Left"
                                                                    />
                                                                    <Graph
                                                                      data={
                                                                        echo
                                                                      }
                                                                      label="Echogenicity"
                                                                    />
                                                                    <Graph
                                                                      data={
                                                                        cortico
                                                                      }
                                                                      label="Cortico Medulary Differentiation"
                                                                    />
                                                                  </>
                                                                ) : null}
                                                              </div>
                                                            </>
                                                          ) : (
                                                            <>
                                                              No Data Filled
                                                            </>
                                                          )}
                                                        </div>
                                                      </IonAccordion>
                                                    </IonAccordionGroup>
                                                  ) : null}
                                                </>
                                              )}
                                            </>
                                          )
                                        )}
                                      </div>
                                    </IonAccordion>
                                  )}
                                </>
                              ) : null;
                            })}
                          </IonAccordionGroup>
                        </div>
                      </div>
                    ) : null}
                  </>
                ))
                : null}
            </div>
          </IonContent>
          <IonFooter>
            <IonToolbar>
              <ReportPDF reportDate={pastReport} />
            </IonToolbar>
          </IonFooter>
        </>
      )}
    </IonPage>
  );
};

export default PastReport;
