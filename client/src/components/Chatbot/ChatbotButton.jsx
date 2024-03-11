import React, { useState } from "react";
import ChatOverlay from "./ChatOverlay";
import "./ChatbotButton.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ChatbotButton = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const navigate = useNavigate();

  const User = useSelector((state) => state.currentUserReducer);

  const checkAuth = () => {
    if (User === null) {
      alert("login or signup to access chatbot");
      navigate("/Auth");
    } else {
      navigate("/Subscription");
    }
  };

  const openOverlay = () => {
    setShowOverlay(true);
  };

  const closeOverlay = () => {
    setShowOverlay(false);
  };

  return (
    <>
      <button
        className="chatbot-button"
        onClick={() => {
          if (User !== null) {
            openOverlay();
          } else {
            checkAuth();
          }
        }}
      >
        <div className="button-image"></div>
      </button>
      <ChatOverlay showOverlay={showOverlay} closeOverlay={closeOverlay} />
    </>
  );
};

export default ChatbotButton;
