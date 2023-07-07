import React, { useState, useRef } from "react";
import axios from "axios";
import Navbar from '../components/Navbar';
 const ImageGenerator = () => {
  const [inputText, setInputText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [history, setHistory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const imageRef = useRef(null);
   const generateImage = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/images/generations",
        {
          model: "image-alpha-001",
          prompt: inputText,
          num_images: 1,
          size: "512x512",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      );
      setImageUrl(response.data.data[0].url);
      setHistory([...history, inputText]);
      setInputText("");
    } catch (error) {
      console.error(error);
    }
  };
   const handleHistoryToggle = () => {
    const historyContainer = document.getElementById("history-container");
    historyContainer.classList.toggle("hidden");
  };
   const handleModalToggle = () => {
    setShowModal(!showModal);
  };
   const handleDownloadClick = () => {
    const link = document.createElement('a');
    link.href = imageRef.current.src;
    link.download = 'generated-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
   return (
    <>
      <Navbar />
      <div className="image-generator-container">
        <h1 className="image-generator-title">Generatore di immagini</h1>
        <form className="image-generator-form" onSubmit={generateImage}>
          <label className="image-generator-label" htmlFor="inputText">
            Inserisci una descrizione:
          </label>
          <input
            className="image-generator-input"
            type="text"
            id="inputText"
            name="inputText"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button className="image-generator-button" type="submit">
            Genera immagine
          </button>
        </form>
        {history.length > 0 && (
          <div className="history-toggle-container">
            <button
              className="history-toggle-button"
              onClick={handleHistoryToggle}
            >
              Cronologia
            </button>
            <ul className="history-container hidden" id="history-container">
              {history.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        {imageUrl && (
          <div className="image-generator-img-container">
            <h2 className="image-generator-img-title">Immagine generata:</h2>
            <img
              className="image-generator-img"
              src={imageUrl}
              alt="Generated image"
              onClick={handleModalToggle}
              ref={imageRef}
            />
          </div>
        )}
      </div>
      {showModal && (
        <div className="modal-container">
          <div className="modal-content">
            <img
              className="modal-image"
              src={imageUrl}
              alt="Generated image"
              ref={imageRef}
            />
            <button className="modal-button" onClick={handleDownloadClick}>
              Scarica immagine
            </button>
            <button className="modal-button" onClick={handleModalToggle}>
              Chiudi
            </button>
          </div>
        </div>
      )}
    </>
  );
};
 export default ImageGenerator;