import {
  IonContent,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabs,
  IonTabButton,
  IonTabBar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { Redirect, Route, useHistory, useLocation } from "react-router";
import Tab1 from "../Tab1/Tab1";
import Tab2 from "../Tab2/Tab2";
import Tab3 from "../Tab3/Tab3";
import Tab4 from "../Tab4/Tab4";
import {
  homeOutline,
  homeSharp,
  medkit,
  medkitOutline,
  personAddOutline,
  personAddSharp,
  personOutline,
  personSharp,
  settingsOutline,
  settingsSharp,
  reader,
  readerOutline,
} from "ionicons/icons";

import Login from "../../components/01-Login/Login";
import Splashscreen from "../../components/00-Splashscreen/Splashscreen";
import Intro from "../../components/02-Intro/Intro";
import Enroll from "../../components/03-Enroll/Enroll";
import AddUser from "../AddUser/AddUser";
import KnowAboutPatient from "../../components/22-KnowAboutPatient/KnowAboutPatient";
import Questions from "../Questions/Questions";
import Tab5 from "../Tab5/Tab5";
import AddQuestions from "../../components/33-AddQuestions/AddQuestions";
import AddEmployee from "../../components/34-AddEmployee/AddEmployee";
import SubCategories from "../SubCategories/SubCategories";
import AddFamilyUser from "../AddFamilyUser/AddFamilyUser";
import PastReport from "../../components/35-PastReport/PastReport";
import AlcoholInfo from "../Information/AlcoholInfo";
import AlcoholInstructions from "../Instructions/AlcoholInstructions";
import TobaccoInfo from "../Information/TobaccoInfo";
import ChangePassword from "../../components/04-ChangePassword/ChangePassword";
import { StatusBar, Style } from "@capacitor/status-bar";
import PhysicalInstructions from "../Instructions/PhysicalInstructions";
import PhysicalInfo from "../Information/PhysicalInfo";
import CurrentReport from "../../components/36-CurrentReport/CurrentReport";
import ReportPDF from "../ReportPDF/ReportPDF";
import TobaccoInstructions from "../Instructions/TobaccoInstructions";
import StressInstructions from "../Instructions/StressInstructions";
import StressInfo from "../Information/StressInfo";

import knowabout from "../../assets/logo/knowabout.png";
import knowaboutOutline from "../../assets/logo/knowaboutOutline.png";
import PatientSignUp from "../../components/05-SingUp/PatientSignUp";
import Configure from "../../components/23-Configure/Configure";
import StaffSignup from "../StaffSignup/StaffSignup";
import ManageAssistant from "../ManageAssistant/ManageAssistant";
import MapAssistant from "../ManageAssistant/MapAssistant";
import ManageDoctor from "../ManageDoctor/ManageDoctor";
import TestingPdf from "../TestingPdf/TestingPdf";
import CheckUp from "../CheckUp/CheckUp";

import homeSharpNew from "../../assets/logo_new/Home_Icon.png";
import homeOutlineNew from "../../assets/logo_new/Home_Icon_Outline.png";
import patientSharpNew from "../../assets/logo_new/Patient_Icon.png";
import patientOutlineNew from "../../assets/logo_new/Patient_Icon_Outline.png";
import knowAboutSharpNew from "../../assets/logo_new/KnowAbout_Icon.png";
import knowAboutOutlineNew from "../../assets/logo_new/KnowAbout_Icon_Outline.png";
import adviceSharpNew from "../../assets/logo_new/Advice_Icon.png";
import adviceOutlineNew from "../../assets/logo_new/Advice_Icon_Outline.png";
import profileSharpNew from "../../assets/logo_new/Profile_Icon.png";
import profileOutlineNew from "../../assets/logo_new/Profile_Icon_Outline.png";
import configureSharpNew from "../../assets/logo_new/Configure_Icon.png";
import configureOutlineNew from "../../assets/logo_new/Configure_Icon_Outline.png";
import medkitSharpNew from "../../assets/logo_new/Medkit_Icon.png";
import medkitOutlineNew from "../../assets/logo_new/Medkit_Icon_Outline.png";

import "./MainRoutes.css";
import UserSettings from "../UserSettings/UserSettings";
import ChangePassword1 from "../../components/04-ChangePassword/ChangePassword1";
import ChangePhoneNumber from "../../components/06-ChangePhoneNumber/ChangePhoneNumber";
import { Capacitor } from "@capacitor/core";

const MainRoutes: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      StatusBar.setOverlaysWebView({ overlay: false });
      StatusBar.setStyle({ style: Style.Light });
      StatusBar.setBackgroundColor({ color: "#ffffff" });

      return () => {
        StatusBar.setOverlaysWebView({ overlay: true });
      };
    }
  }, []);

  // const configureStatusBar = async () => {
  //   const path = location.pathname;
  //   let bgcolor = "#ffffff";
  //   if (path === "/profile") {
  //     bgcolor = "#0969b3";
  //   } else if (
  //     path === "/currentReport/:reportDate" ||
  //     path === "/pastreport/:reportDate"
  //   ) {
  //     bgcolor = "#b8e1ff";
  //   }
  //   // Change the color (example: blue)
  //   await StatusBar.setBackgroundColor({ color: bgcolor });

  //   // Optional: Set the style (light or dark content)
  //   await StatusBar.setStyle({ style: Style.Light });
  // };

  // // Call the function on app startup
  // configureStatusBar();

  const showTabBar = [
    "/home",
    "/patient",
    "/advice",
    "/disease",
    "/profile",
    "/configure",
    "/checkup",
  ].includes(location.pathname);

  const history = useHistory();

  const tokenString = localStorage.getItem("userDetails");

  let roleType = 1;

  if (tokenString) {
    const tokenObject = JSON.parse(tokenString);
    roleType = tokenObject.roleType;
  }

  const patient = [
    {
      name: "CheckList",
      path: "/checkup",
      outlineIcon: medkitOutlineNew,
      sharpIcon: medkitSharpNew,
    },
    {
      name: "Disease",
      path: "/disease",
      outlineIcon: knowAboutOutlineNew,
      sharpIcon: knowAboutSharpNew,
    },
    {
      name: "Profile",
      path: "/profile",
      outlineIcon: profileOutlineNew,
      sharpIcon: profileSharpNew,
    },
  ];

  const assistant = [
    {
      name: "Home",
      path: "/home",
      outlineIcon: homeOutlineNew,
      sharpIcon: homeSharpNew,
    },
    {
      name: "Patient",
      path: "/patient",
      outlineIcon: patientOutlineNew,
      sharpIcon: patientSharpNew,
    },
    {
      name: "Disease",
      path: "/disease",
      outlineIcon: knowAboutOutlineNew,
      sharpIcon: knowAboutSharpNew,
    },
    {
      name: "Profile",
      path: "/profile",
      outlineIcon: profileOutlineNew,
      sharpIcon: profileSharpNew,
    },
  ];

  const doctor = [
    {
      name: "Home",
      path: "/home",
      outlineIcon: homeOutlineNew,
      sharpIcon: homeSharpNew,
    },
    {
      name: "Patient",
      path: "/patient",
      outlineIcon: patientOutlineNew,
      sharpIcon: patientSharpNew,
    },
    {
      name: "Disease",
      path: "/disease",
      outlineIcon: knowAboutOutlineNew,
      sharpIcon: knowAboutSharpNew,
    },
    {
      name: "Profile",
      path: "/profile",
      outlineIcon: profileOutlineNew,
      sharpIcon: profileSharpNew,
    },
  ];

  const doctorAdmin = [
    {
      name: "Home",
      path: "/home",
      outlineIcon: homeOutlineNew,
      sharpIcon: homeSharpNew,
    },
    {
      name: "Patient",
      path: "/patient",
      outlineIcon: patientOutlineNew,
      sharpIcon: patientSharpNew,
    },
    {
      name: "Disease",
      path: "/disease",
      outlineIcon: knowAboutOutlineNew,
      sharpIcon: knowAboutSharpNew,
    },
    {
      name: "Configure",
      path: "/configure",
      outlineIcon: configureOutlineNew,
      sharpIcon: configureSharpNew,
    },
    {
      name: "Profile",
      path: "/profile",
      outlineIcon: profileOutlineNew,
      sharpIcon: profileSharpNew,
    },
  ];

  const Admin = [
    {
      name: "Configure",
      path: "/configure",
      outlineIcon: configureOutlineNew,
      sharpIcon: configureSharpNew,
    },
    {
      name: "Profile",
      path: "/profile",
      outlineIcon: profileOutlineNew,
      sharpIcon: profileSharpNew,
    },
  ];


  return (
    <IonTabs>
      <IonRouterOutlet id="main">
        <Route exact path="/">
          <Splashscreen />
        </Route>
        <Route path="/changePassword">
          <ChangePassword />
        </Route>
        <Route path="/changePassword1">
          <ChangePassword1 />
        </Route>
        <Route path="/home">
          <Tab1 />
        </Route>
        <Route path="/patient">
          <Tab2 />
        </Route>
        <Route path="/advice">
          <Tab3 />
        </Route>
        <Route path="/profile">
          <Tab4 />
        </Route>
        <Route path="/disease">
          <Tab5 />
        </Route>
        <Route path="/addUser">
          <AddUser />
        </Route>
        <Route path="/addfamilyuser/:urlMobileNo/:urluserId">
          <AddFamilyUser />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/splash">
          <Splashscreen />
        </Route>
        <Route path="/intro">
          <Intro />
        </Route>
        <Route path="/enroll">
          <Enroll />
        </Route>
        <Route path="/subCategories/:categoryId/:categroyName">
          <SubCategories />
        </Route>
        <Route path="/knowAbout/:patient/:patientId">
          <KnowAboutPatient />
        </Route>
        <Route path="/questions/:refCategoryLabel/:cardTitle">
          <Questions />
        </Route>
        <Route path="/addQuestions">
          <AddQuestions />
        </Route>
        <Route path="/addEmployee">
          <AddEmployee />
        </Route>
        <Route path="/pastreport/:reportDate">
          <PastReport />
        </Route>
        {/* <Route path="/pastreport/:pastReport">
          <PastReport />
        </Route> */}
        <Route exact path="/">
          <Redirect to="/splash" />
        </Route>

        <Route path="/physicalActivity/instructions">
          <PhysicalInstructions />
        </Route>

        <Route path="/tobacoo/instructions">
          <TobaccoInstructions />
        </Route>

        <Route path="/stress/instructions">
          <StressInstructions />
        </Route>

        <Route path="/alcohol/instructions">
          <AlcoholInstructions />
        </Route>

        <Route path="/physicalActivity/showCards">
          <PhysicalInfo />
        </Route>

        <Route path="/tobacoo/showCards">
          <TobaccoInfo />
        </Route>

        <Route path="/stress/showCards">
          <StressInfo />
        </Route>

        <Route path="/alcohol/showCards">
          <AlcoholInfo />
        </Route>

        <Route path="/currentReport/:reportDate">
          <CurrentReport />
        </Route>

        <Route path="/patientSignUp">
          <PatientSignUp />
        </Route>

        <Route path="/testingPdf">
          <TestingPdf reportDate={"2025-03-14"} />
          {/* <TestingPdf type="pastReport" fromDate="2024-12-1" toDate="2024-12-16" refPMId="5" /> */}
        </Route>

        <Route path="/configure">
          <Configure />
        </Route>

        <Route path="/checkup">
          <CheckUp />
        </Route>

        <Route path="/addDoctor">
          <StaffSignup />
        </Route>

        <Route path="/manageAssistant">
          <ManageAssistant />
        </Route>

        <Route path="/mapAssistant/:assistantId/:assistantName/:assistantCustId">
          <MapAssistant />
        </Route>

        <Route path="/manageDoctor">
          <ManageDoctor />
        </Route>

        <Route path="/usersettings">
          <UserSettings />
        </Route>

        <Route path="/changePhoneNumber">
          <ChangePhoneNumber />
        </Route>
      </IonRouterOutlet>

      {showTabBar && (
        <IonTabBar id="mainIonToolbar" slot="bottom">
          {(roleType === 1
            ? doctor
            : roleType === 2
              ? assistant
              : roleType === 3
                ? patient
                : roleType === 4
                  ? doctorAdmin
                  : roleType === 5
                    ? Admin
                    : []
          ).map((element) => (
            <IonTabButton
              className={
                location.pathname === element.path
                  ? "mainIonTabButton gradientButton01"
                  : "mainIonTabButton"
              }
              tab={element.name}
              href={element.path}
            >
              <img
                style={{ width: "25px", height: "25px" }}
                src={
                  location.pathname === element.path
                    ? element.sharpIcon
                    : element.outlineIcon
                }
              />
              <IonLabel
                style={{
                  fontSize: "12px",
                  color:
                    location.pathname === element.path ? "white" : "#0375c6",
                }}
              >
                {element.name}
              </IonLabel>
            </IonTabButton>
          ))}
        </IonTabBar>
      )}
    </IonTabs>
  );
};

export default MainRoutes;
