import React, { useState } from 'react';
import axios from 'axios';
import { getDocument } from 'pdfjs-dist';
import '../modules/AI.css';
import { Link } from 'react-router-dom';
export function App() {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchHistory, setSearchHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    const [pdfUrl, setPdfUrl] = useState('');
    const [error, setError] = useState('');
  
    const handleClearHistory = () => {
      setSearchHistory([]);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError('');
  
      // Controllo se il prompt è un file PDF
      if (prompt.endsWith('.pdf')) {
        try {
          const fileResponse = await axios.get(prompt, { responseType: 'blob' });
          const file = fileResponse.data;
  
          // Leggi il file PDF utilizzando pdfjs-dist
          const loadingTask = getDocument(file);
          const pdf = await loadingTask.promise;
  
          let text = '';
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const pageText = await page.getTextContent();
            text += pageText.items.map(item => item.str).join(' ');
          }
  
          // Esegui la logica di controllo AI sul testo del PDF
          const aiResult = await runAICheck(text);
  
          setResponse(aiResult);
          setLoading(false);
          setSearchHistory([...searchHistory, { prompt, response: aiResult }]);
          setPdfUrl(URL.createObjectURL(file)); // Imposta l'URL del PDF per visualizzazione
        } catch (error) {
          console.error(error);
          setError('Errore durante il caricamento del PDF. Assicurati di inserire un URL o un file valido.');
          setLoading(false);
        }
      } else {
        // Comunicazione con l'API per le richieste non correlate ai file PDF
        axios
          .post("http://localhost:5050/chat", { prompt })
          .then((res) => {
            setResponse(res.data);
            setLoading(false);
            setSearchHistory([...searchHistory, { prompt, response: res.data }]);
          })
          .catch((err) => {
            console.error(err);
            setError('Errore durante la comunicazione con l\'API.');
            setLoading(false);
          });
      }
    };
  
    const runAICheck = async (text) => {
      // Logica per il controllo AI del testo del PDF
      const response = await axios.post(process.env.CHATBOT_KEY, { text });
      return response.data.result;
    };
  
    const handleShowHistory = () => {
      setShowHistory(!showHistory);
    };
  
    return (
        <>
        
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Correttore Pdf</h1>
        <Link to="/Home">
          <button>Torna alla Home</button>
        </Link>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={prompt}
            accept=".pdf"
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Inserisci il testo o l'URL del file PDF"
          />
          <button type="submit">Invia</button>
        </form>
        <form onSubmit={handleSubmit}>
  <input
    type="file"
    accept=".pdf"
    onChange={(e) => setPrompt(URL.createObjectURL(e.target.files[0]))}
  />
  <button type="submit">Invia</button>
</form>
        {loading && <p>Caricamento...</p>}
  
        {error && (
          <div>
            <p>{error}</p>
            <button onClick={() => setPrompt('')}>Carica un PDF</button>
          </div>
        )}
  
        {response && (
          <div>
            <h2>Risultato:</h2>
            <p>{response}</p>
          </div>
        )}
  
        {pdfUrl && (
          <div>
            <h2>PDF Caricato:</h2>
            <iframe src={pdfUrl} width="100%" height="500px" title="PDF Viewer" />
          </div>
        )}
  
        {searchHistory.length > 0 && (
          <div>
            <h2>Cronologia delle ricerche:</h2>
            <button onClick={handleShowHistory}>
              {showHistory ? 'Nascondi cronologia' : 'Mostra cronologia'}
            </button>
            {showHistory &&
              searchHistory.map((item, index) => (
                <div key={index}>
                  <p>Prompt: {item.prompt}</p>
                  <p>Risposta: {item.response}</p>
                </div>
              ))}
            <button onClick={handleClearHistory}>Cancella cronologia</button>
          </div>
        )}
      </div>
      </>
    );
  }
  
  export default App;