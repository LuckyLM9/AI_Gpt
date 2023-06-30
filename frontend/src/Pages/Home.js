import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LogoAi from '../components/Pictures/logoAImulti.png';
import ChatBot from '../components/Pictures/chatbot-marketing.gif';
import Navbar from '../components/Navbar';
 export function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [token, setToken] = useState('');
   const handleClearHistory = () => {
    setSearchHistory([]);
  };
   const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
     axios
      .post("http://localhost:5050/chat", { prompt }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        setResponse(res.data);
        setLoading(false);
        setSearchHistory([...searchHistory, { prompt, response: res.data }]);
      })
      .catch((err) => {
        console.error(err);
      });
  };
   const handleShowHistory = () => {
    setShowHistory(!showHistory);
  };
   useEffect(() => {
    axios.get("http://localhost:5050/token")
      .then((res) => {
        const token = res.data.token;
        setToken(token);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
   return (
    <>
      <Navbar />
      <div className="button-logo-img"></div>
      <div className="wrapper">
        <img src={ChatBot} alt="" className="Chat-Bot-Logo" />
        <form onSubmit={handleSubmit}>
          <img
            src={LogoAi}
            alt=""
            className={loading ? 'cg-logo loading' : 'cg-logo'}
          />
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Fammi una domanda... :)"
          />
          <button type="submit">Invio</button>
        </form>
        <p className="response-area">{loading ? 'Caricamento...' : response}</p>
         <div className="search-history">
          <button onClick={handleShowHistory}>
            {showHistory ? 'Nascondi cronologia' : 'Mostra cronologia'}
          </button>
          <button onClick={handleClearHistory} disabled={searchHistory.length === 0}>
            Pulisci cronologia
          </button>
          {showHistory && (
            <>
              <h3>Cronologia delle ricerche</h3>
              <ul>
                {searchHistory.map((search, index) => (
                  <li key={index}>
                    <strong>Domanda:</strong> {search.prompt}<br />
                    <strong>Risposta:</strong> {search.response}
                  </li>
                ))}
              </ul>
              <div className="footer">~ By LuckyLM9 - Luca Marangotto ~</div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
 export default App;