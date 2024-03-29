import React, { useState, useEffect } from "react";
import "./AskQuestion.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  askQuestion,
  getQuestionCountToday,
  getCurrentUserAmount,
} from "../../../actions/question";

const AskQuestion = () => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [questionTags, setQuestionTags] = useState("");

  const dispatch = useDispatch();
  const User = useSelector((state) => state.currentUserReducer);
  const userId = useSelector((state) => state.currentUserReducer.result._id);
  const navigate = useNavigate();

  const questionCountToday = useSelector(
    (state) => state.questionReducer.questionCountToday
  );

  const currentUserAmount = useSelector(
    (state) => state.questionReducer.currentUserAmount
  );

  useEffect(() => {
    if (userId) {
      dispatch(getCurrentUserAmount(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (userId) {
      dispatch(getQuestionCountToday(userId));
    }
  }, [dispatch, userId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      (currentUserAmount === 100 && questionCountToday >= 5) ||
      (currentUserAmount === 1000 && questionCountToday >= Infinity) ||
      (currentUserAmount !== 1000 &&
        currentUserAmount !== 100 &&
        questionCountToday >= 1)
    ) {
      alert(
        "You have reached your daily question limit upgrade the plan to continue."
      );
      navigate("/Subscription");
      return;
    }
    dispatch(
      askQuestion(
        {
          questionTitle,
          questionBody,
          questionTags,
          userPosted: User.result.name,
          userId: User?.result?._id,
          currentUserAmount,
          questionCountToday,
        },
        navigate
      )
    );
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setQuestionBody(questionBody + "\n");
    }
  };

  return (
    <div className="ask-question">
      <div className="ask-ques-container">
        <h1>Ask a public Question</h1>
        <form onSubmit={handleSubmit}>
          <div className="ask-form-container">
            <label htmlFor="ask-ques-title">
              <h4>Title</h4>
              <p>
                Be specific and imagine you’re asking a question to another
                person.
              </p>
              <input
                type="text"
                onChange={(e) => {
                  setQuestionTitle(e.target.value);
                }}
                placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
                id="ask-ques-title"
              />
            </label>
            <label htmlFor="ask-ques-body">
              <h4>Body</h4>
              <p>
                Include all the information someone would need to answer your
                question
              </p>
              <textarea
                name=""
                onChange={(e) => {
                  setQuestionBody(e.target.value);
                }}
                id="ask-ques-body"
                cols="30"
                rows="10"
                onKeyDown={handleEnter}
              ></textarea>
            </label>
            <label htmlFor="ask-ques-tags">
              <h4>Tags</h4>
              <p>Add up to 5 tags to describe what your question is about </p>
              <input
                type="text"
                onChange={(e) => {
                  setQuestionTags(e.target.value.split(" "));
                }}
                placeholder="e.g. (xml typescript wordpres)"
                id="ask-ques-tags"
              />
            </label>
          </div>
          <input
            type="submit"
            className="review-btn"
            value="Review your question"
          />
        </form>
      </div>
    </div>
  );
};

export default AskQuestion;
