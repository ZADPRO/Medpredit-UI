import { Divider } from "primereact/divider";
import React, { useState } from "react";
import ShowCard from "../ShowCard/ShowCard";
import Domain from "../Domain/Domain";
import { RadioButton } from "primereact/radiobutton";

interface NumberInputBoxT6Props {
  type: string;
  label: {
    questionType: string;
    questionText: string;
    questionId: number;
    options: {
      backwardQId: string;
      forwardQId: string;
      refOptionId: number;
      refOptionLabel: string;
    }[];
  };
  onClickOpt: (value: string, questionId: number, forwardQId: string) => void;
  onEdit: (questionType: any, value: any, forwardQId: string) => void;
}

const NumberInputBoxT6: React.FC<NumberInputBoxT6Props> = ({
  label,
  type,
  onClickOpt,
  onEdit,
}) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
    const forwardQId = label.options[0]?.forwardQId || "";
    onClickOpt(value, label.questionId, forwardQId);
    onEdit(label.questionType, value, forwardQId);
  };

  return (
    <div className="questionsOutline">
      <div className="questions inputText">
        <Domain questionId={label.questionId} />
        <p className="question ">{label.questionText}</p>
        <ShowCard questionId={label.questionId} />
        <div className="flex flex-wrap gap-3">
          {[1, 2, 3, 4, 5, 6, 7].map((num) => (
            <div key={num} className="flex align-items-center">
              <RadioButton
                inputId={`radio${label}${num}`}
                name="numberSelection"
                value={num.toString()}
                onChange={(e) => handleRadioChange(e.value)}
                checked={selectedValue === num.toString()}
              />
              <label htmlFor={`radio${num}`} className="ml-2">
                {num}
              </label>
            </div>
          ))}
        </div>
        <Divider />
      </div>
    </div>
  );
};

export default NumberInputBoxT6;
