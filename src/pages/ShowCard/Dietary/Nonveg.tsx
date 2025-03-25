import { IonItem } from '@ionic/react';
import React from 'react';
import nonveg1 from "../../../assets/DietaryShowcard/nonveg1.png"
import nonveg2 from "../../../assets/DietaryShowcard/nonveg2.png"
import nonveg3 from "../../../assets/DietaryShowcard/nonveg3.png"
interface SmokeaffectsProps {
    view: String;
}
const Nonveg: React.FC<SmokeaffectsProps> = ({ view }) => {
    return (
        <div style={{ height: "70vh", overflow: "auto" }}>
            {
                view === "showcards" ? (
                    <>
                        <img src={nonveg1} style={{ height: "30vh" }} alt="nonveg1" />
                        <br />
                        <img src={nonveg2} style={{ height: "30vh" }} alt="nonveg1" />
                        <br />
                        <img src={nonveg3} style={{ height: "30vh" }} alt="nonveg1" />
                    </>
                ) : (
                    <></>
                )
            }
        </div>
    );
};

export default Nonveg;