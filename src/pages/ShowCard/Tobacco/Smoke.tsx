import { IonItem } from '@ionic/react';
import React from 'react';
import img1 from "../../../assets/tobaccoShowCards/img1.png";
import img2 from "../../../assets/tobaccoShowCards/img2.png";
import img3 from "../../../assets/tobaccoShowCards/img3.png";
import img4 from "../../../assets/tobaccoShowCards/img4.png";
import img5 from "../../../assets/tobaccoShowCards/img5.png";
interface SmokeProps{
  view :String;
}

const Smoke: React.FC<SmokeProps> = ({view}) => {
    return (

        <div>
            {
              view ==="showcards"?(
                <div className="" slot="content"  style={{ maxHeight: "75vh", overflowY: "auto", paddingBottom: "1rem" }}>
                <IonItem>
                  <div className="flex flex-column pt-0">
                    {/* <p> Manufactured cigarettes</p> */}
                    <img src={img1} alt="" />
                  </div>
                </IonItem>
                <IonItem>
                <div className="flex flex-column pt-0">
                  {/* <p> Hand-rolled cigarettes </p> */}
                  <img src={img2} alt="" />
                </div>
              </IonItem>
              <IonItem>
                <div className="flex flex-column pt-0">
                  {/* <p> Pipe</p> */}
                  <img src={img3} alt="" />
                </div>
              </IonItem>
              <IonItem>
                <div className="flex flex-column pt-0">
                  {/* <p>
                    Cigars, e.g., cigarillos, double coronas, cheroots, stumpen,
                    chutts and dhumtis{" "}
                  </p> */}
                  <img src={img4} alt="" />
                </div>
              </IonItem>
              <IonItem>
                <div className="flex flex-column pt-0">
                  {/* <p> Shisha</p> */}
                  <img src={img5} alt="" />
                </div>
              </IonItem>
            </div>
              ):(
                <div>
                <div>  <p style={{ textAlign: "justify" }}>
       
        <ul>
          <li>
          Manufactured cigarettes
          </li>
          <li>Hand-rolled cigarettes 

          </li>
          <li> Cigars, e.g., cigarillos, double coronas, cheroots, stumpen,
          chutts and dhumtis</li>
          <li>Shisha</li>
          </ul>
          </p>
            </div>
          </div>
          )
       
            }
              </div>       
    );
};

export default Smoke;
