import { IonItem } from '@ionic/react';
import React from 'react';
import salt1 from "../../../assets/DietaryShowcard/salt1.png"
import salt2 from "../../../assets/DietaryShowcard/salt2.png"
interface SmokeaffectsProps {
    view: String;
}
const Salt: React.FC<SmokeaffectsProps> = ({ view }) => {
    return (
        <div style={{ height: "70vh", overflow: "auto" }}>
            {
                view === "showcards" ? (
                    <>
                        <img src={salt1} style={{ height: "50vh" }} alt="salt1" />
                        <br />
                        <img src={salt2} style={{ height: "50vh" }} alt="salt2" />
                    </>
                ) : (
                    <></>
                )
            }
        </div>
    );
};

export default Salt;