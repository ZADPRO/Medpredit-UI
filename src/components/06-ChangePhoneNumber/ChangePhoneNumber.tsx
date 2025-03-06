import { IonContent, IonIcon, IonPage, IonToast } from "@ionic/react";
import axios from "axios";
import { chevronBack } from "ionicons/icons";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import React, { ChangeEvent, useState } from "react";
import { useHistory } from "react-router";
import decrypt from "../../helper";

const ChangePhoneNumber = () => {
  const history = useHistory();

  interface FormData {
    refUserCurrPassword: string;
    refUserMobileno: "";
  }

  const [formData, setFormData] = useState<FormData>({
    refUserCurrPassword: "",
    refUserMobileno: "",
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
  };

  const verifyForm = () => {
    if (formData.refUserCurrPassword.length === 0) {
      setToastOpen({ status: true, textColor: "red", message: "Enter Valid Password" });
      console.log("pass");
      return false;
    } else if (!/^[6-9][0-9]{9}$/.test(formData.refUserMobileno)) {
      setToastOpen({ status: true, textColor: "red", message: "Enter Valid Mobile Number" });
      console.log("phno");
      return false;
    } else {
      submitChangePhNo();
    }
  };

  const submitChangePhNo = () => {
    const tokenString: any = localStorage.getItem("userDetails");
    const tokenObject = JSON.parse(tokenString);
    const token = tokenObject.token;

    axios
      .post(
        `${import.meta.env.VITE_API_URL}/changeMobilenumber`,
        {
          roleId: tokenObject.roleType,
          newMobileno: formData.refUserMobileno,
          password: formData.refUserCurrPassword,
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
            message: "Number Changed Successfully",
          });
          setFormData({
            refUserCurrPassword: "",
            refUserMobileno: "",
          });
          setTimeout(() => {
            history.push("/profile");
          }, 2000);
        } else {
          setToastOpen({
            status: true,
            textColor: "red",
            message: data.message,
          });
        }
      });
  }

  const [errorStatus, setErrorStatus] = useState({
    status: false,
    message: "",
  });

  console.log(formData);

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
              Change Phone Number
            </span>
            <span></span>
          </div>

          <div
            style={{ height: "83vh" }}
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
                New Mobile Number <span style={{ color: "red" }}>*</span>
              </label>
              <div className="p-inputgroup addFamilyInputField gradientBackground02_opacity">
                {/* <span className="p-inputgroup-addon">
                                                              <i className="pi pi-envelope"></i>
                                                            </span> */}
                <InputText
                  style={{ width: "100%", textAlign: "left" }}
                  className="addFamilyInputText"
                  type="number"
                  value={formData.refUserMobileno}
                  onChange={(e) => {
                    const input = e.target.value;
                    if (/^\d{0,10}$/.test(input)) {
                      handleInputChange(e);
                    }
                  }}
                  maxLength={10} // Ensures max length of 10
                  placeholder="Enter Mobile Number"
                  name="refUserMobileno"
                />
              </div>
            </div>
          </div>
          {errorStatus.status ? (
            <div
              className="ion-padding"
              style={{
                color: "red",
                height: "7vh",
              }}
            >
              {errorStatus.message}
            </div>
          ) : (
            <div></div>
          )}
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

export default ChangePhoneNumber;
