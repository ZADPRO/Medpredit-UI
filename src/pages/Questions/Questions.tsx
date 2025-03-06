import {
  IonAccordion,
  IonAccordionGroup,
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";

import { useHistory, useParams } from "react-router-dom";
import MultiInputBox from "./MultiInputBox";
import Checkbox from "./Checkbox";
import YesNo from "./YesNo";
import axios from "axios";
import decrypt from "../../helper";
import SingleInputBox from "./SingleInputBox";
import HrsMins from "./HrsMins";
import NumberInputBoxT6 from "./NumberInputBoxT6";
import NumberInputBoxT4 from "./NumberInputBoxT4";
import MultipleSelect from "./MultipleSelect";
import TextInputBox from "./TextInputBox";
import TimeInputBox from "./TimeInputBox";
import TimeInputBox24 from "./TimeInputBox24";
import Hrs24 from "./Hrs24";
import TreatmentDetailsQuestion from "./TreatmentDetailsQuestion";
import Label from "./Label";
import GraphValues from "./GraphValues";
import { chevronBack, constructOutline, information, informationCircle } from "ionicons/icons";
import "./Questions.css";
import PhysicalInstructions from "../Instructions/PhysicalInstructions";
import TobaccoInstructions from "../Instructions/TobaccoInstructions";
import StressInstructions from "../Instructions/StressInstructions";
import AlcoholInstructions from "../Instructions/AlcoholInstructions";
import PhysicalInfo from "../Information/PhysicalInfo";
import TobaccoInfo from "../Information/TobaccoInfo";
import StressInfo from "../Information/StressInfo";
import AlcoholInfo from "../Information/AlcoholInfo";
import SleepInfo from "../Information/SleepInfo";
import SleepInstructons from "../Instructions/SleepInstructons";
import BMIInstructions from "../Instructions/BMIInstructions";

interface DosageTime {
  dosage: number | null;
  time: Date | null;
}

interface Duration {
  months: number | null;
  years: number | null;
}

interface QuestionSet {
  nameOfMedicine: string;
  category: string | null;
  strength: number | null;
  roa: string | null;
  relationToFood: string | null;
  morningdosage: number | null;
  morningtime: Date | null;
  afternoondosage: number | null;
  afternoontime: Date | null;
  eveningdosage: number | null;
  eveningtime: Date | null;
  nightdosage: number | null;
  nighttime: Date | null;
  monthsduration: number | null;
  yearsduration: number | null;
}

const Questions: React.FC = () => {
  const history = useHistory();
  // URL PARAMS
  const { refCategoryLabel, cardTitle } = useParams<{
    refCategoryLabel: string;
    cardTitle: string;
  }>();

  const [submitButton, setSubmitButton] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [scrollIndex, setScrollIndex] = useState(0);

  const SubmitActive = (isActive: boolean) => {
    setSubmitButton(isActive);
  };

  useEffect(() => {
    const getCategory = {
      id: cardTitle,
      label: refCategoryLabel,
    };

    localStorage.setItem("getQuestions", JSON.stringify(getCategory));
  }, []);

  // INTERFACE FOR QUESTIONS
  const [questionData, setQuestionsData] = useState<
    {
      questionType: string;
      questionText: string;
      questionId: any;
      options: [
        {
          backwardQId: string;
          forwardQId: string;
          refOptionId: number;
          refOptionLabel: string;
        }
      ];
    }[]
  >([]);

  const [visibleQuestions, setVisibleQuestions] = useState<
    {
      questionType: string;
      questionText: string;
      questionId: any;
      options: [
        {
          backwardQId: string;
          forwardQId: string;
          refOptionId: number;
          refOptionLabel: string;
        }
      ];
    }[]
  >([]);

  const [enabledIndex, setEnabledIndex] = useState<number>(0);

  const [submittedAnswer, setSubmittedAnswer] = useState<any>();

  const [responses, setResponses] = useState<
    { questionId: any; questionType: any; answer: any }[]
  >([]);

  const tokenString: any = localStorage.getItem("userDetails");
  const patientId: any = localStorage.getItem("currentPatientId");
  const tokenObject = JSON.parse(tokenString);
  const token = tokenObject.token;

  const getQuestions = () => {
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/getQuestions`,
        {
          questionId: cardTitle,
          patientId: patientId,
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
        if (data.status) {
          console.log(data.questions);

          setQuestionsData(data.questions);
          console.log("data.questions", data.questions);
          setVisibleQuestions([data.questions[0]]);
        }
      });
  };

  const getNextQuestions = (
    questionId: any,
    questionType: any,
    answer: any,
    forwardQId: any
  ) => {
    setSubmitButton(true);
    console.log("forwardQId:", forwardQId);
    console.log("Answer submitted for questionId:", questionId, answer);
    console.log("################--->", questionId);
    localStorage.setItem("testQuestion", questionId);

    // Convert forwardQId to a number, if not null
    let nextQuestionId = forwardQId ? parseInt(forwardQId, 10) : null;

    // Update the responses state
    setResponses((prevResponses) => {
      const responseMap = new Map(
        prevResponses.map((res) => [
          res.questionId,
          { questionType: res.questionType, answer: res.answer },
        ])
      );

      responseMap.set(questionId, { questionType, answer });

      const updatedResponses = Array.from(responseMap.entries()).map(
        ([id, value]) => ({
          questionId: id,
          questionType: value.questionType,
          answer: value.answer,
        })
      );

      // Submit the final updated responses if no next question exists
      if (!nextQuestionId) {
        setSubmitButton(false);
        setSubmittedAnswer(updatedResponses); // Use the updated responses here
        console.log("Submitting responses:", updatedResponses);
      }

      return updatedResponses;
    });

    if (questionId === 33) {
      const prevQuestion = responses[1].answer;
      const currentQuestion = answer;
      console.log(prevQuestion, currentQuestion, forwardQId);

      if (currentQuestion === 118) {
        if (prevQuestion === 113) {
          const nextQuestion = questionData.find(
            (q) => parseInt(q.questionId, 10) === 39
          );

          if (nextQuestion) {
            setVisibleQuestions((prevVisibleQuestions) => [
              ...prevVisibleQuestions,
              nextQuestion,
            ]);
            setEnabledIndex((prevIndex) => prevIndex + 1);
          }
        } else {
          const nextQuestion = questionData.find(
            (q) => parseInt(q.questionId, 10) === 34
          );

          if (nextQuestion) {
            setVisibleQuestions((prevVisibleQuestions) => [
              ...prevVisibleQuestions,
              nextQuestion,
            ]);
            setEnabledIndex((prevIndex) => prevIndex + 1);
          }
        }
      } else {
        const nextQuestion = questionData.find(
          (q) => parseInt(q.questionId, 10) === nextQuestionId
        );

        if (nextQuestion) {
          setVisibleQuestions((prevVisibleQuestions) => [
            ...prevVisibleQuestions,
            nextQuestion,
          ]);
          setEnabledIndex((prevIndex) => prevIndex + 1);
        }
      }
    } else {
      const nextQuestion = questionData.find(
        (q) => parseInt(q.questionId, 10) === nextQuestionId
      );

      if (nextQuestion) {
        setVisibleQuestions((prevVisibleQuestions) => [
          ...prevVisibleQuestions,
          nextQuestion,
        ]);
        setEnabledIndex((prevIndex) => prevIndex + 1);
      }
    };
  };

  const [loadingStatus, setLoadingStatus] = useState(false);
  const submitResponse = () => {
    console.log(submittedAnswer);
    setLoadingStatus(true);
    try {
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/postAnswers`,
          {
            patientId: patientId,
            categoryId: cardTitle,
            answers: cardTitle === "201" ? questionSets : submittedAnswer,
            employeeId: localStorage.getItem("currentDoctorId")
              ? localStorage.getItem("currentDoctorId")
              : null,
            hospitalId: localStorage.getItem("hospitalId")
              ? localStorage.getItem("hospitalId")
              : null,
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

          console.log("--->====>", data);

          if (data.status) {
            const getCategory = localStorage.getItem("getCategory");
            if (getCategory) {
              const getQuestionsToken = JSON.parse(getCategory);
              getQuestions();
              setResponses([]);
              // history.push(
              //   `/subCategories/${getQuestionsToken.id}/${getQuestionsToken.label}`
              // );
              setLoadingStatus(false);
              history.goBack();
              setSubmittedAnswer([]);
            } else {
              console.error("getCategory is null or undefined");

              setLoadingStatus(false);
              history.goBack();
              setSubmittedAnswer([]);
            }
          }
        });
    } catch (error) {
      setLoadingStatus(false);
      console.error("Error submitting responses:", error);
    }
  };

  const [questionSets, setQuestionSets] = useState<QuestionSet[]>([]);

  const handleData = (data: any) => {
    setQuestionSets(data);
  };

  const handleQuestionEdit = (
    questionId: any,
    questionType: any,
    refOptionId: number,
    forwardQnId: any
  ) => {
    if (responses) {
      responses.map((res) => {
        if (res.questionId === questionId) {
          console.log("Response found - editing");
          const index = visibleQuestions.findIndex(
            (visibleQns) => visibleQns.questionId === questionId
          );
          if (index !== -1) {
            const newVisibleQuestions = visibleQuestions.slice(0, index + 1);
            console.log("Visible qns", visibleQuestions);
            console.log("Response data", responses);
            console.log("Edited");
            setVisibleQuestions(newVisibleQuestions);
          }
        }
      });
    }
    getNextQuestions(questionId, questionType, refOptionId, forwardQnId);
  };
  console.log("Visible qns", visibleQuestions);

  const handleMultipleSelectEdit = (
    questionId: any,
    questionType: any,
    selectedOptions: any[],
    forwardQnId: any
  ) => {
    if (responses) {
      responses.map((res) => {
        if (res.questionId === questionId) {
          console.log("Response found - editing");
          const index = visibleQuestions.findIndex(
            (visibleQns) => visibleQns.questionId === questionId
          );
          if (index !== -1) {
            const newVisibleQuestions = visibleQuestions.slice(0, index + 1);
            console.log("Visible qns", visibleQuestions);
            console.log("Response data", responses);
            console.log("Edited");
            setVisibleQuestions(newVisibleQuestions);
          }
        }
      });
    }
    getNextQuestions(questionId, questionType, selectedOptions, forwardQnId);
  };

  const handleHrsEdit = (
    questionId: any,
    questionType: any,
    hrsValue: any,
    minsValue: any,
    forwardQnId: any
  ) => {
    console.log("questionType", questionType);
    if (responses) {
      responses.map((res) => {
        if (res.questionId === questionId) {
          console.log("Response found - editing");
          const index = visibleQuestions.findIndex(
            (visibleQns) => visibleQns.questionId === questionId
          );
          if (index !== -1) {
            const newVisibleQuestions = visibleQuestions.slice(0, index + 1);
            console.log("Visible qns", visibleQuestions);
            console.log("Response data", responses);
            console.log("Edited");
            setVisibleQuestions(newVisibleQuestions);
          }
        }
      });
    }

    const resultValue = hrsValue == null && minsValue == null ? null : `${hrsValue}:${minsValue}`;

    getNextQuestions(questionId, questionType, resultValue, forwardQnId);
  };

  useEffect(() => {
    if (token) {
      try {
        getQuestions();
      } catch (error) {
        console.log("Error fetching questions");
      }
    }
  }, [token]);

  const [backwardQ, setBackwardQ] = useState({
    id: 0,
    label: "",
  });

  useEffect(() => {
    const categoryString: any = localStorage.getItem("getCategory");
    const categoryObject = JSON.parse(categoryString);

    if (categoryString) {
      setBackwardQ({
        id: categoryObject.id,

        label: categoryObject.label,
      });
    }
  }, []);

  const handleInfoClick = () => {
    if (cardTitle === "8") {
      history.push("/physicalActivity/showCards");
    }
    if (cardTitle === "10") {
      history.push("/tobacoo/showCards");
    }
    if (cardTitle === "9") {
      history.push("/stress/showCards");
    }
    if (cardTitle === "11") {
      history.push("/alcohol/showCards");
    }
  };

  const handleInstructionsClick = () => {
    if (cardTitle === "8") {
      history.push("/physicalActivity/instructions");
    }
    if (cardTitle === "10") {
      history.push("/tobacoo/instructions");
    }
    if (cardTitle === "9") {
      history.push("/stress/instructions");
    }
    if (cardTitle === "11") {
      history.push("/alcohol/instructions");
    }
  };

  console.log("eee", responses); 

  useEffect(() => {
    responses.map((item, index) => {
      if(item.answer == null || item.answer == "") {
        SubmitActive(true);
      }
  })
  }, [responses]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // Refs for each question
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Auto-scroll when the enabledIndex changes
  useEffect(() => {
    if (questionRefs.current[scrollIndex]) {
      questionRefs.current[scrollIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [scrollIndex]);

  useEffect(() => {
    if (visibleQuestions.length > 0) {
      handleNextQuestion();
    }
  }, [visibleQuestions]); // Runs whenever visibleQuestions updates
  
  const handleNextQuestion = () => {
    if (visibleQuestions.length > 1) {
      const previousQuestion = visibleQuestions[visibleQuestions.length - 2];

      if (previousQuestion.questionType === "2") {
        return;
      }
    }
  
    if (visibleQuestions.length > 0) {
      setScrollIndex(visibleQuestions.length - 1);
    }
  };
  
  
  

  console.log("indexes", scrollIndex, visibleQuestions.length)

  return (
    <IonPage>
      {/* <IonHeader mode="ios">
        <IonToolbar className="" mode="ios">
          <IonButtons slot="start">
            <IonBackButton
              mode="md"
              defaultHref={`/subCategories/${backwardQ.id}/${backwardQ.label}`}
            ></IonBackButton>
          </IonButtons>
          <IonTitle>{refCategoryLabel}</IonTitle>
        </IonToolbar>
      </IonHeader>
      {cardTitle !== "12" &&
        cardTitle !== "13" &&
        cardTitle !== "43" &&
        cardTitle !== "51" &&
        cardTitle !== "201" && (
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={handleInfoClick}>Info</IonButton>
              </IonButtons>
              <IonButtons slot="end">
                <IonButton onClick={handleInstructionsClick}>
                  Instructions
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
        )}
      <IonContent fullscreen>
        <div className="questionContainers">
          {visibleQuestions.map((question, index) => (
            <div key={index}>
              {question.questionType === "6" && (
                <NumberInputBoxT6
                  type="number"
                  label={question}
                  onClickOpt={(value, questionId, forwardQId) => {
                    if (index === enabledIndex) {
                      console.log("-------------------->onEdit Triggered");
                      // getNextQuestions(
                      //   questionId,
                      //   question.questionType,
                      //   parseInt(value),
                      //   forwardQId
                      // );
                    }
                  }}
                  onEdit={(questionType, value, forwardQId) => {
                    handleQuestionEdit(
                      question.questionId,
                      questionType,
                      value,
                      forwardQId
                    );
                  }}
                />
              )}

              {question.questionType === "1" && (
                <YesNo
                  label={question}
                  onOptionSelect={(refOptionId, forwardQId) => {
                    if (index === enabledIndex) {
                      // getNextQuestions(
                      //   question.questionId,
                      //   refOptionId,
                      //   forwardQId
                      // );
                    }
                  }}
                  onEdit={(questionType, refOptionId, forwardQId) => {
                    handleQuestionEdit(
                      question.questionId,
                      questionType,
                      refOptionId,
                      forwardQId
                    );
                  }}
                />
              )}
              {question.questionType === "2" && (
                <MultipleSelect
                  label={question}
                  onOptionSelect={(selectedOptions, forwardQId) => {
                    if (index === enabledIndex) {
                      // getNextQuestions(
                      //   question.questionId,
                      //   refOptionId,
                      //   forwardQId
                      // );
                    }
                  }}
                  onEdit={(selectedOptions, forwardQId) => {
                    handleMultipleSelectEdit(
                      question.questionId,
                      question.questionType,
                      selectedOptions,
                      forwardQId
                    );
                  }}
                />
              )}

              {question.questionType === "5" && (
                <HrsMins
                  type="text"
                  label={question}
                  onEdit={(questionType, hrsValue, minsValue, forwardQId) => {
                    handleHrsEdit(
                      question.questionId,
                      questionType,
                      hrsValue,
                      minsValue,
                      forwardQId
                    );
                  }}
                />
              )}

              {question.questionType === "4" && (
                <NumberInputBoxT4
                  type="number"
                  label={question}
                  onClickOpt={(value, questionId, forwardQId) => {
                    if (index === enabledIndex) {
                      console.log("-------------------->onEdit Triggered");
                      // getNextQuestions(
                      //   questionId,
                      //   question.questionType,
                      //   parseInt(value),
                      //   forwardQId
                      // );
                    }
                  }}
                  onEdit={(questionType, value, forwardQId) => {
                    handleQuestionEdit(
                      question.questionId,
                      questionType,
                      value,
                      forwardQId
                    );
                  }}
                />
              )}

              {question.questionType === "3" && (
                <TextInputBox
                  type="text"
                  label={question}
                  onClickOpt={(value, questionId, forwardQId) => {
                    if (index === enabledIndex) {
                      console.log("-------------------->onEdit Triggered");
                      // getNextQuestions(
                      //   questionId,
                      //   question.questionType,
                      //   parseInt(value),
                      //   forwardQId
                      // );
                    }
                  }}
                  onEdit={(questionType, value, forwardQId) => {
                    handleQuestionEdit(
                      question.questionId,
                      questionType,
                      value,
                      forwardQId
                    );
                  }}
                />
              )}

              {question.questionType === "7" && (
                <TimeInputBox
                  type="text"
                  label={question}
                  onEdit={(questionType, value, forwardQId) => {
                    handleQuestionEdit(
                      question.questionId,
                      questionType,
                      value,
                      forwardQId
                    );
                  }}
                />
              )}

              {question.questionType === "8" && (
                <TimeInputBox24
                  type="text"
                  label={question}
                  onEdit={(questionType, value, forwardQId) => {
                    handleQuestionEdit(
                      question.questionId,
                      questionType,
                      value,
                      forwardQId
                    );
                  }}
                />
              )}

              {question.questionType === "9" && (
                <Label
                  label={question}
                  onEdit={(questionType, value, forwardQId) => {
                    handleQuestionEdit(
                      question.questionId,
                      questionType,
                      value,
                      forwardQId
                    );
                  }}
                />
              )}

              {question.questionType === "10" && (
                <GraphValues
                  SubmitActive={SubmitActive}
                  label={question}
                  onEdit={(questionType, value, forwardQId) => {
                    handleQuestionEdit(
                      question.questionId,
                      questionType,
                      value,
                      forwardQId
                    );
                  }}
                />
              )}

              {question.questionType === "99" && (
                <TreatmentDetailsQuestion
                  SubmitActive={SubmitActive}
                  handleData={handleData}
                />
              )}
            </div>
          ))}
        </div>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          {loadingStatus ? (
            <>
              <button
                style={{
                  background: "linear-gradient(160deg, #077556, #2f9f97)",
                  fontSize: "16px",
                  color: "#fff",
                  width: "100%",
                  height: "3rem",
                  margin: "5px 0px",
                  borderRadius: "5px",
                }}
              >
                <i className="pi pi-spin pi-spinner"></i>
              </button>
            </>
          ) : (
            <button
              disabled={submitButton}
              onClick={submitResponse}
              style={{
                width: "100%",
                height: "3rem",
                margin: "5px 0px",
                borderRadius: "5px",
                background: submitButton
                  ? "linear-gradient(160deg, #d3d3d3, #e0e0e0)" // Gray for disabled
                  : "linear-gradient(160deg, #077556, #2f9f97)", // Green for enabled
                color: submitButton ? "#a0a0a0" : "#fff", // Lighter text color for disabled
                fontSize: "16px",
                cursor: submitButton ? "not-allowed" : "pointer", // Change cursor for disabled
              }}
            >
              Submit
            </button>
          )}
        </IonToolbar>
      </IonFooter> */}

      <IonContent>
        <div className="questionsParent medpredit-page-background">
          <div>
            <div className="questionsHeader">
              <IonIcon
                size="large"
                onClick={() => history.goBack()}
                icon={chevronBack}
              ></IonIcon>
              <span>{refCategoryLabel}</span>
              <IonIcon
                style={{ "font-size": "1.5rem" }}
                onClick={() => setIsOpen(true)}
                icon={informationCircle}
              ></IonIcon>
            </div>

            <div className="questionsList boxShadow02-inset custom-scrollbar">
              {visibleQuestions.map((question, index) => (
                <div key={index} ref={(el) => (questionRefs.current[index] = el)}>
                  {question.questionType === "6" && (
                    <NumberInputBoxT6
                      type="number"
                      label={question}
                      onClickOpt={(value, questionId, forwardQId) => {
                        if (index === enabledIndex) {
                          console.log("-------------------->onEdit Triggered");
                          // getNextQuestions(
                          //   questionId,
                          //   question.questionType,
                          //   parseInt(value),
                          //   forwardQId
                          // );
                        }
                      }}
                      onEdit={(questionType, value, forwardQId) => {
                        handleQuestionEdit(
                          question.questionId,
                          questionType,
                          value,
                          forwardQId
                        );
                      }}
                    />
                  )}

                  {question.questionType === "1" && (
                    <YesNo
                      label={question}
                      onOptionSelect={(refOptionId, forwardQId) => {
                        if (index === enabledIndex) {
                          // getNextQuestions(
                          //   question.questionId,
                          //   refOptionId,
                          //   forwardQId
                          // );
                        }
                      }}
                      onEdit={(questionType, refOptionId, forwardQId) => {
                        handleQuestionEdit(
                          question.questionId,
                          questionType,
                          refOptionId,
                          forwardQId
                        );
                      }}
                    />
                  )}
                  {question.questionType === "2" && (
                    <MultipleSelect
                      label={question}
                      onOptionSelect={(selectedOptions, forwardQId) => {
                        if (index === enabledIndex) {
                          // getNextQuestions(
                          //   question.questionId,
                          //   refOptionId,
                          //   forwardQId
                          // );
                        }
                      }}
                      onEdit={(selectedOptions, forwardQId) => {
                        handleMultipleSelectEdit(
                          question.questionId,
                          question.questionType,
                          selectedOptions,
                          forwardQId
                        );
                      }}
                    />
                  )}

                  {question.questionType === "5" && (
                    <HrsMins
                      type="text"
                      label={question}
                      SubmitActive={SubmitActive}
                      onEdit={(
                        questionType,
                        hrsValue,
                        minsValue,
                        forwardQId
                      ) => {
                        handleHrsEdit(
                          question.questionId,
                          questionType,
                          hrsValue,
                          minsValue,
                          forwardQId
                        );
                      }}
                    />
                  )}

                  {question.questionType === "4" && (
                    <NumberInputBoxT4
                      type="number"
                      label={question}
                      onClickOpt={(value, questionId, forwardQId) => {
                        if (index === enabledIndex) {
                          console.log("-------------------->onEdit Triggered");
                          // getNextQuestions(
                          //   questionId,
                          //   question.questionType,
                          //   parseInt(value),
                          //   forwardQId
                          // );
                        }
                      }}
                      onEdit={(questionType, value, forwardQId) => {
                        handleQuestionEdit(
                          question.questionId,
                          questionType,
                          value,
                          forwardQId
                        );
                      }}
                    />
                  )}

                  {question.questionType === "3" && (
                    <TextInputBox
                      type="text"
                      label={question}
                      onClickOpt={(value, questionId, forwardQId) => {
                        if (index === enabledIndex) {
                          console.log("-------------------->onEdit Triggered");
                          // getNextQuestions(
                          //   questionId,
                          //   question.questionType,
                          //   parseInt(value),
                          //   forwardQId
                          // );
                        }
                      }}
                      onEdit={(questionType, value, forwardQId) => {
                        handleQuestionEdit(
                          question.questionId,
                          questionType,
                          value,
                          forwardQId
                        );
                      }}
                    />
                  )}

                  {question.questionType === "7" && (
                    <TimeInputBox
                      type="text"
                      label={question}
                      onEdit={(questionType, value, forwardQId) => {
                        handleQuestionEdit(
                          question.questionId,
                          questionType,
                          value,
                          forwardQId
                        );
                      }}
                    />
                  )}

                  {question.questionType === "8" && (
                    <TimeInputBox24
                      type="text"
                      label={question}
                      onEdit={(questionType, value, forwardQId) => {
                        handleQuestionEdit(
                          question.questionId,
                          questionType,
                          value,
                          forwardQId
                        );
                      }}
                    />
                  )}

                  {question.questionType === "9" && (
                    <Label
                      label={question}
                      onEdit={(questionType, value, forwardQId) => {
                        handleQuestionEdit(
                          question.questionId,
                          questionType,
                          value,
                          forwardQId
                        );
                      }}
                    />
                  )}

                  {question.questionType === "10" && (
                    <GraphValues
                      SubmitActive={SubmitActive}
                      label={question}
                      onEdit={(questionType, value, forwardQId) => {
                        handleQuestionEdit(
                          question.questionId,
                          questionType,
                          value,
                          forwardQId
                        );
                      }}
                    />
                  )}

                  {question.questionType === "11" && (
                    <Hrs24
                      type="text"
                      label={question}
                      onEdit={(
                        questionType,
                        hrsValue,
                        minsValue,
                        forwardQId
                      ) => {
                        handleHrsEdit(
                          question.questionId,
                          questionType,
                          hrsValue,
                          minsValue,
                          forwardQId
                        );
                      }}
                    />
                  )}

                  {question.questionType === "99" && (
                    <TreatmentDetailsQuestion
                      SubmitActive={SubmitActive}
                      handleData={handleData}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          {loadingStatus ? (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%", // Ensures vertical centering if the parent has a defined height
                  background: "#effafe",
                  borderRadius: "5% 5% 0 0",
                }}
              >
                <button
                  disabled={submitButton}
                  onClick={submitResponse}
                  className={`questionSubmitButton ${
                    submitButton ? "disabled" : ""
                  }`}
                >
                  <i className="pi pi-spin pi-spinner"></i>
                </button>
              </div>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%", // Ensures vertical centering if the parent has a defined height
                background: "#effafe",
                borderRadius: "5% 5% 0 0",
              }}
            >
              <button
                disabled={submitButton}
                onClick={submitResponse}
                className={`questionSubmitButton ${
                  submitButton ? "disabled" : ""
                }`}
              >
                Submit
              </button>
            </div>
          )}
        </div>

        <IonModal
          id="questionsModal"
          isOpen={isOpen}
          mode="ios"
          onDidDismiss={() => setIsOpen(false)}
          animated={true}
        >
          <div className="questionsAccordion ion-padding">
            <IonAccordionGroup>
              {["8", "10", "9", "11", "43", "13"].includes(cardTitle) && (
                <IonAccordion>
                  <IonItem slot="header">Instructions</IonItem>
                  <div
                    style={{ height: "60vh", overflow: "scroll" }}
                    slot="content"
                  >
                    {cardTitle === "8" && <PhysicalInstructions />}
                    {cardTitle === "10" && <TobaccoInstructions />}
                    {cardTitle === "9" && <StressInstructions />}
                    {cardTitle === "11" && <AlcoholInstructions />}
                    {cardTitle === "43" && <SleepInstructons />}
                    {cardTitle === "13" && <BMIInstructions />}
                  </div>
                </IonAccordion>
              )}

              {["8", "10", "9", "11", "43"].includes(cardTitle) && (
                <IonAccordion>
                  <IonItem slot="header">Info</IonItem>
                  <div slot="content">
                    {cardTitle === "8" && <PhysicalInfo />}
                    {cardTitle === "10" && <TobaccoInfo />}
                    {cardTitle === "9" && <StressInfo />}
                    {cardTitle === "11" && <AlcoholInfo />}
                    {cardTitle === "43" && <SleepInfo />}
                  </div>
                </IonAccordion>
              )}
            </IonAccordionGroup>
          </div>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Questions;
