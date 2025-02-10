import React from 'react';
import img2 from "../../../assets/info/physicalAct2.png"

interface ModerateProps {
  content: String;
}
const Moderate: React.FC<ModerateProps> = ({ content }) => {
  return (
    <div>
      {
        content === "showcards" ? (
          <div className="ion-padding-start ion-padding-end" slot="content" style={{ maxHeight: "75vh", overflowY: "auto", paddingBottom: "1rem" }}>
            <p style={{ textAlign: "justify" }}>
              Make you breathe somewhat harder than normal{" "}
            </p>
            <img src={img2} />
          </div>
        ) : (
          <div>  <p style={{ textAlign: "justify" }}>
            Other examples for <b>Moderate</b> activities at <b>Work</b>{" "}
          </p>
            <ul>
              <li>
                Cleaning (vacuuming, mopping, polishing, scrubbing, sweeping,
                ironing){" "}
              </li>
              <li>
                Washing (beating and brushing carpets, wringing clothes (by
                hand)){" "}
              </li>
              <li>Gardening</li>
              <li>Milking cows (by hand) </li>
              <li>Planting and harvesting crops </li>
              <li>Digging dry soil (with spade) </li>
              <li>Instructing spinning (fitness) </li>
              <li>Instructing sports aerobics </li>
              <li>Sorting postal parcels (fast pace)</li>
              <li>Cycle rickshaw driving </li>
            </ul>
          </div>
        )
      }


    </div>


  );
};

export default Moderate;