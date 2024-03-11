/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./ChatOverlay.css";
import { useSelector, useDispatch } from "react-redux";
import { sendOTP, verifyOTP } from "../../actions/auth";

const ChatOverlay = ({ showOverlay, closeOverlay }) => {
  const [showOTPInput, setShowOTPInput] = useState(false);
  const dispatch = useDispatch();
  const [enteredOTP, setEnteredOTP] = useState("");
  const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
  const [state, setState] = useState(false);

  const isOTPVerified = useSelector((state) => state.authReducer.isOTPVerified);

  const handleSendOTP = () => {
    setShowOTPInput(true);
    dispatch(sendOTP(email, generatedOTP));
  };

  const handleVerify = (e) => {
    e.preventDefault();
    try {
      dispatch(verifyOTP(email, enteredOTP));
      if (isOTPVerified) {
        setState(true);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Invalid OTP, try again");
    }
  };

  const handleBack = () => {
    setShowOTPInput(false);
  };

  const User = useSelector((state) => state.currentUserReducer);
  const email = User?.result?.email;
  return (
    <div className={`chat-overlay ${showOverlay ? "active" : ""}`}>
      <div className="chat-overlay-content">
        <button className="close-btn-bot" onClick={closeOverlay}>
          Close
        </button>
        <button className="back-btn" onClick={handleBack}>
          Back
        </button>
        <form className="auth">
          <label htmlFor="label">
            Authenticate by OTP to chat with Chatbot
          </label>{" "}
          <br />
          {!showOTPInput ? (
            <button onClick={handleSendOTP} className="otp-button">
              Send OTP to
            </button>
          ) : (
            <>
              <input
                type="text"
                value={enteredOTP}
                onChange={(e) => setEnteredOTP(e.target.value)}
                placeholder="Enter OTP"
              />
              <button onClick={handleVerify} className="otp-button">
                Verify
              </button>
            </>
          )}{" "}
          {email}
        </form>
      </div>
    </div>
  );
};

export default ChatOverlay;
