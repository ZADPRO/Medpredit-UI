import { IonModal, IonRippleEffect } from "@ionic/react";
import { useState } from "react";
import Vigorous from "./PhysicalActivity/Vigorous";
import Moderate from "./PhysicalActivity/Moderate";
import Vigoroustime from "./PhysicalActivity/Vigoroustime";
import Moderatetime from "./PhysicalActivity/Moderatetime";
import Smoke from "./Tobacco/Smoke";
import Smokeaffects from "./Tobacco/Smokeaffects";

interface ShowCardProps {
  questionId: string | number;
}

const ShowCard: React.FC<ShowCardProps> = ({ questionId }) => {
  const [isModel, setIsModel] = useState(false);
  const [isExample, setIsExample] = useState(false);

  const verifyShowCard = (questionId: any) => {
    switch (questionId) {
      case 1:
        return true;
      case 4:
        return true;
      case 10:
        return true;
      case 13:
        return true;
      case 56:
        return true;
      case 59:
        return true;
      case 67:
        return true;

      default:
        return false;
    }
  };

  const getShowCard = () => {
    switch (questionId) {
      case 1:
        return <Vigorous view={"showcard"} />; // Make sure to return JSX element here
      case 4:
        return <Moderate content={"showcards"} />;
      case 10:
        return <Vigoroustime view={"showcards"} />;
      case 13:
        return <Moderatetime content={"showcards"} />;
      case 56:
        return <Smoke view={"showcards"} />;
      case 59:
        return <Smoke view={"showcards"} />;
      case 67:
        return <Smokeaffects view={"showcards"} />;
      default:
        return null; // Return null if no match, or you can render something else
    }
  };

  const getExample = () => {
    switch (questionId) {
      case 1:
        return <Vigorous view={"example"} />; // Make sure to return JSX element here
      case 4:
        return <Moderate content={"example"} />;
      case 10:
        return <Vigoroustime view={"example"} />;
      case 13:
        return <Moderatetime content={"example"} />;
      case 56:
        return <Smoke view={"example"} />;
      case 59:
        return <Smoke view={"example"} />;
      case 67:
        return <Smokeaffects view={"example"} />;
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
        <div className="doctor-modal-content" style={{ background: "linear-gradient(227deg, rgba(255,255,255,1) 39%, rgba(255,255,255,1) 61%, rgba(217,240,255,1)100%)" }}>
          {/* Header */}
          <div className="doctor-modal-header">Show Cards</div>
          {/* <p>{verifyShowCard(questionId) ? "yes" : "no"}</p> */}
          <div>{getShowCard()}</div>{" "}
          {/* Render JSX element returned by getShowCard */}
          {/* Close Button */}
          <button
            className="doctor-modal-close-btn ion-activatable ripple-parent rectangle"
            onClick={() => {
              setIsModel(false);
            }}
            style={{ background: "linear-gradient(-167deg, rgb(15, 149, 232) 0%, rgb(3, 117, 198) 100%)", color: "#fff" }}
          >
            <IonRippleEffect></IonRippleEffect>
            Close
          </button>
        </div>
      </IonModal>
      <IonModal
        isOpen={isExample}
        id="doctorDetailsGraph"
        initialBreakpoint={1}
        onDidDismiss={() => {
          setIsExample(false);
        }}
        animated={false}
      >
        <div className="doctor-modal-content" style={{ background: "linear-gradient(227deg, rgba(255,255,255,1) 39%, rgba(255,255,255,1) 61%, rgba(217,240,255,1)100%)" }}>
          {/* Header */}
          <div className="doctor-modal-header">Example</div>
          {/* <p>{verifyShowCard(questionId) ? "yes" : "no"}</p> */}
          <div>{getExample()}</div>{" "}
          {/* Render JSX element returned by getShowCard */}
          {/* Close Button */}
          <button
            className="doctor-modal-close-btn ion-activatable ripple-parent rectangle"
            onClick={() => {
              setIsExample(false);
            }}
            style={{ background: "linear-gradient(-167deg, rgb(15, 149, 232) 0%, rgb(3, 117, 198) 100%)", color: "#fff" }}
          >
            <IonRippleEffect></IonRippleEffect>
            Close
          </button>
        </div>
      </IonModal>

      {verifyShowCard(questionId) ? (
        <div
          style={{
            display: "flex",
            flex: "flex-row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              marginBottom: "10px",
              textDecoration: "underline",
              color: "#569baa",
              cursor: "pointer",
              fontSize: "0.9rem"
            }}
            onClick={() => {
              setIsModel(true);
            }}
          >
            Show Card
          </div>
          <div
            style={{
              marginBottom: "10px",
              textDecoration: "underline",
              color: "#569baa",
              cursor: "pointer",
              fontSize: "0.9rem"
            }}
            onClick={() => {
              setIsExample(true);
            }}
          >
            Example
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ShowCard;
