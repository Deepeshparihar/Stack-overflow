import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initiatePayment } from "../../../actions/payment";
import "./Subscription.css";
import LeftSidebar from "../../../components/LeftSidebar/LeftSidebar";
import { useNavigate } from "react-router-dom";

const Subscription = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPlan, setCurrentPlan] = useState("Free");
  const User = useSelector((state) => state.currentUserReducer);

  const currentUserAmount = useSelector(
    (state) => state.questionReducer.currentUserAmount
  );

  const checkAuth = () => {
    if (User === null) {
      alert("login or signup to take a plan");
      navigate("/Auth");
    } else {
      navigate("/Subscription");
    }
  };

  useEffect(() => {
    if (currentUserAmount === 100) {
      setCurrentPlan("Silver");
    } else if (currentUserAmount === 1000) {
      setCurrentPlan("Gold");
    } else {
      setCurrentPlan("Free");
    }
  }, [currentUserAmount]);

  const handlePayment = (amount) => {
    const userName = User.result.name;
    const userId = User.result._id;

    let adjustedAmount = amount; // Initialize adjustedAmount with the original amount

    // Check if the user is currently subscribed to the Silver Plan (100)
    if (currentUserAmount === 100) {
      // Apply the discount if the current plan is Silver Plan
      adjustedAmount -= 100; // Deduct 100 from the original amount
    }
    if (currentUserAmount === 100 && amount <= 100) {
      alert("You already have the Silver Plan.");
    } else if (currentUserAmount === 1000 && amount <= 1000) {
      alert("You already have the Gold Plan.");
    } else if (currentUserAmount === null && amount === 0) {
      alert("You already in Free Plan.");
    } else {
      dispatch(initiatePayment(adjustedAmount, userName, userId));
    }
  };

  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-container-2">
        <h1 className="cards-h1">
          Subscription Offers || Current Plan : {currentPlan}{" "}
        </h1>
        <div className="subscription-container">
          <div className="subscription-card">
            <h2>Free Plan</h2>
            <p>Can post only 1 question a day</p>
            <h1>Free</h1>
            <button
              className="buy-btn"
              onClick={() => {
                if (User !== null) {
                  handlePayment(0);
                } else {
                  checkAuth();
                }
              }}
            >
              Buy Now
            </button>
            <hr className="line" />
            <div className="list">
              <ul className="list-item">
                <li>Unlimited answers</li>
                <li>One question per day</li>
                <li>Can use other features</li>
              </ul>
            </div>
          </div>
          <div className="subscription-card">
            <h2>Silver Plan</h2>
            <p>Can post 5 questions a day</p>
            <h1>₹100/month</h1>
            <button
              className="buy-btn"
              onClick={() => {
                if (User !== null) {
                  handlePayment(100);
                } else {
                  checkAuth();
                }
              }}
            >
              Buy Now
            </button>
            <hr className="line" />
            <div className="list">
              <ul className="list-item">
                <li> Ask 5 question per day</li>
                <li>Unlimited answers</li>
                <li>All features available</li>
              </ul>
            </div>
          </div>
          <div className="subscription-card">
            <h2>Gold Plan</h2>
            <p>Can post unlimited questions</p>
            <p>
              {currentUserAmount === 100 ? (
                <>
                  <s>₹1000</s> <span className="discount-text">SAVE ₹100</span>{" "}
                  {/* Display discount */}
                  <h1>₹900/month</h1>
                </>
              ) : (
                <h1>₹1000/month</h1>
              )}
            </p>
            <button
              className="buy-btn"
              onClick={() => {
                if (User !== null) {
                  handlePayment(1000);
                } else {
                  checkAuth();
                }
              }}
            >
              Buy Now
            </button>
            <hr className="line" />
            <div className="list">
              <ul className="list-item">
                <li>Ask limitless question </li>
                <li>Premium member</li>
                <li>All features aceess</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
