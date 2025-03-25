import { IonItem } from '@ionic/react';
import React from 'react';
import Vegetableimg from "../../../assets/DietaryShowcard/vegetables.png"
interface SmokeaffectsProps {
    view: String;
}
const Vegetable: React.FC<SmokeaffectsProps> = ({ view }) => {
    return (
        <div>
            {
                view === "showcards" ? (
                    <>
                        <img src={Vegetableimg} style={{ height: "50vh" }} alt="Vegetable" />
                    </>
                ) : (
                    <></>
                )
            }


        </div>
    );
};

export default Vegetable;