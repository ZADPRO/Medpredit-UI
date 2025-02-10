import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonRippleEffect,
} from "@ionic/react";
import React from "react";
import { FaHospitalUser } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { RiAdminLine } from "react-icons/ri";
import { MdManageAccounts } from "react-icons/md";
import { useHistory } from "react-router";

const Configure = () => {
  const history = useHistory();

  const view = [
    {
      icon: <FaUserDoctor />,
      name: "Add Doctor",
      link: "/addDoctor",
      roleId: "1",
    },
    {
      icon: <FaHospitalUser />,
      name: "Add Assistant",
      link: "/addDoctor",
      roleId: "2",
    },
    // {
    //   icon: <RiAdminLine />,
    //   name: "Add Doctor + Admin",
    //   link: "/addDoctor",
    //   roleId: "4",
    // },
    {
      icon: <MdManageAccounts />,
      name: "Manage Doctor",
      link: "/manageDoctor",
      roleId: "1",
    },
    {
      icon: <MdManageAccounts />,
      name: "Manage Assistant",
      link: "/manageAssistant",
      roleId: "2",
    },
  ];

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {view.map((element, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                background: "#e6e6e6",
                borderRadius: "5px",
                flexDirection: "row",
                padding: "10px",
              }}
              className="ion-activatable ripple-parent rectangle"
              onClick={() => {
                localStorage.setItem("createRoleId", element.roleId);
                history.push(`${element.link}`, {
                  direction: "forward",
                  animation: "slide",
                });
              }}
            >
              <IonRippleEffect></IonRippleEffect>
              <div
                style={{
                  width: "25%",
                  display: "flex",
                  justifyContent: "start",
                }}
              >
                <div
                  style={{
                    width: "4rem",
                    height: "4rem",
                    background: "#077556",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "50%",
                    fontSize: "2.0rem",
                    color: "#fff",
                  }}
                >
                  {element.icon}
                </div>
              </div>
              <div
                style={{
                  width: "75%",
                  height: "4rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ fontSize: "1.2rem", fontWeight: "700" }}>
                  {element.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Configure;
