import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";

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

interface TreatmentDetailsQuestionProps {
  SubmitActive: (active: boolean) => void;
  handleData: (data: QuestionSet[]) => void;
}

const categoryOptions = [
  "Anti-diabetic",
  "Anti-hypertensive",
  "Anti-thrombotic",
  "Antibiotic",
  "NSAIDS",
  "Steroids",
  "Vitamin and Mineral Supplements",
  "Others",
];

const roaOptions = ["PO", "IM", "IV", "SC", "ID", "PV", "PR"];
const relationToFoodOptions = ["Before Food", "After Food"];

const createNewQuestionSet = (): QuestionSet => ({
  nameOfMedicine: "",
  category: null,
  strength: null,
  roa: null,
  relationToFood: null,
  morningdosage: null,
  morningtime: null,
  afternoondosage: null,
  afternoontime: null,
  eveningdosage: null,
  eveningtime: null,
  nightdosage: null,
  nighttime: null,
  monthsduration: null,
  yearsduration: null,
});

const TreatmentDetailsQuestion: React.FC<TreatmentDetailsQuestionProps> = ({
  SubmitActive,
  handleData,
}) => {
  const [questionSets, setQuestionSets] = useState<QuestionSet[]>([]);

  const handleInputChange = <T extends keyof QuestionSet>(
    index: number,
    field: T,
    value: QuestionSet[T]
  ) => {
    const updatedSets = [...questionSets];
    updatedSets[index][field] = value;
    setQuestionSets(updatedSets);
  };

  const handleAddSet = () => {
    setQuestionSets([...questionSets, createNewQuestionSet()]);
  };

  const handleRemoveSet = (index: number) => {
    const updatedSets = questionSets.filter((_, i) => i !== index);
    setQuestionSets(updatedSets);
  };

  useEffect(() => {
    SubmitActive(questionSets.length === 0);
    handleData(questionSets);
  }, [questionSets, SubmitActive, handleData]);

  return (
    <div>
      {questionSets.map((set, index) => (
        <div key={index} className="" style={{ marginBottom: "20px" }}>
          {/* Medicine Name */}
          <div className="questions">
            <p className="question">Name of Medicine</p>
            <InputText
              value={set.nameOfMedicine}
              onChange={(e) =>
                handleInputChange(index, "nameOfMedicine", e.target.value)
              }
              placeholder="Enter Medicine Name"
              required
              style={{ width: "100%" }}
            />
          </div>

          {/* Category */}
          <div className="questions inputText">
            <p className="question">Category</p>
            <Dropdown
              options={categoryOptions}
              value={set.category || undefined}
              placeholder="Select a Category"
              onChange={(e) => handleInputChange(index, "category", e.value)}
              style={{ width: "100%" }}
            />
          </div>

          {/* Strength */}
          <div className="questions inputText">
            <p className="question">Strength (mg)</p>
            <InputNumber
              value={set.strength || undefined}
              onChange={(e) => handleInputChange(index, "strength", e.value)}
              placeholder="Strength"
              style={{ width: "100%" }}
            />
          </div>

          {/* ROA */}
          <div className="questions inputText">
            <p className="question">ROA</p>
            <Dropdown
              options={roaOptions}
              value={set.roa || undefined}
              placeholder="Select a ROA"
              onChange={(e) => handleInputChange(index, "roa", e.value)}
              style={{ width: "100%" }}
            />
          </div>

          {/* Relation to Food */}
          <div className="questions inputText">
            <p className="question">Relation to Food</p>
            <Dropdown
              options={relationToFoodOptions}
              value={set.relationToFood || undefined}
              placeholder="Select a Relation to Food"
              onChange={(e) =>
                handleInputChange(index, "relationToFood", e.value)
              }
              style={{ width: "100%" }}
            />
          </div>

          {/* Dosage Time */}
          {[
            {
              label: "Morning",
              dosageKey: "morningdosage",
              timeKey: "morningtime",
            },
            {
              label: "Afternoon",
              dosageKey: "afternoondosage",
              timeKey: "afternoontime",
            },
            {
              label: "Evening",
              dosageKey: "eveningdosage",
              timeKey: "eveningtime",
            },
            { label: "Night", dosageKey: "nightdosage", timeKey: "nighttime" },
          ].map(({ label, dosageKey, timeKey }) => (
            <div
              key={label}
              className="questions inputText"
              style={{ marginBottom: "15px" }}
            >
              <p className="question">{`${label} Dosage`}</p>
              <div className="p-inputgroup flex-1">
                <InputNumber
                  style={{ width: "40%" }}
                  value={set[dosageKey as keyof QuestionSet] as number | null} // Cast to expected type
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      dosageKey as keyof QuestionSet,
                      e.value as number | null
                    )
                  }
                  placeholder="Dosage"
                />
                <Calendar
                  style={{ width: "60%" }}
                  value={set[timeKey as keyof QuestionSet] as Date | null} // Cast to expected type
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      timeKey as keyof QuestionSet,
                      e.value as Date | null
                    )
                  }
                  timeOnly
                  hourFormat="12"
                  placeholder="Time"
                />
              </div>
            </div>
          ))}

          {/* Duration */}
          <div className="questions">
            <p style={{ marginBottom: "5px" }}>Duration</p>
            <div className="p-inputgroup flex-1">
              <InputNumber
                style={{ width: "40%" }}
                onChange={(e) =>
                  handleInputChange(index, "monthsduration", e.value)
                }
                placeholder="Months"
                min={0}
                required
              />
              <InputNumber
                style={{ width: "60%" }}
                value={set.yearsduration || undefined}
                onChange={(e) =>
                  handleInputChange(index, "yearsduration", e.value)
                }
                placeholder="Years"
                min={0}
                required
              />
            </div>
          </div>

          {/* Remove Button */}
          <button
            type="button"
            onClick={() => handleRemoveSet(index)}
            className="p-button p-component"
            style={{
              marginTop: "5px",
              marginBottom: "5px",
              width: "100%",
              backgroundColor: "#EE4E4E",
              color: "#fff",
              padding: "15px",
              display: "flex",
              justifyContent: "center",
              borderRadius: "5px",
            }}
          >
            <div>Remove</div>
          </button>
        </div>
      ))}

      {/* Add New Set Button */}
      <button
        type="button"
        onClick={handleAddSet}
        className="p-button p-component"
        style={{
          marginTop: "5px",
          marginBottom: "5px",
          width: "100%",
          backgroundColor: "#219C90",
          color: "#fff",
          padding: "15px",
          display: "flex",
          justifyContent: "center",
          borderRadius: "5px",
        }}
      >
        Add New Treatment Details
      </button>
    </div>
  );
};

export default TreatmentDetailsQuestion;
