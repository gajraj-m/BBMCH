import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const StudentsPanel = () => {
  const { constants } = useSelector((state) => state.app);

  // Render quizzes if available
  const renderQuizzes = () => {
    return (
      <div className="mt-8">
        {/* Button to open quiz in a new tab */}
        <button onClick={() => window.open(constants.quiz?.link, "_blank")} className="hover:scale-105 duration-150">
          <h3 className="bg-slate-600 p-4 w-fit rounded-lg">
            {constants.quiz?.title}
          </h3>
        </button>
      </div>
    );
  };

  return (
    <div className="p-8">
      <h2>Available Quizzes</h2>
      {constants.quiz.title !== undefined && constants.quiz.title !== "" ? (
        renderQuizzes()
      ) : (
        <p>No quizzes available.</p>
      )}
    </div>
  );
};

export default StudentsPanel;
