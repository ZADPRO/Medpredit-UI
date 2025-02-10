import React from 'react';
import img4 from "../../../assets/info/physicalAct4.png"

interface ModeratetimeProps{
  content:String;
}
const Moderatetime: React.FC <ModeratetimeProps>= ({content}) => {

    return (
        <div>
          {
            content === "showcards"?(
              <div className="ion-padding-start ion-padding-end" slot="content"  style={{ maxHeight: "75vh", overflowY: "auto", paddingBottom: "1rem" }}>
              <p style={{ textAlign: "justify" }}>
                Make you breathe much harder than normal{" "}
              </p>
              <img src={img4} />
              </div>
            ):(
              <div> <p style={{ textAlign: "justify" }}>
              Other examples for <b>Moderate</b> activities at <b>Work</b>{" "}
            </p>
            <ul>
              <li>Cycling</li>
              <li>Jogging</li>
              <li>Dancing</li>
              <li>Horse-riding </li>
              <li>Tai chi </li>
              <li>Yoga </li>
              <li>Pilates</li>
              <li>Low-impact aerobics</li>
              <li>Cricket</li>
            </ul></div>
            )
          }
             
             
           

        </div>
    );
};

export default Moderatetime;