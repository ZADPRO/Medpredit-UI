import { IonIcon, IonModal, IonRippleEffect } from "@ionic/react";
import { useState } from "react";
import Work from "./PhysicalActivity/Work";
import Travel from "./PhysicalActivity/Travel";
import Recreation from "./PhysicalActivity/Recreation";
import Sedentary from "./PhysicalActivity/Sedentary";
import { informationCircle } from "ionicons/icons";
import BloodPressure from "./Vital/BloodPressure";

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
            case 122:
                return true;
            case 126:
                return true;
            case 135:
                return true;
            case 141:
                return true;
            case 143:
                return true;
            case 144:
                return true;
            case 146:
                return true;
            case 156:
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
            case 156:
                return <BloodPressure />;
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
            case 122:
                return <>Snack-Refresher-Starters</>
            case 126:
                return <>Meal Composition</>
            case 135:
                return <>Oil Intake</>
            case 141:
                return <>Salt Intake</>
            case 143:
                return <>Dairy Products</>
            case 144:
                return <>Meal Timing</>
            case 146:
                return <>Meal Practices</>
            case 156:
                return <>Blood Pressure</>
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
                <div className="doctor-modal-content" style={{ background: "linear-gradient(227deg, rgba(255,255,255,1) 39%, rgba(255,255,255,1) 61%, rgba(217,240,255,1)100%)" }}>
                    {/* Header */}
                    <div className="doctor-modal-header">{getHeading()} Instructions</div>
                    {/* <p>{verifyShowCard(questionId) ? "yes" : "no"}</p> */}
                    <div>{getShowCard()}</div>{" "}
                    {/* Render JSX element returned by getShowCard */}
                    {/* Close Button */}
                    <button
                        style={{ background: "linear-gradient(-167deg, rgb(15, 149, 232) 0%, rgb(3, 117, 198) 100%)", color: "#fff" }}
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
                        height: "2.5rem",
                        display: "flex",
                        flex: "flex-row",
                        width: "100%",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background: "linear-gradient(-167deg,rgb(15, 149, 232) 0%,rgb(3, 117, 198) 100%)",
                        padding: "0px 10px",
                        marginBottom: "20px",
                        marginTop: "20px",
                        borderRadius: "5px"
                    }}
                >
                    <div
                        style={{
                            fontSize: "1rem",
                            fontWeight: "700",
                            cursor: "pointer",
                            color: "#fff"
                        }}
                    >
                        {getHeading()}
                    </div>
                    {
                        getShowCard() ? (
                            <div
                                style={{
                                    fontSize: "1.5rem",
                                    fontWeight: "600",
                                    cursor: "pointer",
                                    color: "#fff",
                                    marginTop: "10px"
                                }}
                                onClick={() => {
                                    setIsModel(true);
                                }}
                            >
                                <IonIcon
                                    icon={informationCircle}
                                ></IonIcon>
                            </div>
                        ) : null
                    }

                </div>
            ) : null}
        </div>
    );
};

export default Domain;
