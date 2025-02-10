import React from 'react';
import img3 from "../../../assets/info/physicalAct3.png";
import { Divider } from 'primereact/divider';

interface VigoroustimeProps{
  view : String;
}
const Vigoroustime: React.FC <VigoroustimeProps>= ({view}) => {
    return (
        <div>
          {
            view ==="showcards"?(
              <div className="ion-padding-start ion-padding-end" slot="content"  style={{ maxHeight: "75vh", overflowY: "auto", paddingBottom: "1rem" }}>
              <p style={{ textAlign: "justify" }}>
                Make you breathe much harder than normal{" "}
              </p>
              <img src={img3} />
              </div>
            ):(<div>
                      <p style={{ textAlign: "justify" }}>
                Other examples for <b>Vigorous</b> activities during{" "}
                <b>Leisure Time</b>{" "}
              </p>
              <ul>
                <li>Soccer</li>
                <li>Rugby</li>
                <li>Tennis</li>
                <li>High-impact aerobics </li>
                <li>Aqua aerobics </li>
                <li>Ballet dancing </li>
                <li>Fast swimming</li>
              </ul>
            </div>)
          }
      
      

        </div>
    );
};

export default Vigoroustime;