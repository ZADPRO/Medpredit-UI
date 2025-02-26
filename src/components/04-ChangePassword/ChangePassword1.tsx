import { IonContent, IonIcon, IonPage, IonToast } from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import { Password } from "primereact/password";
import React, { ChangeEvent, useState } from "react";
import { useHistory } from "react-router";
import "./ChangePassword.css";
import axios, { Axios } from "axios";
import decrypt from "../../helper";

const ChangePassword1 = () => {
  const history = useHistory();

  interface FormData {
    refUserCurrPassword: string;
    refUserNewPassword: string;
    refUserConPassword: string;
  }

  const [formData, setFormData] = useState<FormData>({
    refUserCurrPassword: "",
    refUserNewPassword: "",
    refUserConPassword: "",
  });

  interface ToastState {
    status: boolean;
    message: string;
    textColor?: string; // Optional textColor
  }

  const [toastOpen, setToastOpen] = useState<ToastState>({
    status: false,
    message: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrorStatus({
      status: false,
      message: "",
    });
  };

  const [errorStatus, setErrorStatus] = useState({
    status: false,
    message: "",
  });

  console.log(formData);

  const submitChangePassword = () => {
    const tokenString: any = localStorage.getItem("userDetails");
    const tokenObject = JSON.parse(tokenString);
    const token = tokenObject.token;

    if (formData.refUserNewPassword === formData.refUserConPassword) {
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/changePassword`,
          {
            roleId: tokenObject.roleType,
            pastPassword: formData.refUserCurrPassword,
            currentPassword: formData.refUserNewPassword,
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

          if (data.status) {
            setToastOpen({
                status: true,
                textColor: "green",
                message: "Password Changed Successfully",
              });
              setFormData({
                refUserCurrPassword: "",
                refUserNewPassword: "",
                refUserConPassword: ""
              });
            setTimeout(() => {
              history.push("/profile");
            }, 2000);
          }
           else {
            setToastOpen({
              status: true,
              textColor: "red",
              message: data.message,
            });
          }
        });
    } else {
      setToastOpen({
        status: true,
        textColor: "red",
        message: "Confirm Password not Match",
      });
    }
  };

  const verifyForm = () => {
    if (
      formData.refUserNewPassword.length === 0 || // Check if password is empty
      !/[a-zA-Z]/.test(formData.refUserNewPassword) || // Must contain at least one letter
      !/\d/.test(formData.refUserNewPassword) || // Must contain at least one digit
      !/[!@#$%^&*(),.?":{}|<>]/.test(formData.refUserNewPassword) || // Must contain at least one special character
      formData.refUserNewPassword.length < 8 || // Must be at least 8 characters long
      formData.refUserNewPassword !== formData.refUserConPassword
    ) {
      setToastOpen({
        status: true,
        textColor: "red",
        message: "Enter Valid Password",
      });
      console.log("hellle");
      return false;
    } else {
      submitChangePassword();
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div
          style={{ height: "100vh", width: "100vw" }}
          className="KnowAboutPatient medpredit-page-background"
        >
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "1.2rem",
              fontWeight: "600",
              margin: "0 1rem",
              height: "8vh",
            }}
          >
            <IonIcon
              size="large"
              onClick={() => {
                history.goBack();
              }}
              icon={chevronBack}
            ></IonIcon>
            <span
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                whiteSpace: "nowrap",
              }}
            >
              Change Password
            </span>
            <span></span>
          </div>

          <div
            style={{ minHeight: "83vh" }}
            className="form-page ion-padding boxShadow02-inset"
          >
            <div className="inputBox">
              <label>
                Current Password <span style={{ color: "red" }}>*</span>
              </label>
              <div className="p-inputgroup addFamilyInputField gradientBackground02_opacity">
                <Password
                  value={formData.refUserCurrPassword}
                  onChange={handleInputChange}
                  onCopy={(e) => e.preventDefault()}
                  onPaste={(e) => e.preventDefault()}
                  style={{ borderRadius: "10px" }}
                  placeholder="Enter Current Password"
                  name="refUserCurrPassword"
                  toggleMask
                  feedback={false}
                  tabIndex={1}
                />
              </div>
            </div>

            <div className="inputBox">
              <label>
                Password <span style={{ color: "red" }}>*</span>
              </label>
              <div className="p-inputgroup addFamilyInputField gradientBackground02_opacity">
                <Password
                  value={formData.refUserNewPassword}
                  onChange={handleInputChange}
                  onCopy={(e) => e.preventDefault()}
                  onPaste={(e) => e.preventDefault()}
                  style={{ borderRadius: "10px" }}
                  placeholder="Enter Password"
                  name="refUserNewPassword"
                  toggleMask
                  feedback={false}
                  tabIndex={1}
                />
              </div>
            </div>

            <div
              className="inputBox"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                fontWeight: "600",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: "1rem",
                  color: "#45474b",
                }}
              >
                {/[a-zA-Z]/.test(formData.refUserNewPassword) ? (
                  <div
                    style={{
                      width: "25px",
                      height: "25px",
                      background: "green",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                    }}
                  >
                    <i
                      style={{ fontSize: "15px", color: "#fff" }}
                      className="pi pi-check"
                    ></i>
                  </div>
                ) : (
                  <div
                    style={{
                      width: "25px",
                      height: "25px",
                      background: "red",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                    }}
                  >
                    <i
                      style={{ fontSize: "15px", color: "#fff" }}
                      className="pi pi-times"
                    ></i>
                  </div>
                )}
                &nbsp; Atleast One Character
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: "1rem",
                  color: "#45474b",
                }}
              >
                {/\d/.test(formData.refUserNewPassword) ? (
                  <div
                    style={{
                      width: "25px",
                      height: "25px",
                      background: "green",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                    }}
                  >
                    <i
                      style={{ fontSize: "15px", color: "#fff" }}
                      className="pi pi-check"
                    ></i>
                  </div>
                ) : (
                  <div
                    style={{
                      width: "25px",
                      height: "25px",
                      background: "red",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                    }}
                  >
                    <i
                      style={{ fontSize: "15px", color: "#fff" }}
                      className="pi pi-times"
                    ></i>
                  </div>
                )}
                &nbsp; Atleast One Number
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: "1rem",
                  color: "#45474b",
                }}
              >
                {/[!@#$%^&*(),.?":{}|<>]/.test(formData.refUserNewPassword) ? (
                  <div
                    style={{
                      width: "25px",
                      height: "25px",
                      background: "green",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                    }}
                  >
                    <i
                      style={{ fontSize: "15px", color: "#fff" }}
                      className="pi pi-check"
                    ></i>
                  </div>
                ) : (
                  <div
                    style={{
                      width: "25px",
                      height: "25px",
                      background: "red",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                    }}
                  >
                    <i
                      style={{ fontSize: "15px", color: "#fff" }}
                      className="pi pi-times"
                    ></i>
                  </div>
                )}
                &nbsp; Atleast One Special Character
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: "1rem",
                  color: "#45474b",
                }}
              >
                {formData.refUserNewPassword.length > 7 ? (
                  <div
                    style={{
                      width: "25px",
                      height: "25px",
                      background: "green",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                    }}
                  >
                    <i
                      style={{ fontSize: "15px", color: "#fff" }}
                      className="pi pi-check"
                    ></i>
                  </div>
                ) : (
                  <div
                    style={{
                      width: "25px",
                      height: "25px",
                      background: "red",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                    }}
                  >
                    <i
                      style={{ fontSize: "15px", color: "#fff" }}
                      className="pi pi-times"
                    ></i>
                  </div>
                )}
                &nbsp; Minimum 8 Characters
              </div>
            </div>

            {/* Confirm Password */}
            <div className="inputBox">
              <label>
                Confirm Password <span style={{ color: "red" }}>*</span>
              </label>
              <div className="p-inputgroup addFamilyInputField gradientBackground02_opacity">
                <Password
                  value={formData.refUserConPassword}
                  onChange={handleInputChange}
                  onCopy={(e) => e.preventDefault()}
                  onPaste={(e) => e.preventDefault()}
                  style={{ borderRadius: "10px" }}
                  placeholder="Enter Confirm Password"
                  name="refUserConPassword"
                  toggleMask
                  feedback={false}
                  tabIndex={1}
                />
              </div>
            </div>

            <div
              className="inputBox"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                fontWeight: "600",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: "1rem",
                  color: "#45474b",
                }}
              >
                {formData.refUserNewPassword === formData.refUserConPassword &&
                formData.refUserNewPassword.length > 0 ? (
                  <div
                    style={{
                      width: "25px",
                      height: "25px",
                      background: "green",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                    }}
                  >
                    <i
                      style={{ fontSize: "15px", color: "#fff" }}
                      className="pi pi-check"
                    ></i>
                  </div>
                ) : (
                  <div
                    style={{
                      width: "25px",
                      height: "25px",
                      background: "red",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                    }}
                  >
                    <i
                      style={{ fontSize: "15px", color: "#fff" }}
                      className="pi pi-times"
                    ></i>
                  </div>
                )}
                &nbsp;Match Confirm Password
              </div>
            </div>
          </div>
          
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "7vh", // Ensures vertical centering if the parent has a defined height
              borderRadius: "5% 5% 0 0",
            }}
          >
            <button
              className="changePassSubmitButton"
              onClick={() => verifyForm()}
            >
              Submit
            </button>
          </div>
        </div>
        <IonToast
          style={{
            "--color": toastOpen.textColor || "black",
            fontWeight: "bold",
          }}
          isOpen={toastOpen.status}
          onDidDismiss={() =>
            setToastOpen({ status: false, textColor: "", message: "" })
          }
          message={toastOpen.message}
          duration={1500}
        />
      </IonContent>
    </IonPage>
  );
};

export default ChangePassword1;
