import {
  IonAccordion,
  IonAccordionGroup,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonPopover,
  IonRippleEffect,
  IonSegment,
  IonSegmentButton,
  IonSegmentContent,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import "./KnowAboutPatient.css";
import { useHistory, useParams } from "react-router-dom";
import KnowCards from "../../pages/KnowCards/KnowCards";
import axios from "axios";
import decrypt from "../../helper";

import { IoChevronForward } from "react-icons/io5";

import report from "../../assets/images/reports.png";
import { Divider } from "primereact/divider";
import { InputNumber } from "primereact/inputnumber";
import MonthYearPicker from "../../pages/DateInput/MonthYear";
import DateSelector from "../../pages/DateSelector/DateSelector";
import { arrowForward, chevronBack } from "ionicons/icons";

const KnowAboutPatient: React.FC = () => {
  const history = useHistory();
  const { patient, patientId } = useParams<{
    patient: string;
    patientId: string;
  }>();

  const [isExpanded, setIsExpanded] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [reportLoading, setReportLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const yearPickerRef = useRef(null);

  useEffect(() => {
    const getSubCategory = {
      id: patientId,
      label: patient,
    };

    localStorage.setItem("getSubCategory", JSON.stringify(getSubCategory));
  }, []);

  const [categories, setCategories] = useState<
    { refQCategoryId: number; refCategoryLabel: string }[]
  >([]);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [subCategoryData, setSubCategoryData] = useState<
    { refQCategoryId: number; refCategoryLabel: string }[]
  >([]);
  const tokenString: any = localStorage.getItem("userDetails");

  const [latestReport, setLatestReport] = useState<any>(null);

  const tokenObject = JSON.parse(tokenString);
  const token = tokenObject.token;

  interface Report {
    refptcreateddate: string;
    multipleDate: any[];
    refPMId: any;
  }

  const [overAllLoading, setOverAllLoading] = useState(true);

  const [pastreport, setPastReport] = useState("");

  useEffect(() => {
    if (tokenString) {
      try {
        axios
          .post(
            `${import.meta.env.VITE_API_URL}/getMainCategory`,
            {
              patientId: patientId,
              employeeId: localStorage.getItem("currentDoctorId")
                ? localStorage.getItem("currentDoctorId")
                : null,
              hospitalId: localStorage.getItem("hospitalId"),
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
            setSelectedValue("knowabout");

            if (data.data) {
              setCategories(data.data);
              categories.push({
                refQCategoryId: 4,
                refCategoryLabel: "Know About Patient",
              });
              getReport();

              const firstCategory = data.data[0];
              subMainCategory(firstCategory.refQCategoryId);
            } else {
              subMainCategory(4);
              getReport();
            }
            setOverAllLoading(false);
          });
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    }
  }, [history.location.pathname]);

  const subMainCategory = async (categoryId: number) => {
    try {
      setLoadingStatus(true);
      const subCategory = await axios.post(
        `${import.meta.env.VITE_API_URL}/getSubMainCategory`,
        {
          patientId: patientId,
          SubCategoryId: categoryId,
          employeeId: localStorage.getItem("currentDoctorId")
            ? localStorage.getItem("currentDoctorId")
            : null,
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      const data = decrypt(
        subCategory.data[1],
        subCategory.data[0],
        import.meta.env.VITE_ENCRYPTION_KEY
      );

      if (data.status) {
        setSubCategoryData(data.data);
        setLatestReport(data.reportAnswer);
        console.log("################", data);
        setLoadingStatus(false);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const handleSegmentChange = (value: any) => {
    setSelectedValue(value);

    localStorage.setItem("getMainCat", value);

    const selectedCategory = categories.find(
      (category) => category.refCategoryLabel === value
    );

    if (value === "knowabout") {
      console.log("-------------Hello");
      getReport();
    } else {
      if (selectedCategory) {
        subMainCategory(selectedCategory.refQCategoryId);
      }
    }
  };

  const currentMonth = new Date().getMonth() + 1; // Get current month (1-based)
const currentYear = new Date().getFullYear();

  const handleReportFilter = (year: any) => {
    console.log(
      "Selected Year:",
      year
    );
    setSelectedYear(
      String(year)
    );
    setIsExpanded(true);
    setSelectedMonth("");
    setShowYearPicker(false);
  }

  useEffect(() => {
    handleReportFilter("2025");
  }, []);

  const getReport = async () => {
    setReportLoading(true);
    try {
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/postPastReport`,
          {
            patientId: patientId,
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
          console.log("########", data);
          console.log("====================================");

          if (data.status) {
            setAllReports(data.data);
          }
        });
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }

    try {
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/checkPatientMap`,
          {
            employeeId: localStorage.getItem("currentDoctorId"),
            patientId: patientId,
            hospitalId: localStorage.getItem("hospitalId"),
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

          if (data.status) {
            setCurrentReport(true);
          } else {
            setCurrentReport(false);
          }
        });
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
    setReportLoading(false);
  };

  const [allReports, setAllReports] = useState<Report[]>([]);
  const [currentReport, setCurrentReport]: any = useState(false);
console.log("allreports", allReports);
console.log("281", (allReports?.filter(item => item.refptcreateddate == selectedMonth))[0]?.multipleDate)

  const [navCategory, setNavCategory] = useState({
    id: "",
    label: "",
  });

  const [mainNav, setMainNav] = useState({
    id: "",
    label: "",
  });

  return (
    <IonPage>
      {overAllLoading ? (
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
          <IonContent>
            <div className="KnowAboutPatient medpredit-page-background">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "1.2rem",
                  fontWeight: "600",
                  margin: "1rem",
                }}
              >
                <IonIcon
                  size="large"
                  onClick={() => history.goBack()}
                  icon={chevronBack}
                ></IonIcon>
                <span>{patient}</span>
                <span></span>
              </div>

              <IonSegment
                id="KnowAboutPatient_Modal"
                mode="ios"
                value={selectedValue}
                scrollable={true}
                onIonChange={(e) => handleSegmentChange(e.detail.value!)}
              >
                <IonSegmentButton
                  key="knowabout"
                  value="knowabout"
                  contentId="knowabout"
                >
                  <IonLabel>Know About Patient</IonLabel>
                </IonSegmentButton>
                {categories.map((category) => (
                  <IonSegmentButton
                    key={category.refQCategoryId}
                    value={category.refCategoryLabel}
                    contentId={category.refCategoryLabel}
                  >
                    <IonLabel>{category.refCategoryLabel}</IonLabel>
                  </IonSegmentButton>
                ))}
              </IonSegment>

              <div style={{ height: "85vh" }}>
                {selectedValue === "knowabout" ? (
                  <>
                    {reportLoading ? (
                      <>
                        <div
                          style={{
                            width: "100%",
                            height: "70vh",
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
                      </>
                    ) : (
                      <IonSegmentContent key="knowabout" id="knowabout">
                        <div
                          style={{
                            width: "90%",
                            margin: "0 auto",
                            overflow: "auto",
                            padding: "2rem 1rem 0 1rem",
                            position: "relative",
                          }}
                        >
                          {currentReport ? (
                            <>
                              <div
                                onClick={() => {
                                  history.push(
                                    `/currentReport/${patient}/${patientId}`
                                  );
                                }}
                                style={{
                                  width: "100%",
                                  fontSize: "1rem",
                                  fontWeight: "bold",
                                  backgroundColor: "rgb(184, 225, 255)",
                                  color: "#0c436c",
                                  borderRadius: "2.5rem",
                                  padding: "1rem",
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <div>Current Report</div>
                                <div>
                                  <i
                                    className="pi pi-angle-right"
                                    style={{ fontSize: "1.5rem" }}
                                  ></i>
                                </div>
                              </div>
                            </>
                          ) : null}

                          {/* <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                          }}
                        >
                          <div style={{ width: "80%" }}>
                            <DateSelector
                              value={pastreport}
                              onChange={(date: any) => {
                                setPastReport(date);
                              }} 
                              placeholder="Select a date"
                            />
                          </div>

                          <div style={{ width: "18%" }}>
                            <button
                              disabled={pastreport.length === 0}
                              style={{
                                width: "100%",
                                height: "2.8rem",
                                borderRadius: "5px",
                                background:
                                  "linear-gradient(160deg, #077556, #2f9f97)",
                                color: "#fff",
                                fontSize: "16px",
                                cursor: "pointer",
                                opacity: pastreport.length === 0 ? 0.5 : 1,
                              }}
                              onClick={() => {
                                history.push(`/pastreport/${pastreport}`);
                              }}
                            >
                              <i
                                style={{ fontSize: "1rem" }}
                                className="pi pi-arrow-right"
                              ></i>
                            </button>
                          </div>
                        </div> */}
                          {allReports.length > 0 ? (
                            <>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "12px",
                                }}
                              >
                                <>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "flex-start",
                                      padding: "1.5rem 0 0 0",
                                      gap: "0.5rem",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: "0.3rem",
                                        width: "100%",
                                      }}
                                    >
                                      <div
                                        onClick={() =>
                                          setIsExpanded(!isExpanded)
                                        }
                                        style={{
                                          width: "90%",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "space-between",
                                          padding: "1rem",
                                          fontSize: "1rem",
                                          fontWeight: "bold",
                                          backgroundColor: "rgb(184, 225, 255)",
                                          color: "rgb(12, 67, 108)",
                                          borderRadius: "2.5rem",
                                        }}
                                      >
                                        <span>Past Report</span>
                                        <span style={{ fontSize: "1rem" }}>
                                          {isExpanded ? (
                                            <i
                                              className="pi pi-angle-down"
                                              style={{ fontSize: "1.5rem" }}
                                            ></i>
                                          ) : (
                                            <i
                                              className="pi pi-angle-right"
                                              style={{ fontSize: "1.5rem" }}
                                            ></i>
                                          )}
                                        </span>
                                      </div>

                                      <div
                                        id="trigger-button"
                                        onClick={() =>
                                          setShowYearPicker(!showYearPicker)
                                        }
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          padding: "0.2rem",
                                          background:
                                            "var(--gradient-button-02)",
                                          textAlign: "center",
                                          width: "10%",
                                          borderRadius: "5px",
                                          marginTop: "0.2rem",
                                        }}
                                      >
                                        <i
                                          className="pi pi-sliders-h"
                                          style={{ color: "white" }}
                                        ></i>

                                        <IonPopover
                                          id="yearPicker_Popover"
                                          isOpen={showYearPicker}
                                          trigger="trigger-button"
                                        >
                                          {[...Array(10)].map((_, index) => {
                                            const year =
                                              new Date().getFullYear() - index;
                                            return (
                                              <div
                                                key={year}
                                                style={{
                                                  padding: "0.5rem",
                                                  cursor: "pointer",
                                                  textAlign: "center",
                                                  borderBottom:
                                                    index < 9
                                                      ? "1px solid #ddd"
                                                      : "none",
                                                }}
                                                onClick={() => {
                                                  handleReportFilter(year);
                                                }}
                                              >
                                                {year}
                                              </div>
                                            );
                                          })}
                                        </IonPopover>
                                      </div>
                                    </div>

                                    {isExpanded && selectedYear && (
                                      <div
                                        style={{
                                          padding: "1rem 0",
                                          display: "flex",
                                          flexDirection: "column",
                                          gap: "3rem",
                                          width: "100%",
                                        }}
                                      >
                                        {/* Month List */}
                                        <div
                                          style={{
                                            display: "grid",
                                            gridTemplateColumns:
                                              "repeat(4, 1fr)",
                                            gap: "0.8rem",
                                          }}
                                        >
                                          {Array.from(
                                            { length: 12 },
                                            (_, i) => {
                                              const month = `${selectedYear}-${(
                                                i + 1
                                              )
                                                .toString()
                                                .padStart(2, "0")}`;

                                              // Show only months up to the current month in the selected year
                                              if (
                                                Number(selectedYear) > currentYear ||
                                                (Number(selectedYear) === currentYear &&
                                                  i + 1 > currentMonth)
                                              ) {
                                                return null;
                                              }

                                              return (
                                                <span
                                                  key={month}
                                                  style={{
                                                    padding: "0.3rem 0.2rem",
                                                    border: "1px solid #ddd",
                                                    fontSize: "0.75rem",
                                                    borderRadius: "0.6rem",
                                                    cursor: "pointer",
                                                    textAlign: "center",
                                                    backgroundColor:
                                                      selectedMonth === month
                                                        ? "rgb(184, 225, 255)"
                                                        : "transparent",
                                                    color: "#0c436c",
                                                  }}
                                                  onClick={() =>
                                                    setSelectedMonth(month)
                                                  }
                                                >
                                                  {month}
                                                </span>
                                              );
                                            }
                                          )}
                                        </div>
                                        ;
                                      </div>
                                    )}
                                  </div>
                                </>
                              </div>
                            </>
                          ) : (
                            <>
                              <div
                                style={{
                                  width: "100%",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  flexDirection: "column",
                                }}
                              >
                                <img
                                  style={{ height: "40vh" }}
                                  src={report}
                                  alt="patient"
                                />
                                <div
                                  style={{
                                    marginTop: "10px",
                                    fontWeight: "500",
                                    fontSize: "20px",
                                    color: "#939185",
                                  }}
                                >
                                  No Reports Found
                                </div>
                              </div>
                            </>
                          )}
                        </div>

                        {/* Filtered Report Data */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            width: "100vw",
                            height: "30vh",
                            backgroundColor: "lightblue",
                          }}
                        >
                          {selectedMonth && (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                flexWrap: "wrap",
                                width: "80%",
                                margin: "0 auto",
                              }}
                            >
                              {allReports.length > 0 &&
                                allReports
                                  ?.filter(
                                    (item) =>
                                      item.refptcreateddate == selectedMonth
                                  )[0]
                                  ?.multipleDate.map((muldate, index) => (
                                    <div
                                      key={index}
                                      style={{
                                        padding: "0.5rem",
                                        justifyContent: "center",
                                        textDecoration: "underline",
                                        color: "#0c436c",
                                        fontSize: "0.8rem",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => {
                                        history.push(
                                          `/pastreport/${muldate.refptcreateddate}`
                                        );
                                      }}
                                    >
                                      {muldate.refptcreateddate}
                                    </div>
                                  ))}
                            </div>
                          )}
                        </div>
                      </IonSegmentContent>
                    )}
                  </>
                ) : (
                  <>
                    {categories.map((category) => (
                      <IonSegmentContent
                        key={category.refQCategoryId}
                        id={category.refCategoryLabel}
                      >
                        {selectedValue === category.refCategoryLabel && (
                          <>
                            {loadingStatus ? (
                              <>
                                <div
                                  style={{
                                    width: "100%",
                                    height: "70vh",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <i
                                    className="pi pi-spin pi-spinner"
                                    style={{
                                      fontSize: "2rem",
                                      color: "#1a70b0",
                                    }}
                                  ></i>
                                </div>
                              </>
                            ) : (
                              <KnowCards
                                cardData={subCategoryData}
                                latestReport={latestReport}
                              />
                            )}
                          </>
                        )}
                      </IonSegmentContent>
                    ))}
                  </>
                )}
              </div>
            </div>

            <div></div>
          </IonContent>
        </>
      )}
    </IonPage>
  );
};

export default KnowAboutPatient;
