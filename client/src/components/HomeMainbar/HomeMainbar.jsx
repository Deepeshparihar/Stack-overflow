/* eslint-disable no-unused-vars */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import Questions from "./Questions";
import "./HomeMainbar.css";
import QuestionList from "./QuestionList";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'

const HomeMainbar = () => {
  
  const user = 1;

  const questionsList = useSelector(state => state.questionReducer)
  
  // console.log(questionsList)

  // var questionsList = [
  //   {
  //     _id: 1,
  //     upVotes:3,
  //     downVotes: 2,
  //     noOfAnswers: 2,
  //     questionTitle: "What is a function",
  //     questionBody: "It meant to be",
  //     questionTags: ["java", "node js", "react js", "mongodb"],
  //     userPosted: "Deepesh",
  //     askedOn: "jan 1",
  //     userId:1,
  //     answer:[{
  //       answerBody:"Answer",
  //       userAnswered: "Kumar",
  //       answeredOn: "jan 2",
  //       userId: 2,
  //     }]
  //   },
  //   {
  //     _id: 2,
  //     upVotes:3,
  //     downVotes: 2,
  //     noOfAnswers: 2,
  //     questionTitle: "What is a Array",
  //     questionBody: "It meant to be",
  //     questionTags: ["java", "node js", "react js", "mongodb"],
  //     userPosted: "Deepesh",
  //     askedOn: "jan 1",
  //     userId:1,
  //     answer:[{
  //       answerBody:"Answer",
  //       userAnswered: "Kumar",
  //       answeredOn: "jan 2",
  //       userId: 2,
  //     }]
  //   },
  //   {
  //     _id: 3,
  //     upVotes:3,
  //     downVotes: 2,
  //     noOfAnswers: 2,
  //     questionTitle: "What is a arrow function",
  //     questionBody: "It meant to be",
  //     questionTags: ["java", "node js", "react js", "mongodb"],
  //     userPosted: "Deepesh",
  //     askedOn: "jan 1",
  //     userId:1,
  //     answer:[{
  //       answerBody:"Answer",
  //       userAnswered: "Kumar",
  //       answeredOn: "jan 2",
  //       userId: 2,
  //     }]
  //   },
  // ];

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
