import { IonModal, IonRippleEffect } from "@ionic/react";
import { useState } from "react";

interface ShowCardProps {
  questionId: string | number;
}

const ShowCard: React.FC<ShowCardProps> = ({ questionId }) => {
  const [isModel, setIsModel] = useState(false);

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
          <div className="doctor-modal-header">Show Cards</div>
          <p>{questionId}</p>
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
      <div
        style={{
          marginBottom: "10px",
          textDecoration: "underline",
          color: "blue",
          cursor: "pointer",
        }}
        onClick={() => {
          setIsModel(true);
        }}
      >
        Show Card
      </div>
    </div>
  );
};

export default ShowCard;
