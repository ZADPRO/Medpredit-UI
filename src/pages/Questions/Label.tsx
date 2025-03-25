import React, { useEffect, useState } from "react";
import ShowCard from "../ShowCard/ShowCard";
import Domain from "../Domain/Domain";

interface LabelProps {
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
  onEdit: (questionType: any, value: any, forwardQId: string) => void;
}

const Label: React.FC<LabelProps> = ({ label, onEdit }) => {
  const forwardQId = label.options[0]?.forwardQId || "";

  useEffect(() => {
    onEdit(label.questionType, "0", forwardQId);
  }, [forwardQId]);
  return (
    <div className="questions inputText">
      <Domain questionId={label.questionId} />
      <p className="questionText">{label.questionText}</p>
      <ShowCard questionId={label.questionId} />
    </div>
  );
};

export default Label;
