import { IonItem } from '@ionic/react';
import React from 'react';
import wholegrains from "../../../assets/DietaryShowcard/WholeGrains.png"
interface SmokeaffectsProps {
    view: String;
}
const WholeGranins: React.FC<SmokeaffectsProps> = ({ view }) => {
    return (
        <div>
            {
                view === "showcards" ? (
                    <>
                        <img src={wholegrains} style={{ height: "50vh" }} alt="wholegrains" />
                    </>
                ) : (
                    <></>
                )
            }


        </div>
    );
};

export default WholeGranins;