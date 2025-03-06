import React from 'react';
import img from "../../../assets/BMIshowCards/Height Measurement.jpg";

interface ModerateProps {
  content: String;
}
const BMI_Height: React.FC<ModerateProps> = ({ content }) => {
  return (
    <div>
      {
        content === "showcards" && (
          <div className="ion-padding-start ion-padding-end" slot="content" style={{ maxHeight: "75vh", overflowY: "auto", paddingBottom: "1rem" }}>
            <p style={{ textAlign: "justify" }}>
                Height Measurement{" "}
            </p>
            <img src={img} />
          </div>
        ) 
        // : (
        //   <div>  <p style={{ textAlign: "justify" }}>
        //     Other examples for <b>Moderate</b> activities at <b>Work</b>{" "}
        //   </p>
        //     <ul>
        //       <li>
        //         Cleaning (vacuuming, mopping, polishing, scrubbing, sweeping,
        //         ironing){" "}
        //       </li>
        //       <li>
        //         Washing (beating and brushing carpets, wringing clothes (by
        //         hand)){" "}
        //       </li>
        //       <li>Gardening</li>
        //       <li>Milking cows (by hand) </li>
        //       <li>Planting and harvesting crops </li>
        //       <li>Digging dry soil (with spade) </li>
        //       <li>Instructing spinning (fitness) </li>
        //       <li>Instructing sports aerobics </li>
        //       <li>Sorting postal parcels (fast pace)</li>
        //       <li>Cycle rickshaw driving </li>
        //     </ul>
        //   </div>
        // )
      }


    </div>


  );
};

export default BMI_Height;