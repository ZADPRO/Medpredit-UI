import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonRippleEffect,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Tab4.css";

import profile from "../../assets/images/profile.png";
import profile_new from "../../assets/logo_new/PROFILE_ICON-19.png";
import { Divider } from "primereact/divider";
import {
  chatbubblesOutline,
  compassOutline,
  cube,
  gift,
  headset,
  heart,
  languageOutline,
  notificationsOutline,
  personOutline,
  starOutline,
  logOutOutline,
  lockClosedOutline,
  arrowBack,
  chevronBack,
  settingsOutline,
  person,
} from "ionicons/icons";
import SettingsTile from "../SettingsTile/SettingsTile";
import ListItem from "../ListItem/ListItem";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import Axios from "axios";
import decrypt from "../../helper";

import { PiHospitalBold } from "react-icons/pi";
import { MdOutlinePassword } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const Tab4: React.FC = () => {
  const overallSettings = [
    {
      icon: <MdOutlinePassword />,
      label: "Change Password",
      location: "/changePassword",
    },
  ];

  const [userData, setUserData] = useState({
    name: "",
    userCustId: "",
    hospitalName: "",
  });

  const history = useHistory();

  console.log(userData);

  useEffect(() => {
    const tokenString = localStorage.getItem("userDetails");

    if (tokenString) {
      const tokenObject = JSON.parse(tokenString);
      const token = tokenObject.token;

      Axios.post(
        `${import.meta.env.VITE_API_URL}/getProfile`,
        {
          hospitalId: localStorage.getItem("hospitalId"),
          roleId: tokenObject.roleType
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      ).then((response) => {
        const data = decrypt(
          response.data[1],
          response.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        const tempUserData = {
          name: data.data.refUserName,
          userCustId: data.data.refUserCustId,
          hospitalName: data.data.refHospitalName,
        };

        setUserData(tempUserData);
        localStorage.setItem('userProfileData', JSON.stringify(tempUserData));
      });
    }
  }, []);

  return (
    <IonPage>
      {/*
      <IonContent fullscreen>
        <div style={{ width: "100%", height: "93vh", background: "#f4f4f4" }}>
          <div
            style={{
              width: "100%",
              height: "35vh",
              // padding: "1.5rem",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div>
              <img
                src={profile}
                style={{ height: "7rem" }}
                alt="ProfileImage"
              />
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <div
                style={{
                  fontSize: "1.3rem",
                  fontWeight: "700",
                  color: "#505050",
                }}
              >
                {userData.name}
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  fontWeight: "600",
                  color: "#9f9f9f",
                }}
              >
                {userData.userCustId}
              </div>
              <div
                style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  color: "#505050",
                  display: "flex",
                }}
              >
                <div style={{ marginTop: "1px" }}>
                  <PiHospitalBold />
                </div>
                &nbsp;<div>{userData.hospitalName}</div>
              </div>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              height: "58vh",
              paddingTop: "5vh",
              paddingLeft: "2vh",
              paddingRight: "2vh",
              display: "flex",
              background: "#fff",
              flexDirection: "column",
              borderTopLeftRadius: "50px",
              borderTopRightRadius: "50px",
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            }}
          >
            <div
              style={{
                fontSize: "1.3rem",
                fontWeight: "700",
                color: "#505050",
                paddingLeft: "3vh",
              }}
            >
              Settings
            </div>

            <div
              style={{
                marginTop: "3vh",
                height: "100%",
                overflow: "auto",
              }}
            >
              {overallSettings.map((item, index) => (
                <ListItem
                  key={index}
                  icon={item.icon}
                  label={item.label}
                  location={item.location}
                />
              ))}

              <div
                style={{
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: "3vh",
                  paddingRight: "3vh",
                }}
                onClick={() => {
                  localStorage.clear();
                  location.replace("/");
                }}
                className="ion-activatable ripple-parent rectangle"
              >
                <IonRippleEffect></IonRippleEffect>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      background: "red",
                      fontSize: "1.4rem",
                      color: "#fff",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                    }}
                  >
                    <FiLogOut />
                  </div>
                  <div
                    style={{
                      paddingLeft: "10px",
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#505050",
                    }}
                  >
                    Logout
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "1rem",
                    color: "#bdbdbd",
                  }}
                >
                  <FaChevronRight />
                </div>
              </div>
            </div>
          </div>
        </div>
      </IonContent> */}

      <IonContent fullscreen>
        <div className="tab4 medpredit-page-background">
          <div className="tab4TopDiv">
            <div
              className="ion-activatable ripple-parent rectangle"
              style={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "90%",
                color: "white",
                fontSize: "1.2rem",
              }}
            >
              <span style={{ position: "absolute", left: 0 }}></span>
              <span>Profile</span>
              <IonIcon
                onClick={() => {
                  history.push("/usersettings", {
                    direction: "forward",
                    animation: "slide",
                  });
                }}
                icon={settingsOutline}
                style={{ position: "absolute", right: 0 }}
              ></IonIcon>
            </div>

            <div
              style={{
                marginTop: "3rem",
                height: "25vh",
                width: "25vh",
              }}
            >
              <img src={profile_new} />
            </div>

            <div
              style={{
                color: "white",
              }}
            >
              <h2>{userData.name}</h2>
            </div>
          </div>

          <div className="tab4BottomDiv">
            <h3>ID: {userData.userCustId}</h3>
            <h3>{userData.hospitalName}</h3>
            <button
              style={{ margin: "1rem" }}
              className="logOutButton gradientBackground02 ion-activatable ripple-parent rectangle"
              onClick={() => {
                localStorage.clear();
                location.replace("/");
              }}
            //className="ion-margin-top ion-margin-bottom ion-activatable ripple-parent rectangle"
            >
              <IonRippleEffect></IonRippleEffect>
              {"Logout"}
            </button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab4;
