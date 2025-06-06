import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import Domain from "../Domain/Domain";
interface SingleInputBoxProps {
  type: string;
  label: {
    questionType: string;
    questionText: string;
    questionId: number;
    options: [
      {
        backwardQId: string;
        forwardQId: string;
        refOptionId: number;
        refOptionLabel: string;
      }
    ];
  };
  onClickOpt: (value: string, questionId: number, forwardQId: string) => void;
  onEdit: (questionType: any, value: any, forwardQId: string) => void;
}

const SingleInputBox: React.FC<SingleInputBoxProps> = ({
  label,
  type,
  onClickOpt,
  onEdit,
}) => {
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    setValue(""); // Reset selection to empty array initially
  }, [label]);

  const handleButtonClick = () => {
    const forwardQId = label.options[0]?.forwardQId || "";
    onClickOpt(value, label.questionId, forwardQId);
    onEdit(label.questionType, value, forwardQId);
  };

  return (
    <div className="questionsOutline">
      {/* <p className="questionNumber">1</p> */}
      <div className="questions inputText">
      <Domain questionId={label.questionId} />
        <p className="question ">{label.questionText}</p>
        <div className="p-inputgroup flex-1">
          <InputText
            value={value}
            type={type}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setValue(e.target.value)
            }
          />
          <span className="p-inputgroup-addon" onClick={handleButtonClick}>
            <i className="pi pi-arrow-right"></i>
          </span>
        </div>
        <Divider />
      </div>
    </div>
  );
};

export default SingleInputBox;
