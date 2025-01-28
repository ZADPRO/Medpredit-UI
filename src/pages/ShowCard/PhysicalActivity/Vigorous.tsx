import { IonAccordion, IonItem, IonLabel } from "@ionic/react";
import React from "react";
import img1 from "../../../assets/info/physicalAct1.png";

const Vigorous: React.FC = () => {
  return (
    <div>
      <div
        className="ion-padding-start ion-padding-end"
        slot="content"
        style={{ maxHeight: "75vh", overflowY: "auto", paddingBottom: "1rem" }}
      >
        <p style={{ textAlign: "justify" }}>
          Make you breathe much harder than normal{" "}
        </p>
        <img
          src={img1}
          style={{ width: "100%", height: "auto", marginBottom: "1rem" }}
        />
        <p style={{ textAlign: "justify" }}>
          Other examples for <b>Vigorous</b> activities at <b>Work</b>{" "}
        </p>
        <ul>
          <li>Forestry (cutting, chopping, carrying wood)</li>
          <li>Sawing hardwood </li>
          <li>Ploughing</li>
          <li>Cutting crops (sugar cane) </li>
          <li>Gardening (digging) </li>
          <li>Grinding (with pestle) </li>
          <li>Labouring (shovelling sand) </li>
          <li>Loading furniture (stoves, fridge) </li>
          <li>Instructing spinning (fitness) </li>
          <li>Instructing sports aerobics </li>
          <li>Sorting postal parcels (fast pace)</li>
          <li>Cycle rickshaw driving </li>
        </ul>
      </div>
    </div>
  );
};

export default Vigorous;
