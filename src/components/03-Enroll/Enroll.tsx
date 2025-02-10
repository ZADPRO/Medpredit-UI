import {
  IonAvatar,
  IonButton,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonModal,
  IonPage,
  IonRippleEffect,
  IonText,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";

import logo from "../../assets/logo/logo.svg";
import home1 from "../../assets/images/home1.jpg";
import users from "../../assets/images/profile.png"

import "./Enroll.css";
import { arrowForwardOutline, image } from "ionicons/icons";
import { useHistory } from "react-router";

import hospital from "../../assets/images/hospital.jpg";

import axios from "axios";

import decrypt from "../../helper";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";

interface HospitalData {
  refHospitalName: any;
  FullAddress: any;
  refHospitalId: any;
}

const Enroll: React.FC = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  const page = useRef(undefined);

  const history = useHistory();

  const [canDismiss, setCanDismiss] = useState(false);
  const [presentingElement, setPresentingElement] = useState<
    HTMLElement | undefined
  >(undefined);

  const [isSignInVisible, setIsSignInVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });


  const [usersList, setUsersList] = useState([]);

  const [userModel, setUserModel] = useState(false);

  const [loadingStatus, setLoadingStatus] = useState(false);

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  function dismiss() {
    modal.current?.dismiss();
  }

  const handleSignUp = () => {
    history.push("/home", {
      direction: "forward",
      animation: "slide",
    });
  };


  const handleChooseUser = async (username: any, password: any, userId: any) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/handleUserSignin`,
        { username, password, userId }
      );

      const data = decrypt(
        response.data[1],
        response.data[0],
        import.meta.env.VITE_ENCRYPTION_KEY
      );

      setLoadingStatus(false);
      setUserModel(false);

      if (data.status) {
        const userDetails = {
          roleType: data.roleType,
          token: "Bearer " + data.token,
        };


        localStorage.setItem("currentPatientId", userId);

        localStorage.setItem("userDetails", JSON.stringify(userDetails));

        history.push("/home", {
          direction: "forward",
          animation: "slide",
        });

      } else {
        setErrorMessage("Invalid username or password");

        setToastMessage("Invalid username or password");
        setShowToast(true);
      }
    } catch (error) {
      console.error("Error during Sign In:", error);
      setToastMessage("An error occurred. Please try again.");
      setShowToast(true);
      setLoadingStatus(false);
    }
  }

  const handleSignIn = async () => {
    setLoadingStatus(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/singin`,
        signInData
      );

      const data = decrypt(
        response.data[1],
        response.data[0],
        import.meta.env.VITE_ENCRYPTION_KEY
      );

      setLoadingStatus(false);

      if (data.status) {
        if (data.roleType === 1) {
          console.log(data.action);

          if (data.action === "single") {
            const userDetails = {
              roleType: data.roleType,
              token: "Bearer " + data.token,
            };

            localStorage.setItem("userDetails", JSON.stringify(userDetails));
            localStorage.setItem("hospitalId", data.hospitaId);

            history.push("/home", {
              direction: "forward",
              animation: "slide",
            });
          } else if (data.action === "multiple") {
            console.log(data);
            const userDetails = {
              roleType: data.roleType,
              token: "Bearer " + data.token,
            };

            localStorage.setItem("userDetails", JSON.stringify(userDetails));
            setHospitalData(data.hospitals);
            setHospitalModel(true);
          }
        } else if (data.roleType === 3) {
          if (data.action === "single") {
            const userDetails = {
              roleType: data.roleType,
              token: "Bearer " + data.token,
            };

            localStorage.setItem("currentPatientId", data.users[0].refUserId);
            

            localStorage.setItem("userDetails", JSON.stringify(userDetails));
            localStorage.setItem("hospitalId", data.hospitaId);

            history.push("/home", {
              direction: "forward",
              animation: "slide",
            });
          } else if (data.action === "multiple") {

            setUsersList(data.users)
            setUserModel(true);
            setLoadingStatus(true);
          }
        } else {
          const userDetails = {
            roleType: data.roleType,
            token: "Bearer " + data.token,
          };

          localStorage.setItem("userDetails", JSON.stringify(userDetails));
          localStorage.setItem("hospitalId", data.hospitaId);

          history.push("/home", {
            direction: "forward",
            animation: "slide",
          });
        }
      } else {
        setErrorMessage("Invalid username or password");

        setToastMessage("Invalid username or password");
        setShowToast(true);
      }
    } catch (error) {
      console.error("Error during Sign In:", error);
      setToastMessage("An error occurred. Please try again.");
      setShowToast(true);
      setLoadingStatus(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isSignIn: boolean = false
  ) => {
    setToastMessage("");
    setShowToast(false);
    const { name, value } = e.target;
    if (isSignIn) {
      setSignInData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleContinue = () => {
    dismiss();
    history.push("/home", {
      direction: "forward",
      animation: "slide",
    });
  };

  const [hospitalModel, setHospitalModel] = useState(false);

  const [hospitalsData, setHospitalData] = useState<HospitalData[]>([]);

  const handleChooseLanguage = (hospitalId: any) => {
    setHospitalModel(false);
    localStorage.setItem("hospitalId", hospitalId);

    history.push("/home", {
      direction: "forward",
      animation: "slide",
    });
  };

  return (
    <IonPage ref={page}>
      <IonContent>
        <IonModal
          mode="ios"
          isOpen={hospitalModel}
          onDidDismiss={() => {
            setHospitalModel(false);
          }}
          initialBreakpoint={0.75}
        >
          <IonContent className="ion-padding">
            <div>
              <div
                style={{
                  height: "8vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "18px",
                  fontWeight: "700",
                }}
              >
                Choose Your Hospital to Login
              </div>
              <div
                style={{
                  height: "55vh",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {hospitalsData.map((hospitalData, index) => (
                  <div
                    onClick={() => {
                      handleChooseLanguage(hospitalData.refHospitalId);
                    }}
                    key={index}
                    style={{
                      borderRadius: "5px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                      justifyContent: "center",
                      fontSize: "16px",
                    }}
                  >
                    <div className="hospitalsDiv flex w-full align-items-center ion-activatable ripple-parent rectangle">
                      <IonRippleEffect></IonRippleEffect>
                      <img height={80} src={hospital} alt="" />
                      <div className="contents ml-3">
                        <div>{hospitalData.refHospitalName}</div>
                        <div style={{ fontSize: "13px", marginTop: "5px" }}>
                          {hospitalData.FullAddress}
                        </div>
                      </div>
                    </div>
                    <Divider className="m-2" />
                  </div>
                ))}
              </div>
            </div>
          </IonContent>
        </IonModal>


        <IonModal
          mode="ios"
          isOpen={userModel}
          onDidDismiss={() => {
            setUserModel(false);
            setLoadingStatus(false);
          }}
          initialBreakpoint={0.75}
        >
          <IonContent className="ion-padding">
            <div>
              <div
                style={{
                  height: "8vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "18px",
                  fontWeight: "700",
                }}
              >
                Choose Your User to Login
              </div>
              <div
                style={{
                  height: "55vh",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {usersList.map((user: any, index) => (
                  <div
                    onClick={() => {
                      handleChooseUser(signInData.username, signInData.password, user.refUserId);
                    }}
                    key={index}
                    style={{
                      borderRadius: "5px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                      justifyContent: "center",
                      fontSize: "16px",
                    }}
                  >
                    <div className="hospitalsDiv flex w-full align-items-center ion-activatable ripple-parent rectangle">
                      <IonRippleEffect></IonRippleEffect>
                      <img height={60} src={users} alt="" />
                      <div className="contents ml-3">
                        <div>{user.refUserFname} {user.refUserLname}</div>
                      </div>
                    </div>
                    <Divider className="m-2" />
                  </div>
                ))}
              </div>
            </div>
          </IonContent>
        </IonModal>

        <div
          className="signIn"
          style={{
            display: isSignInVisible ? "none" : "block",
            overflow: "auto",
          }}
        >
          <div className="signinPage" style={{ height: "100vh" }}>
            <img src={logo} alt="" width="200px" />
            <div>
              <p className="signinHeader text-center ion-padding-top ion-padding-bottom">
                Sign In
              </p>
              <p className="welcomeCont ion-padding-bottom">
                Hi! Welcome Back, You've Been Missed !!
              </p>
              {/* <p>URL: {import.meta.env.VITE_API_URL}</p>
              <p>KEY: {import.meta.env.VITE_ENCRYPTION_KEY}</p> */}
            </div>

            <div
              style={{ marginTop: "-30px" }}
              className="formContentSignIn ion-padding-top"
            >
              <div className="input-container">
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-user"></i>
                  </span>
                  <InputText
                    name="username"
                    required
                    value={signInData.username}
                    style={{ inlineSize: "100%", boxSizing: "border-box" }}
                    onChange={(e) => handleInputChange(e, true)}
                    placeholder="Enter Mobile Number"
                  />
                </div>
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-lock"></i>
                  </span>
                  <Password
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    toggleMask
                    feedback={false}
                    tabIndex={1}
                    required
                    style={{ inlineSize: "100%", boxSizing: "border-box" }}
                    value={signInData.password}
                    onChange={(e) => handleInputChange(e, true)}
                  />
                </div>
                {/* <div
                  style={{
                    textAlign: "left",
                    fontSize: "1rem",
                    fontWeight: "500",
                    color: "#1c70b0",
                  }}
                >
                  Forget Password ?
                </div> */}
              </div>
              {showToast && <IonText color="danger">{errorMessage}</IonText>}{" "}
              {!loadingStatus ? (
                <>
                  <button
                    className="ion-margin-top ion-margin-bottom ion-activatable ripple-parent rectangle"
                    onClick={handleSignIn}
                    style={{ background: "#1c70b0", height: "40px" }}
                  >
                    <IonRippleEffect></IonRippleEffect>
                    Sign In
                  </button>
                </>
              ) : (
                <button
                  className="ion-margin-top ion-margin-bottom"
                  onClick={handleSignIn}
                  style={{ background: "#1c70b0", height: "40px" }}
                >
                  <i className="pi pi-spin pi-spinner"></i>
                </button>
              )}
            </div>
            <div
              style={{
                textAlign: "center",
                fontSize: "1rem",
                fontWeight: "700",
                marginTop: "-20px",
              }}
              onClick={() => {
                history.push("/patientSignUp");
              }}
            >
              Don't have an Account ? Sign Up
            </div>
            <img
              style={{ height: "28vh", width: "100%", objectFit: "cover" }}
              src={home1}
              alt=""
            />
          </div>
        </div>

        <IonModal
          ref={modal}
          mode="ios"
          trigger="open-modal"
          canDismiss={canDismiss}
          presentingElement={presentingElement}
        >
          <IonHeader>
            <IonToolbar>
              <p className="termsCond">Terms & Conditions</p>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <p className="ion-padding-horizontal termsConditionsCont">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
              eaque at ab perferendis optio dicta labore nisi illo consequatur
              architecto. Cum exercitationem dicta sapiente recusandae molestiae
              quaerat placeat odio et?
            </p>
            <IonItem>
              <IonCheckbox
                id="terms"
                checked={canDismiss}
                onIonChange={(ev) => {
                  setCanDismiss(ev.detail.checked);
                }}
              >
                <div className="ion-text-wrap">
                  Do you accept the terms and conditions?
                </div>
              </IonCheckbox>
            </IonItem>
            <IonButton
              disabled={!canDismiss}
              onClick={handleContinue}
              className="continueButton"
            >
              Continue
              <IonIcon icon={arrowForwardOutline}></IonIcon>
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Enroll;
