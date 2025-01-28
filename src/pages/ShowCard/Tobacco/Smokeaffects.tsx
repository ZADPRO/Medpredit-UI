import { IonItem } from '@ionic/react';
import React from 'react';
import img11 from "../../../assets/tobaccoShowCards/img11.png";
import img12 from "../../../assets/tobaccoShowCards/img12.png";
import img13 from "../../../assets/tobaccoShowCards/img13.png";
import img14 from "../../../assets/tobaccoShowCards/img14.png";
const Smokeaffects: React.FC = () => {
    return (
        <div>
                <div className="" slot="content" style={{ maxHeight: "75vh", overflowY: "auto", paddingBottom: "1rem" }}>
              <IonItem>
                <div className="flex flex-column pt-0">
                  <p>Snuff, available in wet and dry form</p>
                  <img src={img11} alt="" />
                  <img src={img12} alt="" />
                </div>
              </IonItem>

              <IonItem>
                <div className="flex flex-column pt-0">
                  <p> Chewing tobacco </p>
                  <img src={img13} alt="" />
                </div>
              </IonItem>
              <IonItem>
                <div className="flex flex-column pt-0">
                  <p>Betel nut, quid</p>
                  <img src={img14} alt="" />
                </div>
              </IonItem>
            </div>

        </div>
    );
};

export default Smokeaffects;