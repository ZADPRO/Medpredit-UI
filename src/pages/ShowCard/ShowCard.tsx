import { IonModal, IonRippleEffect } from "@ionic/react";
import { useState } from "react";
import Vigorous from "./PhysicalActivity/Vigorous";
import Moderate from "./PhysicalActivity/Moderate";
import Vigoroustime from "./PhysicalActivity/Vigoroustime";
import Moderatetime from "./PhysicalActivity/Moderatetime";
import Smoke from "./Tobacco/Smoke";
import Smokeaffects from "./Tobacco/Smokeaffects";
import BMI_Height from "./BMI/BMI_Height";
import BMI_Weight from "./BMI/BMI_Weight";
import BMI_Waist from "./BMI/BMI_Waist";
import BMI_Hip from "./BMI/BMI_Hip";
import WholeGranins from "./Dietary/WholeGrains";
import Refinedcarbs from "./Dietary/Refinedcarbs";
import Vegetable from "./Dietary/Vegetable";
import Tubers from "./Dietary/Tubers";
import Nonveg from "./Dietary/Nonveg";
import Salt from "./Dietary/Salt";
import Dairy from "./Dietary/Dairy";

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
      case 52:
        return true;
      case 53:
        return true;
      case 54:
        return true;
      case 55:
        return true;
      case 56:
        return true;
      case 59:
        return true;
      case 67:
        return true;
      case 126:
        return true;
      case 127:
        return true;
      case 128:
        return true;
      case 129:
        return true;
      case 131:
        return true;
      case 142:
        return true;
      case 143:
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
      case 52:
        return <BMI_Height content={"showcards"} />
      case 53:
        return <BMI_Weight content={"showcards"} />
      case 54:
        return <BMI_Waist content={"showcards"} />
      case 55:
        return <BMI_Hip content={"showcards"} />
      case 56:
        return <Smoke view={"showcards"} />;
      case 59:
        return <Smoke view={"showcards"} />;
      case 67:
        return <Smokeaffects view={"showcards"} />;
      case 126:
        return <WholeGranins view={"showcards"} />;
      case 127:
        return <Refinedcarbs view={"showcards"} />;
      case 128:
        return <Vegetable view={"showcards"} />;
      case 129:
        return <Tubers view={"showcards"} />;
      case 131:
        return <Nonveg view={"showcards"} />;
      case 142:
        return <Salt view={"showcards"} />;
      case 143:
        return <Dairy view={"showcards"} />;
      default:
        return null; // Return null if no match, or you can render something else
    }
  };

  const verifyExampleCard = (questionId: any) => {
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
        </div>
      ) : null}

      {verifyExampleCard(questionId) ? (
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
      ) : null}
    </div>
  );
};

export default ShowCard;
