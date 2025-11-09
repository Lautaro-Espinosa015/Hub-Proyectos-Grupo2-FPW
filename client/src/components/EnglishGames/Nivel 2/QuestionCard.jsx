import React from "react";
import OptionButton from "../../common/OptionButton.jsx";


function QuestionsCard({ question, options, onAnswer, timeLeft }) {
  return (
    <div className="card p-4">
      <h4>{question}</h4>
      <h5 className="text-danger">Time left: {timeLeft}s</h5>
      <div className="d-flex flex-column gap-2 mt-3">
        {options.map((option, index) => (
          <OptionButton key={index} text={option} onClick={() => onAnswer(option)} />
        ))}
      </div>
    </div>
  );
}


export default QuestionsCard;
