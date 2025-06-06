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

import { chevronBack } from "ionicons/icons";

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
  const [selectedValue, setSelectedValue] = useState<string>(
    localStorage.getItem("getMainCat") || "knowabout"
  );
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


  const loadData = () => {
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
              refLanCode: localStorage.getItem("refLanCode")
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
            // setSelectedValue("knowabout");

            console.log("Line -108", data)

            if (data.data) {
              setCategories(data.data);
              categories.push({
                refQCategoryId: 4,
                refCategoryLabel: "Know About Patient",
              });
              getReport();

              const value = localStorage.getItem("getMainCat");

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

  }

  useEffect(() => {

    if (history.location.pathname.split('/')[1] === "knowAbout") {
      loadData();
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
          refLanCode: localStorage.getItem("refLanCode")
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
    console.log("Selected Year:", year);

    const selectedYear = Number(year);

    // If the selected year is the current year, use the current month
    // Otherwise, default to January
    const selectedMonth =
      selectedYear === currentYear
        ? `${selectedYear}-${String(currentMonth).padStart(2, "0")}`
        : `${selectedYear}-01`;

    setSelectedYear(String(selectedYear));
    setSelectedMonth(selectedMonth);

    setIsExpanded(true);
    setShowYearPicker(false);
  };

  useEffect(() => {
    handleReportFilter(new Date().getFullYear());
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
  console.log(
    "filter allreports",
    allReports?.filter((item) => item.refptcreateddate == selectedMonth)[0]
      ?.multipleDate
  );

  const [navCategory, setNavCategory] = useState({
    id: "",
    label: "",
  });

  const [mainNav, setMainNav] = useState({
    id: "",
    label: "",
  });

  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0]; // Output: "2025-02-21"

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
          <IonHeader>
            <IonToolbar>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  background: "#fff",
                  alignItems: "center",
                  width: "100%",
                  fontSize: "1.2rem",
                  fontWeight: "600",
                  padding: "1rem",
                }}
              >
                <span> <IonIcon
                  size="large"
                  onClick={() => { history.goBack(); localStorage.setItem("getMainCat", "") }}
                  icon={chevronBack}
                ></IonIcon></span>
                <span>{patient}</span>
                <span></span>
              </div>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <div className=" medpredit-page-background">
              {/* <div
                style={{
                  paddingTop: "15px",
                  paddingBottom: "10px",
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  width: "90%",
                  margin: "0rem 1rem 1rem 1rem",
                }}
              >
                <IonIcon
                  style={{ position: "absolute", left: "0px" }}
                  size="large"
                  onClick={() => { history.goBack(); localStorage.setItem("getMainCat", "") }}
                  icon={chevronBack}
                ></IonIcon>
                <span>{patient}</span>
                <span style={{ position: "absolute", right: "0px" }}></span>
              </div> */}

              <IonSegment
                id="KnowAboutPatient_Modal"
                mode="ios"
                value={selectedValue}
                scrollable={true}
                onIonChange={(e) => { console.log(e.detail); handleSegmentChange(e.detail.value!) }}
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
                                className="boxShadow01"
                                onClick={() => {
                                  history.push(
                                    `/currentReport/${formattedDate}`
                                  );
                                }}
                                style={{
                                  fontSize: "1rem",
                                  fontWeight: "500",
                                  backgroundColor: "rgb(184, 225, 255)",
                                  color: "#0c436c",
                                  borderRadius: "2.5rem",
                                  padding: "0.75rem",
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
                                      padding: "0.8rem 0 0 0",
                                      gap: "0.5rem",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: "0.3rem",
                                        width: "100%",
                                      }}
                                    >
                                      <div
                                        className="boxShadow01"
                                        onClick={() =>
                                          setIsExpanded(!isExpanded)
                                        }
                                        style={{
                                          width: "90%",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "space-between",
                                          padding: "0.75rem",
                                          marginBottom: "1rem",
                                          fontSize: "1rem",
                                          fontWeight: "500",
                                          background: isExpanded
                                            ? "var(--gradient-button-02)"
                                            : "rgb(184, 225, 255)",
                                          color: isExpanded
                                            ? "white"
                                            : "rgb(12, 67, 108)",
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
                                          marginBottom: "1rem",
                                          background:
                                            "var(--gradient-button-02)",
                                          textAlign: "center",
                                          width: "10%",
                                          minHeight: "2rem",
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
                                          onDidDismiss={() => setShowYearPicker(false)}
                                        >
                                          {[
                                            ...Array(
                                              2025 -
                                              new Date().getFullYear() +
                                              1
                                            ),
                                          ].map((_, index) => {
                                            const year =
                                              new Date().getFullYear() + index;
                                            return (
                                              <div
                                                key={year}
                                                style={{
                                                  padding: "0.5rem",
                                                  cursor: "pointer",
                                                  textAlign: "center",
                                                  borderBottom:
                                                    year < 2025
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
                                                Number(selectedYear) >
                                                currentYear ||
                                                (Number(selectedYear) ===
                                                  currentYear &&
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
                                      </div>
                                    )}
                                  </div>
                                </>
                              </div>
                            </>
                          ) : (
                            <>

                            </>
                          )}
                        </div>

                        {/* Filtered Report Data */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            width: "100vw",
                            height: "40vh",
                            backgroundColor: "rgb(235, 250, 255)",
                          }}
                        >
                          {selectedMonth && (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-around",
                                alignItems: "flex-start",
                                flexWrap: "wrap",
                                width: "80%",
                                margin: "0 auto",
                              }}
                            >
                              {allReports?.filter(
                                (item) =>
                                  item.refptcreateddate === selectedMonth
                              )[0]?.multipleDate.length > 0 ? (
                                allReports
                                  ?.filter(
                                    (item) =>
                                      item.refptcreateddate === selectedMonth
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
                                  ))
                              ) : (
                                <div
                                  style={{
                                    padding: "0.5rem",
                                    textAlign: "center",
                                    color: "rgba(12, 67, 108, 0.6)",
                                    fontSize: "1.5rem",
                                  }}
                                >
                                  No Data Filled
                                </div>
                              )}
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
