import {
  IonAccordion,
  IonAccordionGroup,
  IonButton,
  IonButtons,
  IonIcon,
  IonItem,
  IonLabel,
  IonModal,
} from "@ionic/react";
import React, { useState } from "react";
import {
  chevronForwardCircle,
  chevronBack,
  chevronForward,
  closeOutline,
} from "ionicons/icons";
import {sampleDiabetesData} from "./DiseaseContents";
import "./KnowDisease.css";

const KnowDisease: React.FC<{ activeDisease: string }> = ({ activeDisease}) => {
  
  const [selectedQuestion, setSelectedQuestion] = useState<{ accordionIndex: number; questionIndex: number } | null>(null);
  
  const [InfoModal, setInfoModal] = useState<boolean>(false);

  const activeDiseaseData = sampleDiabetesData.find(disease => disease.DiseaseName === activeDisease);

    const openModal = (accordionIndex: number, questionIndex: number) => {
        setSelectedQuestion({ accordionIndex, questionIndex });
        setInfoModal(true);
    };

    const changeQuestion = (direction: 'prev' | 'next') => {
        if (selectedQuestion) {
            const { accordionIndex, questionIndex } = selectedQuestion;
            const accordion = activeDiseaseData?.DiseaseContent[accordionIndex];

            if (accordion) {
                const newIndex = direction === 'prev' ? questionIndex - 1 : questionIndex + 1;
                if (newIndex >= 0 && newIndex < accordion.AccordionInfo.length) {
                    setSelectedQuestion({ accordionIndex, questionIndex: newIndex });
                }
            }
        }
    };

    type Answer = {
      point: string | (JSX.Element | string)[]; // Can be a string or an array of JSX elements and strings
      subpoint?: (JSX.Element | string)[][]; // Nested array to support multiple JSX/text elements
      image?: {
        url: string; 
        altText: string;
      };
    };

    type Question = {
      question: string;
      answers: Answer[];
    };
    
    const currentQuestion: Question | null =
        selectedQuestion && activeDiseaseData
            ? activeDiseaseData.DiseaseContent[selectedQuestion.accordionIndex].AccordionInfo[selectedQuestion.questionIndex]
            : null;

  console.log(activeDiseaseData);

  return (
    <div className="knowDisease">
      {activeDiseaseData && (
        <IonAccordionGroup>
          {activeDiseaseData?.DiseaseContent.map((diabetesData, accordionIndex) => (
            <IonAccordion key={accordionIndex} value={`accordion-${accordionIndex}`}>
              <IonItem slot="header" color="light">
                <IonLabel>{diabetesData.AccordionTitle}</IonLabel>
              </IonItem>
              <div slot="content">
                {diabetesData.AccordionInfo.map((info, questionIndex) => (
                  <p  style={{margin: "0"}} key={questionIndex} onClick={() => openModal(accordionIndex, questionIndex)}>
                    {String(info.questionId).padStart(2, "0") +
                      ") " +
                      info.question}
                  </p>
                ))}
              </div>
            </IonAccordion>
          ))}
        </IonAccordionGroup>
      )}

      <IonModal
        id="knowDiseaseIonModal"
        mode="ios"
        isOpen={InfoModal}
        onDidDismiss={() => {
          setInfoModal(false);
        }}
      >
        <IonIcon
          id="knowDiesaseCloseIcon"
          icon={closeOutline}
          onClick={() => setInfoModal(false)}
        />
        <div style={{ padding: "1.5rem 2rem", overflow: "scroll" }}>
          <h3
            style={{
              fontSize: "1.2rem",
              color: "#0c436c",
              fontWeight: "bold",
            }}
          >
            {currentQuestion?.question}
          </h3>
          <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
            {currentQuestion?.answers.map((answer, index) => (
              <li
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flexstart",
                  paddingBottom: "1rem",
                }}
              >
                <IonIcon
                  id="knowDiseaseForwardIcon"
                  icon={chevronForwardCircle}
                ></IonIcon>
                <span
                  style={{
                    marginLeft: "10px",
                    flex: 1,
                    fontSize: "0.9rem",
                    color: "#1764b7",
                  }}
                >
                  {answer.point}
                  <span>

                  {answer.image && (
                  <img 
                    src={answer.image.url} 
                    alt={answer.image.altText} 
                    style={{ marginTop: "10px", maxWidth: "100%", borderRadius: "8px" }} 
                  />
                )}

                    {answer?.subpoint && (
                      <ol
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          paddingTop: "0.5rem",
                          color: "#1764b7",
                          fontSize: "0.85rem",
                        }}
                      >
                        {answer?.subpoint?.map((sub, subIndex) => (
                          <li key={subIndex}>{sub}</li>
                        ))}
                      </ol>
                    )}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            padding: "0.8rem",
          }}
        >
          <IonButtons>
            {selectedQuestion?.questionIndex != 0 && 
              <IonButton 
                onClick={() => changeQuestion('prev')}
              >
                <IonIcon icon={chevronBack}></IonIcon>
                {"Prev"}
              </IonButton>
              }
          </IonButtons>
          <IonButtons>
          {selectedQuestion?.questionIndex !== 
            (activeDiseaseData?.DiseaseContent?.[selectedQuestion?.accordionIndex ?? 0]?.AccordionInfo?.length ?? 0) - 1 && 
            <IonButton onClick={() => changeQuestion('next')}>
              {"Next"}
              <IonIcon icon={chevronForward}></IonIcon>
            </IonButton>
          }
          </IonButtons>
        </div>
      </IonModal>
    </div>
  );
};

export default KnowDisease;
