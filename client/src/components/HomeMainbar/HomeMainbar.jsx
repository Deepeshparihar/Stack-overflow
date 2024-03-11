/* eslint-disable no-unused-vars */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import Questions from "./Questions";
import "./HomeMainbar.css";
import QuestionList from "./QuestionList";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HomeMainbar = () => {
  const user = useSelector((state) => state.currentUserReducer);

  const questionsList = useSelector((state) => state.questionReducer);

  const location = useLocation();
  const navigate = useNavigate();

  const checkAuth = () => {
    if (user === null) {
      alert("login or signup to ask a question");
      navigate("/Auth");
    } else {
      navigate("/AskQuestion");
    }
  };

  return (
    <div className="main-bar">
      <div className="main-bar-header">
        {location.pathname === "/" ? (
          <h1>Top Questions</h1>
        ) : (
          <h1>All Questions</h1>
        )}
        <button onClick={checkAuth} className="ask-btn">
          Ask Questions
        </button>
      </div>
      <div>
        {questionsList.data === null ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <p>{questionsList.data.length} questions</p>
            <QuestionList questionsList={questionsList.data} />
          </>
        )}
      </div>
    </div>
  );
};

export default HomeMainbar;
