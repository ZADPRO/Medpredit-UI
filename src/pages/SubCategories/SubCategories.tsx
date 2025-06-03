import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import SubCards from "./SubCards";
import axios from "axios";
import decrypt from "../../helper";
import { chevronBack } from "ionicons/icons";
import "./SubCategories.css";

const SubCategories: React.FC = () => {
  const { categoryId, categroyName } = useParams<{
    categoryId: string;
    categroyName: string;
  }>();

  const [loadingStatus, setLoadingStatus] = useState(true);

  useEffect(() => {
    const getCategory = {
      id: categoryId,
      label: categroyName,
    };

    localStorage.setItem("getCategory", JSON.stringify(getCategory));
  }, []);

  const [categories, setCategories] = useState<
    { refQCategoryId: number; refCategoryLabel: string }[]
  >([]);

  const history = useHistory();

  useEffect(() => {
    const tokenString = localStorage.getItem("userDetails");
    const patientId = localStorage.getItem("currentPatientId");

    if (tokenString) {
      if (history.location.pathname.split("/")[1] === "subCategories") {
        setLoadingStatus(true);
      }
      try {
        const tokenObject = JSON.parse(tokenString);
        const token = tokenObject.token;

        axios
          .post(
            `${import.meta.env.VITE_API_URL}/getCategory `,
            {
              SubCategoryId: categoryId,
              patientId: patientId,
              employeeId:
                tokenObject.roleType === 1
                  ? null
                  : localStorage.getItem("currentDoctorId"),
              hospitalId: localStorage.getItem("hospitalId"),
              refLanCode: localStorage.getItem("refLanCode")
            },
            {
              headers: {
                Authorization: token,
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            const data = decrypt(
              response.data[1],
              response.data[0],
              import.meta.env.VITE_ENCRYPTION_KEY
            );

            setCategories(data.data);

            setLoadingStatus(false);
            console.log("----------->Val", data.data);
          });
      } catch (error) {
        console.error("Error parsing token:", error);
      }
    } else {
      console.error("No token found in localStorage.");
    }

    console.log(history.location.pathname);
  }, [history.location.pathname]);

  const [backwardQ, setBackwardQ] = useState({
    id: 0,
    label: "",
  });

  useEffect(() => {
    const categoryString: any = localStorage.getItem("getSubCategory");
    const categoryObject = JSON.parse(categoryString);

    setBackwardQ({
      id: categoryObject.id,
      label: categoryObject.label,
    });
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              background: "#fff",
              alignItems: "center",
              width: "100%",
              fontSize: "1.2rem",
              fontWeight: "600",
              padding: "1rem",
            }}
          >
            <span> <IonIcon
              size="large"
              onClick={() => history.goBack()}
              icon={chevronBack}
            ></IonIcon></span>
            <span>{categroyName}</span>
            <span></span>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="subCategories medpredit-page-background">
          {/* <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "90%",
              margin: "0 auto",
              fontWeight: "bold",
            }}
          >
            <IonIcon
              size="large"
              style={{ position: "absolute", left: 0 }}
              onClick={() => history.goBack()}
              icon={chevronBack}
            ></IonIcon>
            <span>{categroyName}</span>
            <span style={{ position: "absolute", right: 0 }}></span>
          </div> */}

          {loadingStatus ? (
            <>
              <div
                style={{
                  width: "100%",
                  height: "90vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <i
                  className="pi pi-spin pi-spinner"
                  style={{ fontSize: "2rem", color: "#1a70b0" }}
                ></i>
              </div>
            </>
          ) : (
            <>
              <SubCards
                data={categories}
                categoryId={categoryId}
                categroyName={categroyName}
              />
            </>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SubCategories;
