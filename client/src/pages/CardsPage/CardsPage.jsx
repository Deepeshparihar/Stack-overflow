import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCards } from "../../actions/cards";
import "./CardsPage.css";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { getStorage, ref, getDownloadURL, getMetadata } from "firebase/storage";
import app from "./file";

const CardsPage = () => {
  const user = useSelector((state) => state.currentUserReducer);
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cardReducer);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [filePreviews, setFilePreviews] = useState({});

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

  useEffect(() => {
    const fetchFilePreviews = async () => {
      const previews = {};
      for (const card of cards.data) {
        if (card.file) {
          try {
            const downloadUrl = await getDownloadURL(
              ref(getStorage(app), card.file)
            );
            const metadata = await getMetadata(ref(getStorage(app), card.file));
            previews[card.file] = {
              downloadUrl,
              contentType: metadata.contentType,
            };
          } catch (error) {
            console.error("Error getting file URL:", error);
            previews[card.file] = null;
          }
        }
      }
      setFilePreviews(previews);
    };

    fetchFilePreviews();
  }, [cards.data]);

  const getFilePreview = (file) => {
    return filePreviews[file];
  };

  const renderTruncatedText = (text, cardId, hasFile) => {
    const wordLimit = hasFile ? 13 : 60;
    const words = text.split(" ");

    if (words.length <= wordLimit) {
      return text;
    } else {
      const truncatedText = words.slice(0, wordLimit).join(" ");
      return (
        <div>
          {truncatedText}...
          <button
            onClick={() => openModal(text)}
            style={{ display: "inline-block", marginLeft: "5px" }}
          >
            Read More
          </button>
        </div>
      );
    }
  };

  const renderFilePreview = (file) => {
    const fileData = getFilePreview(file);
    if (!fileData) return null;

    const { downloadUrl, contentType } = fileData;
    if (contentType.startsWith("image")) {
      return (
        <img
          src={downloadUrl}
          alt="Preview"
          style={{
            maxWidth: "200px",
            maxHeight: "200px",
            minWidth: "0px",
            minHeight: "0px",
          }}
        />
      );
    } else if (contentType === "application/pdf") {
      return (
        <embed
          src={downloadUrl}
          type="application/pdf"
          width="200"
          height="200"
        />
      );
    } else if (contentType.startsWith("video")) {
      return (
        <video width="200" height="200" controls>
          <source src={downloadUrl} type={contentType} />
        </video>
      );
    } else if (contentType.startsWith("audio")) {
      return (
        <audio controls>
          <source src={downloadUrl} type={contentType} />
        </audio>
      );
    } else {
      return <p className="card-text">File: {file}</p>;
    }
  };

  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-container-2">
        <div className="cards-header">
          <h1 className="cards-h1">Public Space</h1>
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
                  {card.file && (
                    <div className="card-file">
                      {renderFilePreview(card.file)}
                    </div>
                  )}
                </div>
                <div className="card-bottom">
                  <div className="card-username">By {card.userPosted}</div>
                  <div className="card-date">
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

export default CardsPage;
