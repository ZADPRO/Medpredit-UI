import { IonModal, IonRippleEffect } from "@ionic/react";
import { useState } from "react";
import Vigorous from "../ShowCard/PhysicalActivity/Vigorous";
import Moderate from "../ShowCard/PhysicalActivity/Moderate";
import Vigoroustime from "../ShowCard/PhysicalActivity/Vigoroustime";
import Moderatetime from "../ShowCard/PhysicalActivity/Moderatetime";
import Smoke from "../ShowCard/Tobacco/Smoke";
import Work from "./PhysicalActivity/Work";

interface ShowCardProps {
  questionId: string | number;
}

const Domaincard: React.FC<ShowCardProps> = ({ questionId }) => {
  const [isModel, setIsModel] = useState(false);
  const [label, setLabel] = useState("");
  const verifydomaincard = (questionId: any) => {
    switch (questionId) {
      case 1:
        setLabel("Domain WOrk");
        return true;
      case 7:
        return true;
      case 10:
        return true;
      case 16:
        return true;

      default:
        return false;
    }
  };
  const getShowCard = () => {
    switch (questionId) {
      case 1:
        return <Work />;

      default:
        return null; // Return null if no match, or you can render something else
    }
  };

  return (
    <div>
      <IonModal
        isOpen={isModel}
        id="doctorDetailsGraph"
        initialBreakpoint={1}
        onDidDismiss={() => {
          setIsModel(false);
        }}
        animated={false}
      >
        <div className="doctor-modal-content">
          {/* Header */}
          <div className="doctor-modal-header">{label}</div>
          {/* <p>{verifyShowCard(questionId) ? "yes" : "no"}</p> */}
          <div>{getShowCard()}</div>{" "}
          {/* Render JSX element returned by getShowCard */}
          {/* Close Button */}
          <button
            className="doctor-modal-close-btn ion-activatable ripple-parent rectangle"
            onClick={() => {
              setIsModel(false);
            }}
          >
            <IonRippleEffect></IonRippleEffect>
            Close
          </button>
        </div>
      </IonModal>

      {verifydomaincard(questionId) ? <div>sdfjb</div> : null}

      <div style={{ padding: "10px 0px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="doctor-modal-header">Domain Work</div>
          <div
            onClick={() => {
              setIsModel(true);
            }}
            style={{ textDecoration: "underline", color: "blue" }}
          >
            Instruction
          </div>
        </div>
        {/* <p>{verifyShowCard(questionId) ? "yes" : "no"}</p> */}
        {/* <div>{getShowCard()}</div>{" "} */}
      </div>
    </div>
  );
};

export default Domaincard;
