import { IonItem } from '@ionic/react';
import React from 'react';
import tubersImg from "../../../assets/DietaryShowcard/tubers.png"
interface SmokeaffectsProps {
    view: String;
}
const Tubers: React.FC<SmokeaffectsProps> = ({ view }) => {
    return (
        <div>
            {
                view === "showcards" ? (
                    <>
                        <img src={tubersImg} style={{ height: "50vh" }} alt="tubersImg" />
                    </>
                ) : (
                    <></>
                )
            }
        </div>
    );
};

export default Tubers;