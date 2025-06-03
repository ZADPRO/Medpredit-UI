import {
  IonContent,
  IonHeader,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Tab1.css";
import { useEffect, useState } from "react";
import Diabetes from "../KnowDisease/Diabetes";
import AppExitHandler from "../AppExitHandler/AppExitHandler";
import axios from "axios";
import decrypt from "../../helper";
import profileImg from "../../assets/logo_new/PROFILE_ICON-19.png"
import { Divider } from "primereact/divider";

const Tab1: React.FC = () => {

  const [userData, setUserData]: any = useState();

  const tokenString: any = localStorage.getItem("userDetails");
  const tokenObject = JSON.parse(tokenString);

  useEffect(() => {

    axios
      .post(`${import.meta.env.VITE_API_URL}${tokenObject.roleType === 1 || tokenObject.roleType === 4 ? "/getHomeScreenDoctor" : "/getHomeScreenDoctorAssistant"}`, { hospitalId: localStorage.getItem("hospitalId") }, {
        headers: {
          Authorization: tokenObject.token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const data = decrypt(
          response.data[1],
          response.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        console.log(data);

        setUserData(data);

        setLoadingStatus(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });


    localStorage.removeItem("getMainCat");

  }, [location.pathname === "/home"]);




  const [loadingStatus, setLoadingStatus] = useState<boolean>(true);




  return (
    <IonPage>
      {
        loadingStatus ? (
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
            <AppExitHandler />
            <IonHeader>
              <IonToolbar>
                <div style={{ width: "100%", background: "#0969b3"}}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "20vh", padding: "0px 20px" }}>
                    <div>
                      <div style={{ fontSize: "1rem", fontWeight: "700", color: "white" }}>Hi,</div>
                      <div style={{ fontSize: "0.9rem", fontWeight: "600", color: "white" }}>{tokenObject.roleType === 1 || tokenObject.roleType === 4 ? "Dr. " : ""}{userData ? userData.profileName.refUserName : ""}</div>
                      <div style={{ fontSize: "0.7rem", fontWeight: "600", color: "white" }}>{userData ? userData.profileName.refUserCustId : ""}</div>
                    </div>
                    <div><img src={profileImg} style={{ width: "4rem" }} alt="profile" /></div>
                  </div>
                </div>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <div className="tab2 medpredit-page-background">
                <div style={{ height: "100vh", width: "100%" }}>

                  <div style={{ height: "80vh", overflow: "auto" }}>

                    <div style={{ fontSize: "1rem", padding: "1rem", fontWeight: "700", color: "#4b6172", }}>Patient Attended Count</div>

                    <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", }}>
                      <div style={{ width: "90%", display: "flex", flexWrap: "wrap", gap: "1rem", rowGap: "1rem", justifyContent: "space-between" }}>
                        <div style={{ width: "47%", background: "#3799f2", height: "7vh", borderRadius: "5px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "0.4vh" }}>
                          <div style={{ fontSize: "0.8rem", fontWeight: "700", color: "#fff" }}>{userData ? userData.todayPatient : ""}</div>
                          <div style={{ fontSize: "0.8rem", fontWeight: "700", color: "#fff" }}>Today</div>
                        </div>

                        <div style={{ width: "47%", background: "#3799f2", height: "7vh", borderRadius: "5px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "0.4vh" }}>
                          <div style={{ fontSize: "0.8rem", fontWeight: "700", color: "#fff" }}>{userData ? userData.yesterdayPatient : ""}</div>
                          <div style={{ fontSize: "0.8rem", fontWeight: "700", color: "#fff" }}>Yesterday</div>
                        </div>

                        <div style={{ width: "47%", background: "#3799f2", height: "7vh", borderRadius: "5px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "0.4vh" }}>
                          <div style={{ fontSize: "0.8rem", fontWeight: "700", color: "#fff" }}>{userData ? userData.lastweekPatient : ""}</div>
                          <div style={{ fontSize: "0.8rem", fontWeight: "700", color: "#fff" }}>Last Week</div>
                        </div>

                        <div style={{ width: "47%", background: "#3799f2", height: "7vh", borderRadius: "5px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "0.4vh" }}>
                          <div style={{ fontSize: "0.8rem", fontWeight: "700", color: "#fff" }}>{userData ? userData.lastmonth : ""}</div>
                          <div style={{ fontSize: "0.8rem", fontWeight: "700", color: "#fff" }}>Last Month</div>
                        </div>

                        <div style={{ width: "47%", background: "#3799f2", height: "7vh", borderRadius: "5px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "0.4vh" }}>
                          <div style={{ fontSize: "0.8rem", fontWeight: "700", color: "#fff" }}>{userData ? userData.lastmonth : ""}</div>
                          <div style={{ fontSize: "0.8rem", fontWeight: "700", color: "#fff" }}>Previous Month</div>
                        </div>
                      </div>
                    </div>

                    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                      <div style={{ width: "90%" }}><Divider /></div>
                    </div>

                    <div style={{ fontSize: "1rem", padding: "0px 1rem", fontWeight: "700", color: "#4b6172", paddingBottom: "10px" }}>Today's Risk Factor Count</div>

                    <div style={{ margin: "0px 1rem", borderRadius: "10px", padding: "0.3rem", color: "#02538e", marginBottom: "1vh" }}>
                      {
                        userData ?
                          userData.totalCategory.map((element: any) => (
                            <div>
                              <div style={{ fontSize: "0.8rem", fontWeight: "700" }}>
                                {element.name}
                              </div>
                              <div style={{ padding: "0.4rem 0px", display: "flex", flexDirection: "column", gap: "10px" }}>
                                {
                                  element.data.map((data: any) => (
                                    <div style={{ width: "100%", height: "4vh", background: `${data.color}`, borderRadius: "5px", color: "#fff", fontWeight: "600", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0px 1rem" }}>
                                      <div style={{ fontSize: "0.8rem" }}>
                                        {data.name}
                                      </div>
                                      <div style={{ fontSize: "0.8rem" }}>
                                        {data.value}
                                      </div>
                                    </div>
                                  ))
                                }
                              </div>
                              <Divider />
                            </div>
                          )) : ""
                      }
                    </div>


                    <div style={{ marginBottom: "15vh", padding: "0px 1.2rem", color: "#c0c0c0", fontSize: "3rem", fontWeight: "900" }}>
                      <div>Live</div>
                      <div style={{ marginTop: "-20px" }}>it up!</div>
                      <div style={{ fontSize: "1rem" }}>Created with ❤️ in Salem, India</div>
                    </div>



                  </div>
                </div>
              </div>
            </IonContent></>
        )
      }
    </IonPage>
  );
};

export default Tab1;