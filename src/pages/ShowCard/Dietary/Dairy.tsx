import { IonItem } from '@ionic/react';
import React from 'react';
import dairy1 from "../../../assets/DietaryShowcard/dairy1.png"
import dairy2 from "../../../assets/DietaryShowcard/dairy2.png"
interface SmokeaffectsProps {
    view: String;
}
const Dairy: React.FC<SmokeaffectsProps> = ({ view }) => {
    return (
        <div style={{ height: "70vh", overflow: "auto" }}>
            {
                view === "showcards" ? (
                    <>
                        <img src={dairy1} style={{ width: "100%" }} alt="dairy1" />
                        <br />
                        <img src={dairy2} style={{ width: "100%" }} alt="dairy2" />
                    </>
                ) : (
                    <></>
                )
            }
        </div>
    );
};

export default Dairy;