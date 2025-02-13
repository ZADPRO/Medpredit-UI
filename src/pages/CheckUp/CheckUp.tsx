import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react'
import decrypt from '../../helper';
import axios from 'axios';
import { useEffect, useState } from 'react';
import physical from "../../assets/images/physical.png";
import stress from "../../assets/images/stress.png";
import tobacco from "../../assets/images/tobacco.png";
import alcohol from "../../assets/images/alcohol.png";
import dietry from "../../assets/images/DIATERY-01.png";
import bmi from "../../assets/images/bmi.png";
import sleep from "../../assets/images/sleep.png";
import familyhistory from "../../assets/images/familyhistory.png";
import SubCards from '../SubCategories/SubCards';
import { useHistory } from 'react-router';

const CheckUp = () => {

    const [category, setCategory] = useState([]);

    const hsitory = useHistory();


    useEffect(() => {
        const tokenString = localStorage.getItem("userDetails");

        if (tokenString) {
            try {
                const tokenObject = JSON.parse(tokenString);
                const token = tokenObject.token;

                axios
                    .post(
                        `${import.meta.env.VITE_API_URL}/getCategory `,
                        {
                            SubCategoryId: 4,
                            patientId: localStorage.getItem("currentPatientId"),
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

                        setCategory(data.data)

                        console.log("----------->Val", data.data);
                    });
            } catch (error) {
                console.error("Error parsing token:", error);
            }
        } else {
            console.error("No token found in localStorage.");
        }

    }, [hsitory.location.pathname]);



    const getImage = (refQCategoryId: number) => {
        switch (refQCategoryId) {
            case 8:
                return physical;
            case 9:
                return stress;
            case 10:
                return tobacco;
            case 11:
                return alcohol;
            case 12:
                return dietry;
            case 13:
                return bmi;
            case 43:
                return sleep;
            case 51:
                return familyhistory;
        }
    }


    return (
        <IonPage>
            <IonHeader mode="ios">
                <IonToolbar className="pt-1 pb-1" mode="ios">
                    {/* <IonButtons slot="start">
                        <IonBackButton mode="md" defaultHref="/settings"></IonBackButton>
                    </IonButtons> */}
                    <IonTitle>Risk Factor</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <SubCards
                    data={category}
                    categoryId={"4"}
                    categroyName={"Risk Factor"}
                />
                {/* <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "5px" }}>
                    {
                        category.map((element: any, index) => (
                            <div key={element} style={{ width: "40%", display: "flex", justifyContent: "center", flexDirection: "column", background: "#bfe5f8", alignItems: "center", gap: "10px", padding: "10px 0px", borderRadius: "15px" }}>
                                <img style={{ width: "80px" }} src={getImage(element.refQCategoryId)} alt={`img${element.refQCategoryId}`} />
                                <div> {
                                    element.refCategoryLabel
                                }</div>
                            </div>
                        ))
                    }
                </div> */}
            </IonContent>

        </IonPage>
    )
}

export default CheckUp