import React from "react";
import { IonIcon, IonRippleEffect } from "@ionic/react";
import { useHistory } from "react-router";
import { FaChevronRight } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";

interface ListItemProps {
  icon: any;
  label: string;
  location: string;
}

const ListItem: React.FC<ListItemProps> = ({ icon, label, location }) => {
  const history = useHistory();
  return (
    <div
      style={{
        paddingLeft: "3vh",
        paddingRight: "3vh",
        paddingTop: "10px",
        paddingBottom: "10px",
        display: "flex",
        justifyContent: "space-between",
      }}
      className="ion-activatable ripple-parent rectangle"
      onClick={() => {
        history.push(`${location}`);
      }}
    >
      <IonRippleEffect></IonRippleEffect>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: "40px",
            height: "40px",
            background: "green",
            fontSize: "1.4rem",
            color: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
          }}
        >
          {icon}
        </div>
        <div
          style={{
            paddingLeft: "10px",
            fontSize: "16px",
            fontWeight: "600",
            color: "#505050",
          }}
        >
          {label}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "1rem",
          color: "#bdbdbd",
        }}
      >
        <FaChevronRight />
      </div>
    </div>
  );
};

export default ListItem;
