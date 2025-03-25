import { IonItem } from '@ionic/react';
import React from 'react';
import refinedcarbs from "../../../assets/DietaryShowcard/refinedcarbs.png"
interface SmokeaffectsProps {
    view: String;
}
const Refinedcarbs: React.FC<SmokeaffectsProps> = ({ view }) => {
    return (
        <div>
            {
                view === "showcards" ? (
                    <>
                        <img src={refinedcarbs} style={{ height: "50vh" }} alt="refinedcarbs" />
                    </>
                ) : (
                    <></>
                )
            }
        </div>
    );
};

export default Refinedcarbs;