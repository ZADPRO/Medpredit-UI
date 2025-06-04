import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Tab2.css";
import { useRef, useState } from "react";
import Patientcards from "../PatientCards/Patientcards";
import { useHistory, useLocation } from "react-router";
import axios from "axios";
import decrypt from "../../helper";
import patientListImg from "../../assets/images_new/PatientList.png";
import SearchInput from "../FieldInputs/SearchInput";

const Tab2: React.FC = () => {
  const history = useHistory();

  const contentRef = useRef<HTMLIonContentElement>(null);

  const [patientsData, setPatientData] = useState([]);

  const handlePaginationChange = () => {
    if (contentRef.current) {
      contentRef.current.scrollToTop(300);
    }
  };

  const handleAddUser = () => {
    history.push("/addUser", {
      direction: "forward",
      animation: "slide",
    });
  };

  const [mobileNumber, setMobileNumber] = useState("");

  const [loadingStatus, setLoadingStatus] = useState(false);

  const [status, setStatus] = useState({
    status: false,
    message: "",
  });

  const location = useLocation();

  const [urlMobileNo, setURLMobileNo] = useState("");
  const [urluserId, setUrluserId] = useState("");

  const userDetails: any = localStorage.getItem("userDetails");
  const parsedDetails = JSON.parse(userDetails);

  const searchPatient = () => {
    const tokenString = localStorage.getItem("userDetails");
    if (tokenString) {
      try {
        setLoadingStatus(true);
        const tokenObject = JSON.parse(tokenString);
        const token = tokenObject.token;

        axios
          .post(
            `${import.meta.env.VITE_API_URL}/getPatientData`,
            {
              mobileNumber: mobileNumber,
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

            console.log(data);

            setLoadingStatus(false);

            if (data.status) {
              setPatientData(data.data);

              if (data.data.length === 0) {
                setStatus({
                  status: true,
                  message: "No Result Found",
                });
              } else {
                setURLMobileNo(data.data[0].refUserMobileno);
                setUrluserId(data.data[0].refUserId);
              }
            } else {
              console.error("Data consoled false - chekc this");
            }
          })
          .catch((error) => {
            console.error("Error fetching patient data:", error);
          });
      } catch (error) {
        console.error("Error parsing token:", error);
      }
    } else {
      console.error("No token found in localStorage.");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              background: "#fff",
              alignItems: "center",
              width: "100%",
              height: "8vh",
              fontSize: "1.2rem",
              fontWeight: "600",
              padding: "1rem",
            }}
          >
            <span></span>
            <span>Patient</span>
            <span></span>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="tab2 ">
          <div className="tab2TopDiv">
            {/* <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "90%",
                fontSize: "1.2rem",
                fontWeight: "600",
                padding: "0 0 1rem 0",
              }}
            >
              <span></span>
              <span>Patient</span>
              <span></span>
            </div> */}

            <SearchInput
              type="number"
              placeholder="Enter Phone Number"
              value={mobileNumber}
              className="gradientBackground02_opacity"
              onChange={(e) => setMobileNumber(e.target.value)}
              onSearch={() => {
                if (mobileNumber.length != 0) {
                  setStatus({
                    status: false,
                    message: "",
                  });
                  searchPatient();
                  setPatientData([]);
                }
              }}
              onClear={() => {
                setMobileNumber("")
                setPatientData([]);
              }}
            />
            {loadingStatus ? (
              <>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    margin:"10px 10px",
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
              <>
                {patientsData.length === 0 ? (
                  <div
                    style={{
                      width: "100%",
                      margin: "20px 20px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <img
                      src={patientListImg}
                      style={{ width: "70%" }}
                      alt="seacrhImg"
                    />
                    {status.status ? (
                      <div
                        style={{
                          fontWeight: "500",
                          fontSize: "20px",
                          color: "#939185",
                        }}
                      >
                        {status.message}
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <>
                    {patientsData.length != 0 ? (
                      <div
                        style={{
                          width: "100%",
                          overflow: "auto",
                          gap: "5px",
                        }}
                      >
                        <div className="patientContents">
                          <Patientcards
                            patientsData={patientsData}
                            onPaginationChange={handlePaginationChange}
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <div
                          style={{
                            width: "100%",
                            // height: "82vh",
                            margin: "20px 20px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                          }}
                        >
                          {status.status ? (
                            <div
                              className="patientContents"
                              style={{ width: "70%" }}
                              onClick={() => {
                                setMobileNumber("");
                                setStatus({
                                  status: false,
                                  message: "",
                                });
                                history.push("/addUser");
                              }}
                            >
                              <div
                                style={{
                                  marginTop: "10px",
                                  background: "#1c70b0",
                                  borderRadius: "5px",
                                  padding: "10px",
                                  color: "#fff",
                                  fontWeight: "700",
                                  textAlign: "center",
                                  width: "100%",
                                }}
                              >
                                <i
                                  className="pi pi-user"
                                  style={{ color: "#fff", fontSize: "20px" }}
                                ></i>
                                &nbsp;&nbsp;Add Patient
                              </div>
                            </div>
                          ) : null}
                          <img
                            src={patientListImg}
                            style={{ width: "90%" }}
                            alt="seacrhImg"
                          />
                          {status.status ? (
                            <div
                              style={{
                                fontWeight: "500",
                                fontSize: "20px",
                                color: "#939185",
                              }}
                            >
                              {status.message}
                            </div>
                          ) : null}
                        </div>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>

          <div className="tab2BottomDiv">
            {status.status ? (
              <button
                className="gradientButton02"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
                onClick={() => {
                  setMobileNumber("");
                  setStatus({
                    status: false,
                    message: "",
                  });
                  history.push("/addUser");
                }}
              >
                <i
                  className="pi pi-users"
                  style={{ color: "#fff", fontSize: "25px" }}
                ></i>
                Add patient
              </button>
            ) : (null)
            }

            {patientsData.length > 0 ? (
              <button
                className="gradientButton02"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginTop: "20px",
                  opacity: patientsData.length > 6 ? 0.5 : 1,
                }}
                onClick={() => {
                  history.push("/addfamilyuser/" + urlMobileNo + "/" + urluserId);
                }}
                disabled={patientsData.length > 6}
              >
                <i
                  className="pi pi-users"
                  style={{ color: "#fff", fontSize: "25px" }}
                ></i>
                Add Family Member
              </button>
            ) : (null)}

          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;