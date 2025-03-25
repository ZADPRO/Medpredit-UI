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

import logo_new from "../../assets/logo_new/LOGO_Sign_In_Page.svg";

import "./Enroll.css";
import { arrowForwardOutline } from "ionicons/icons";
import { useHistory } from "react-router";

import hospital_new from "../../assets/images_new/HOSPITAL-07.png";

import axios from "axios";

import decrypt from "../../helper";
import TextInput from "../../pages/FieldInputs/TextInput";
import PasswordInput from "../../pages/FieldInputs/PasswordInput";
import userIcon from "../../assets/logo_new/PROFILE_ICON-19.svg"

import { Device } from '@ionic-native/device';

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

  const [deviceInfo, setDeviceInfo] = useState({
    name: '',
    cordova: '',
    platform: '',
    version: '',
    manufacturer: '',
    isVirtual: false,
    serial: '',
  });

  useEffect(() => {
    document.addEventListener('deviceready', () => {
      setDeviceInfo({
        name: Device.model,
        cordova: Device.cordova,
        platform: Device.platform,
        version: Device.version,
        manufacturer: Device.manufacturer,
        isVirtual: Device.isVirtual,
        serial: Device.serial,
      });
    }, false);
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

  const handleChooseUser = async (
    username: any,
    password: any,
    userId: any
  ) => {
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

      console.log(data);


      if (data.status) {
        const userDetails = {
          roleType: data.roleType,
          token: "Bearer " + data.token,
        };

        localStorage.setItem("currentPatientId", userId);

        localStorage.setItem("userDetails", JSON.stringify(userDetails));

        history.push("/checkup", {
          direction: "forward",
          animation: "slide",
        });
      } else {
        setErrorMessage("Invalid username or password");

        setToastMessage("*Invalid username or password");
        setShowToast(true);
      }
    } catch (error) {
      console.error("Error during Sign In:", error);
      setToastMessage("An error occurred. Please try again.");
      setShowToast(true);
      setLoadingStatus(false);
    }
  };

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

      console.log(data);

      setLoadingStatus(false);

      if (data.status) {

        console.log(data.roleType);

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
          // if (data.action === "single") {
          //   const userDetails = {
          //     roleType: data.roleType,
          //     token: "Bearer " + data.token,
          //   };

          //   localStorage.setItem("currentPatientId", data.users[0].refUserId);

          //   localStorage.setItem("userDetails", JSON.stringify(userDetails));
          //   localStorage.setItem("hospitalId", data.hospitaId);

          //   history.push("/checkup", {
          //     direction: "forward",
          //     animation: "slide",
          //   });
          // } else if (data.action === "multiple") {
          //   setUsersList(data.users);
          //   setUserModel(true);
          //   setLoadingStatus(true);
          // }
          setErrorMessage("Invalid username or password");

          setToastMessage("*Invalid username or password");
          setShowToast(true);
        } else if (data.roleType === 5) {
          const userDetails = {
            roleType: data.roleType,
            token: "Bearer " + data.token,
          };

          localStorage.setItem("userDetails", JSON.stringify(userDetails));
          localStorage.setItem("hospitalId", data.hospitaId);

          history.push("/configure", {
            direction: "forward",
            animation: "slide",
          });
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

        setToastMessage("*Invalid username or password");
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

  const hospitalsDataSample = [
    {
      refHospitalName: "KMCH Hostpital",
      FullAddress: "Salem, Salem, Salem, Salem",
      refHospitalId: "0001",
    },
    {
      refHospitalName: "Kauvery Hostpital",
      FullAddress: "Salem, Salem, Salem, Salem",
      refHospitalId: "0002",
    },
    {
      refHospitalName: "Lotus Hostpital",
      FullAddress: "Salem, Salem, Salem, Salem",
      refHospitalId: "0003",
    },
  ];

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
          id="signInModal"
          mode="ios"
          isOpen={userModel}
          onDidDismiss={() => {
            setUserModel(false);
            setLoadingStatus(false);
          }}
          initialBreakpoint={0.75}
        >
          <div className="ion-padding">
            <div>
              <div
                style={{
                  height: "8vh",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "#1764b7",
                }}
              >
                <span>Choose Your</span>
                <span>User to Login</span>
              </div>
              <div
                style={{
                  height: "40vh",
                  overflow: "auto",
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "2rem",
                  gap: "0.5rem",
                }}
              >
                {usersList.map((user: any, index) => (
                  <div
                    onClick={() => {
                      handleChooseUser(signInData.username, signInData.password, user.refUserId);
                    }}
                    key={index}
                    style={{
                      borderRadius: "20px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.9rem",
                      fontWeight: "400",
                      padding: "10px",
                      background:
                        "linear-gradient(90deg, rgba(14,149,231,1) 0%,rgb(3, 118, 199) 100%)",
                    }}
                  >
                    <div className="hospitalsDiv flex w-full align-items-center ion-activatable ripple-parent rectangle">
                      <IonRippleEffect></IonRippleEffect>
                      <img height={"50px"} src={userIcon} alt="" />
                      <div className="signInModalDescription">
                        <div>{user.refUserFname}  {user.refUserLname}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </IonModal>

        <IonModal
          id="signInModal"
          mode="ios"
          isOpen={hospitalModel}
          onDidDismiss={() => {
            setHospitalModel(false);
          }}
        >
          <div className="ion-padding">
            <div>
              <div
                style={{
                  height: "8vh",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "#1764b7",
                }}
              >
                <span>Choose Your</span>
                <span>Hospital to Login</span>
              </div>
              <div
                style={{
                  height: "55vh",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "2rem",
                  gap: "0.5rem",
                }}
              >
                {hospitalsData.map((hospitalData, index) => (
                  <div
                    onClick={() => {
                      handleChooseLanguage(hospitalData.refHospitalId);
                    }}
                    key={index}
                    style={{
                      borderRadius: "20px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.9rem",
                      fontWeight: "400",
                      padding: "10px",
                      background:
                        "linear-gradient(90deg, rgba(14,149,231,1) 0%,rgb(3, 118, 199) 100%)",
                    }}
                  >
                    <div className="hospitalsDiv flex w-full align-items-center ion-activatable ripple-parent rectangle">
                      <IonRippleEffect></IonRippleEffect>
                      <img height={"50px"} src={hospital_new} alt="" />
                      <div className="signInModalDescription">
                        <div>{hospitalData.refHospitalName},</div>
                        <div>{hospitalData.FullAddress}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </IonModal>

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

        <div className="signIn medpredit-page-background">
          <img src={logo_new} alt="MEDPRiT_logo" />
          <div className="signInWelcome">
            <h2>Welcome to Medpredit!</h2>
            <p>Let's Sign In</p>
          </div>
          <div className="signInInputField">
            <TextInput
              required
              type="number"
              name="username"
              placeholder="Mobile Number"
              value={signInData.username}
              onChange={(e) => handleInputChange(e, true)}
              error={errorMessage ? true : false}
            />
            <PasswordInput
              required
              name="password"
              placeholder="Password"
              value={signInData.password}
              onChange={(e) => handleInputChange(e, true)}
              error={errorMessage ? true : false}
            />
            <div
              style={{
                fontSize: "1.3rem",
                fontWeight: "500",
                color: "#1c70b0",
                //margin: "3rem 0 2rem 0",
              }}
            >
              Forgot Password?
            </div>
          </div>
          {showToast && <IonText color="danger">{toastMessage}</IonText>}{" "}
          <div className="signInFooter">
            <button
              className="signInButton gradientBackground02"
              //className="ion-margin-top ion-margin-bottom ion-activatable ripple-parent rectangle"
              onClick={handleSignIn}
            >
              <IonRippleEffect></IonRippleEffect>
              {!loadingStatus ? (
                "Login"
              ) : (
                <i className="pi pi-spin pi-spinner"></i>
              )}
            </button>

            <p>
              Don't have an Account?{" "}
              <span
                onClick={() => {
                  history.push("/patientSignUp");
                }}
              >
                SignUp
              </span>
            </p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Enroll;