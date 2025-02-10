import { IonModal, IonRippleEffect } from "@ionic/react";
import { useState } from "react";
import Work from "./PhysicalActivity/Work";
import Travel from "./PhysicalActivity/Travel";
import Recreation from "./PhysicalActivity/Recreation";
import Sedentary from "./PhysicalActivity/Sedentary";

interface ShowCardProps {
    questionId: string | number;
}

const Domain: React.FC<ShowCardProps> = ({ questionId }) => {
    const [isModel, setIsModel] = useState(false);
    const [isExample, setIsExample] = useState(false);

    const verifyShowCard = (questionId: any) => {
        switch (questionId) {
            case 1:
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
            case 7:
                return <Travel />;
            case 10:
                return <Recreation />;
            case 16:
                return <Sedentary />;
            default:
                return null; // Return null if no match, or you can render something else
        }
    };


    const getHeading = () => {
        switch (questionId) {
            case 1:
                return <>Work</>
            case 7:
                return <>Travel</>
            case 10:
                return <>Recreational Activities</>
            case 16:
                return <>Sedentary Behavior</>
            default:
                return null; // Return null if no match, or you can render something else
        }
    }

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
                    <div className="doctor-modal-header">{getHeading()} Instructions</div>
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

            {verifyShowCard(questionId) ? (
                <div
                    style={{
                        display: "flex",
                        flex: "flex-row",
                        width: "100%",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background: "#d5d5d5",
                        padding: "10px",
                        marginBottom: "20px",
                        borderRadius: "5px"
                    }}
                >
                    <div
                        style={{
                            // marginBottom: "10px",
                            fontWeight: "700",
                            color: "Black",
                            fontSize: "20px",
                            cursor: "pointer",
                        }}
                    >
                        {getHeading()}
                    </div>
                    <div
                        style={{
                            // marginBottom: "10px",
                            textDecoration: "underline",
                            color: "blue",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            setIsModel(true);
                        }}
                    >
                        Instructions
                    </div>

                </div>
            ) : null}
        </div>
    );
};

export default Domain;
