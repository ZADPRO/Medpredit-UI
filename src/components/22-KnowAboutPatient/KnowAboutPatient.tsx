import {
  IonAccordion,
  IonAccordionGroup,
  IonBackButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonRippleEffect,
  IonSegment,
  IonSegmentButton,
  IonSegmentContent,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";

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
import { arrowForward } from "ionicons/icons";

const KnowAboutPatient: React.FC = () => {
  const history = useHistory();
  const { patient, patientId } = useParams<{
    patient: string;
    patientId: string;
  }>();

  const [loadingStatus, setLoadingStatus] = useState(true);
  const [reportLoading, setReportLoading] = useState(true);

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
          <IonHeader mode="ios">
            <IonToolbar className="pt-1 pb-1" mode="ios">
              <IonButtons
                onClick={() => {
                  history.goBack();
                }}
                slot="start"
              >
                <IonBackButton mode="md" defaultHref="/patient"></IonBackButton>
              </IonButtons>
              <IonTitle>{patient}</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonToolbar>
              <IonSegment
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
            </IonToolbar>
            <div>
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
                          width: "100%",
                          height: "85vh",
                          overflow: "auto",
                          padding: "0px 10px",
                        }}
                      >
                        {/* {currentReport ? (
                          <></>
                        ) : (
                          <>
                            <Divider layout="horizontal">
                              <div
                                style={{
                                  color: "#939185",
                                  fontWeight: "500",
                                }}
                              >
                                Current Report
                              </div>
                            </Divider>

                            <div
                              onClick={() => {
                                history.push(
                                  `/questions/${navCategory.label}/${navCategory.id}`
                                );
                                const getCategory = {
                                  id: mainNav.id,
                                  label: mainNav.label,
                                };

                                localStorage.setItem(
                                  "getCategory",
                                  JSON.stringify(getCategory)
                                );
                              }}
                              style={{
                                width: "100%",
                                background: "#FFDE4D",
                                borderRadius: "5px",
                                height: "50px",
                                padding: "10px",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <div style={{ fontSize: "14px" }}>
                                <i
                                  className="pi pi-clock"
                                  style={{ paddingRight: "10px" }}
                                ></i>
                                Pending (Complete the Report)
                              </div>
                              <div>
                                <i
                                  className="pi pi-angle-right"
                                  style={{ fontSize: "1.5rem" }}
                                ></i>
                              </div>
                            </div>
                          </>
                        )} */}

                        {/* {currentReport === "report" ? (
                          <>
                            <Divider layout="horizontal">
                              <div
                                style={{
                                  color: "#939185",
                                  fontWeight: "500",
                                }}
                              >
                                Current Report
                              </div>
                            </Divider>

                            <div
                              onClick={() => {
                                history.push(
                                  `/currentReport/${patient}/${patientId}`
                                );
                              }}
                              style={{
                                width: "100%",
                                background: "#5DB996",
                                borderRadius: "5px",
                                height: "50px",
                                padding: "10px",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <div style={{ fontSize: "14px" }}>
                                <i
                                  className="pi pi-check"
                                  style={{ paddingRight: "10px" }}
                                ></i>
                                Questions Completed (Generate Report)
                              </div>
                              <div>
                                <i
                                  className="pi pi-angle-right"
                                  style={{ fontSize: "1.5rem" }}
                                ></i>
                              </div>
                            </div>
                          </>
                        ) : null} */}

                        {
                          currentReport ? (
                            <>
                              <Divider layout="horizontal">
                                <div
                                  style={{
                                    color: "#939185",
                                    fontWeight: "500",
                                  }}
                                >
                                  Current Report
                                </div>
                              </Divider>

                              <div
                                onClick={() => {
                                  history.push(
                                    `/currentReport/${patient}/${patientId}`
                                  );
                                }}
                                style={{
                                  width: "100%",
                                  background: "#5DB996",
                                  borderRadius: "5px",
                                  height: "50px",
                                  padding: "10px",
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <div style={{ fontSize: "14px" }}>
                                  <i
                                    className="pi pi-file"
                                    style={{ paddingRight: "10px", fontSize: "18px" }}
                                  ></i>
                                  View Report
                                </div>
                                <div>
                                  <i
                                    className="pi pi-angle-right"
                                    style={{ fontSize: "1.5rem" }}
                                  ></i>
                                </div>
                              </div>
                            </>
                          ) : null
                        }



                        <Divider layout="horizontal">
                          <div
                            style={{
                              color: "#939185",
                              fontWeight: "500",
                            }}
                          >
                            Past Report
                          </div>
                        </Divider>

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
                              {allReports.map((allreport, index) => (
                                <>
                                  {allreport.refptcreateddate ===
                                    `${new Date().getFullYear()}-${(
                                      "0" +
                                      (new Date().getMonth() + 1)
                                    ).slice(-2)}` ? (
                                    <></>
                                  ) : (
                                    <IonAccordionGroup>
                                      <IonAccordion key={index}>
                                        <IonItem slot="header" color="light">
                                          <IonLabel>
                                            {allreport.refptcreateddate}
                                          </IonLabel>
                                        </IonItem>
                                        <div
                                          className="ion-padding"
                                          slot="content"
                                        >
                                          <div
                                            style={{
                                              display: "flex",
                                              flexWrap: "wrap",
                                              gap: "10px",
                                            }}
                                          >
                                            {allreport.multipleDate.map(
                                              (muldate, index) => (
                                                <div
                                                  key={index}
                                                  style={{
                                                    padding: "10px",
                                                    background: "#f4f5f8",
                                                    justifyContent: "center",
                                                    borderRadius: "10px",
                                                    fontSize: "0.8rem"
                                                  }}
                                                  onClick={() => {
                                                    history.push(
                                                      `/pastreport/${muldate.refptcreateddate}`
                                                    );
                                                  }}
                                                >
                                                  {muldate.refptcreateddate}
                                                </div>
                                              )
                                            )}
                                          </div>
                                        </div>
                                      </IonAccordion>
                                    </IonAccordionGroup>
                                  )}
                                </>
                              ))}
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
                                  style={{ fontSize: "2rem", color: "#1a70b0" }}
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
          </IonContent>
        </>
      )}
    </IonPage>
  );
};

export default KnowAboutPatient;
