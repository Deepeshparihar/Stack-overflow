/* eslint-disable no-unused-vars */
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCards } from "../../actions/cards";
import "./CardsPage.css";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

const CardsPage = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.currentUserReducer);
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cardReducer);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const openModal = (text) => {
    setModalContent(text);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent("");
  };

  const checkAuth = () => {
    if (user === null) {
      alert("login or signup to share a content");
      navigate("/Auth");
    } else {
      navigate("/Share");
    }
  };

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  const renderTruncatedText = (text, cardId, hasFile) => {
    const wordLimit = hasFile ? 15 : 60;
    const words = text.split(" ");

    if (words.length <= wordLimit) {
      return text;
    } else {
      const truncatedText = words.slice(0, wordLimit).join(" ");
      return (
        <div>
          {truncatedText}...
          <button onClick={() => openModal(text)}>Read More</button>
        </div>
      );
    }
  };

  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-container-2">
        <div className="cards-header">
          <h1 className="cards-h1">Public Sapce</h1>
          <button onClick={checkAuth} className="ask-btn">
            Share Content
          </button>
        </div>
        <div className="all-cards">
          {cards.data && cards.data.length > 0 ? (
            cards.data.map((card) => (
              <div key={card._id} className="card">
                <div className="card-body">
                  <div className="card-text">
                    {renderTruncatedText(card.text, card._id, card.file)}
                  </div>
                  {card.file && renderFilePreview(card.file)}
                </div>
                <div className="card-bottom">
                  <div className="card-username">By {card.userPosted} </div>
                  <div className="card-date">
                    {" "}
                    {moment(card.createdAt).fromNow()}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No cards found</div>
          )}
        </div>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={closeModal} className="close-btn">
              Close
            </button>
            <div>{modalContent}</div>
          </div>
        </div>
      )}
    </div>
  );
};

const renderFilePreview = (file) => {
  if (file) {
    const fileExtension = file.split(".").pop().toLowerCase();

    if (["png", "jpg", "jpeg", "gif"].includes(fileExtension)) {
      return (
        <div className="card-file">
          <img
            src={file}
            alt="Preview"
            style={{
              maxWidth: "200px",
              maxHeight: "200px",
              minWidth: "0px",
              minHeight: "0px",
            }}
          />{" "}
        </div>
      );
    } else if (["pdf"].includes(fileExtension)) {
      return (
        <div className="card-file">
          <embed src={file} type="application/pdf" width="200" height="200" />
        </div>
      );
    } else if (["mp4", "webm"].includes(fileExtension)) {
      return (
        <div className="card-file">
          <video width="200" height="200" controls>
            <source src={file} type="video/mp4" />
          </video>
        </div>
      );
    } else {
      <div className="card-file">
        return <p className="card-text">File: {file}</p>;
      </div>;
    }
  }
};

export default CardsPage;
