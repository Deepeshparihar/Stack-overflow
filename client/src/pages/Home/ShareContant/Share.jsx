import React, { useState } from "react";
import "./Share.css";
import { Document, Page, pdfjs } from "react-pdf";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import abusiveWords from "./FilterContent";

const Share = () => {
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState("");
  const [previewURL, setPreviewURL] = useState("");

  const User = useSelector((state) => state.currentUserReducer);
  const navigate = useNavigate();

  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleCheckAbusiveWords = (content) => {
    const lowercaseContent = content.toLowerCase();

    const containsAbusiveWord = abusiveWords.find((word) =>
      lowercaseContent.includes(word)
    );

    if (containsAbusiveWord) {
      alert(`Remove abusive words "${containsAbusiveWord}"  to proceed.`);
      return false;
    }

    return true;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const fileType = selectedFile.type;

      if (
        fileType.startsWith("image/") ||
        fileType.startsWith("video/") ||
        fileType === "application/pdf"
      ) {
        setFile(selectedFile);
        setFileType(fileType);

        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewURL(reader.result);
        };

        reader.readAsDataURL(selectedFile);
      } else {
        alert("Please select a valid image, video, or PDF file.");
        navigate("/");
        e.target.value = null;
        setFile(null);
        setFileType("");
        setPreviewURL("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = handleCheckAbusiveWords(content);

    if (isValid) {
      try {
        const formData = new FormData();
        formData.append("text", content);
        formData.append("userPosted", User.result.name);
        formData.append("userId", User?.result?._id);

        if (file) {
          formData.append("file", file);
        }

        await axios.post("http://localhost:5000/api/upload", formData);

        navigate("/CardsPage");
      } catch (error) {
        console.log(error);
      }

      setContent("");
      setFile(null);
      setFileType("");
      setPreviewURL("");
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setContent(content + "\n");
    }
  };

  return (
    <div className="share">
      <div className="share-container">
        <h1 className="share-h1">Start to connect</h1>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-container">
            <textarea
              className="share-text"
              cols="30"
              rows="5"
              value={content}
              onChange={handleContentChange}
              placeholder="Enter text"
              onKeyDown={handleEnter}
            ></textarea>
            <div className="submission">
              <input type="file" className="file" onChange={handleFileChange} />
              {fileType && <p>Selected File Type: {fileType}</p>}
              {previewURL && (
                <div
                  className="file-preview"
                  style={{
                    maxWidth: "300px",
                    maxHeight: "400px",
                    overflow: "hidden",
                  }}
                >
                  {fileType.startsWith("image/") ? (
                    <img
                      src={previewURL}
                      alt="File Preview"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  ) : fileType.startsWith("video/") ? (
                    <video controls style={{ width: "300px" }}>
                      <source
                        src={previewURL}
                        type={fileType}
                        style={{
                          objectFit: "contain",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                      Your browser does not support the video tag.
                    </video>
                  ) : fileType === "application/pdf" ? (
                    <div className="pdf-container">
                      <Document file={previewURL} className="pdf-document">
                        <Page
                          pageNumber={1}
                          className="pdf-page"
                          width={300}
                          scale={1.0}
                        />
                      </Document>
                    </div>
                  ) : (
                    <p>{fileType.name}</p>
                  )}
                </div>
              )}
            </div>
          </div>
          <button type="submit" className="share-btn">
            Share
          </button>
        </form>
      </div>
    </div>
  );
};

export default Share;
