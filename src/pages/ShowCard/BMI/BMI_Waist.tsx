import React from "react";
import img from "../../../assets/BMIshowCards/BMI_Hip and Waist.jpg";

interface ModerateProps {
  content: String;
}
const BMI_Waist: React.FC<ModerateProps> = ({ content }) => {
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

            <p style={{ fontWeight: "bold" }}>Waist circumference </p>
            <ul>
              <li>
                Should be measured at the midpoint between the lower margin of
                the least palpable rib and the top of the iliac crest, using a
                stretch-resistant tape that provides a constant 100 g tension.{" "}
              </li>
            </ul>

            <p style={{ fontWeight: "bold" }}>
              Posture of the subjects during the measurement{" "}
            </p>
            <ul>
              <li>
                The subject stands with arms at the sides, feet positioned close
                together, and weight evenly distributed across the feet.{" "}
              </li>
            </ul>

            <p style={{ fontWeight: "bold" }}>
              Phase of respiration at the exact point of measurement{" "}
            </p>
            <ul>
              <li>
                The waist circumference should be measured at the end of a
                normal expiration.{" "}
              </li>
            </ul>

            <p style={{ fontWeight: "bold" }}>
              Abdominal tension at the point of measurement{" "}
            </p>
            <ul>
              <li>
                A relaxed posture is best for taking waist measurements. Advise
                the subject to relax and take a few deep, natural breaths before
                the actual measurement is made to minimize the inward pull of
                the abdominal contents.{" "}
              </li>
            </ul>

            <p style={{ fontWeight: "bold" }}>
              Influence of stomach contents at time of measurement
            </p>
            <ul>
              <li>
                The amount of water, food, or gas in the gastrointestinal tract
                will affect the accuracy of the waist measurement. A waist
                measurement should be taken after the subject has fasted
                overnight or is in a fasted state.{" "}
              </li>
            </ul>

            <p style={{ fontWeight: "bold" }}>Clothing </p>
            <ul>
              <li>Minimal loose clothing should be worn. </li>
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

export default BMI_Waist;
