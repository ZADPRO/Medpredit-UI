import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonRippleEffect,
} from "@ionic/react";
import { useHistory } from "react-router";
import { chevronForward } from "ionicons/icons";
import AddDoctor from "../../assets/logo_new/AddDoctor.png";
import AddAssistant from "../../assets/logo_new/AddAssistant.png";
import ManageDoctor from "../../assets/logo_new/MangeDoctor.png";
import ManageAssisatnt from "../../assets/logo_new/AssistantManage.png";

const Configure = () => {
  const history = useHistory();

  const view = [
    {
      icon: AddDoctor,
      name: "Add Doctor",
      link: "/addDoctor",
      roleId: "1",
    },
    {
      icon: AddAssistant,
      name: "Add Assistant",
      link: "/addDoctor",
      roleId: "2",
    },
    {
      icon: ManageDoctor,
      name: "Manage Doctor",
      link: "/manageDoctor",
      roleId: "1",
    },
    {
      icon: ManageAssisatnt,
      name: "Manage Assistant",
      link: "/manageAssistant",
      roleId: "2",
    },
  ];

  return (
    <IonPage>
      <IonContent>
        <div className="tab2 medpredit-page-background">
          <div className="">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                fontSize: "1.2rem",
                fontWeight: "600",
                padding: "5% 0 1rem 0",
              }}
            >
              <span></span>
              <span>Configure</span>
              <span></span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
              {view.map((element, index) => (
                <div
                  className="mt-2 grid-item"
                  key={index}
                  onClick={() => {
                    localStorage.setItem("createRoleId", element.roleId);
                    history.push(`${element.link}`, {
                      direction: "forward",
                      animation: "slide",
                    });
                  }}
                >
                  <div className="knowCard gradientButton02 boxShadow01 ion-activatable ripple-parent rectangle">
                    <IonRippleEffect />
                    <div className="knowCardcontent">
                      <img
                        src={element.icon}
                        alt={element.name}
                      />
                      <p>{element.name}</p>
                    </div>
                    <IonIcon
                      size="large"
                      icon={chevronForward}
                    ></IonIcon>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Configure;
