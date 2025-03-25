import React from "react";
import img from "../../../assets/BMIshowCards/BMI_Hip and Waist.jpg";

interface ModerateProps {
  content: String;
}
const BMI_Hip: React.FC<ModerateProps> = ({ content }) => {
  return (
    <div>
      {
        content === "showcards" && (
          <div
            className="ion-padding-start ion-padding-end custom-scrollbar02"
            slot="content"
            style={{
              maxHeight: "75vh",
              overflowY: "auto",
              paddingBottom: "1rem",
            }}
          >
            <img style={{ display: "block", margin: "0 auto" }} src={img} />

            <p style={{ fontWeight: "bold" }}>Hip circumference </p>
            <ul>
              <li>
                Should be measured around the widest portion of the buttocks,
                with the tape parallel to the floor.{" "}
              </li>
            </ul>

            <p style={{ fontWeight: "bold" }}>
              Posture of the subjects during the measurement{" "}
            </p>
            <ul>
              <li>
                The subject should stand with feet together and body weight
                evenly distributed.{" "}
              </li>
            </ul>

            <p style={{ fontWeight: "bold" }}>
              Phase of respiration at the exact point of measurement{" "}
            </p>
            <ul>
              <li>Not a significant factor for hip measurement. </li>
            </ul>

            <p style={{ fontWeight: "bold" }}>
              Abdominal tension at the point of measurement{" "}
            </p>
            <ul>
              <li>
                The subject should maintain a natural and relaxed posture to
                ensure an accurate measurement.{" "}
              </li>
            </ul>

            <p style={{ fontWeight: "bold" }}>
              Influence of stomach contents at time of measurement
            </p>
            <ul>
              <li>
                Less significant compared to waist measurement, but measurements
                should ideally be taken in a fasted state for consistency.{" "}
              </li>
            </ul>

            <p style={{ fontWeight: "bold" }}>Clothing </p>
            <ul>
              <li>
                Minimal loose clothing should be worn to avoid adding extra bulk
                to the measurement.
              </li>
            </ul>

            <p>
              <b>Note:</b> Each measurement should be repeated twice if the
              measurements are within 1 cm of one another, the average should be
              calculated. If the difference between the two measurements exceeds
              1 cm, the two measurements should be repeated.
            </p>
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

export default BMI_Hip;
