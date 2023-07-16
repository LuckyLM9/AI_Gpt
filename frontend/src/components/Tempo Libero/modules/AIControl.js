
import React, { useState, useEffect } from 'react';
 function TokenViewer() {
  const [userMessage, setUserMessage] = useState('');
  const [tokenCount, setTokenCount] = useState(0);
   useEffect(() => {
    fetch('http://localhost:5050/chat', {
      method: 'POST',
      body: JSON.stringify({ message: 'Hello' }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        const { message, tokens } = data;
        setUserMessage(message);
        setTokenCount(tokens.length);
      })
      .catch(error => {
        console.error('Errore durante la richiesta:', error);
      });
  }, []);
   return (
    <div>
      <h2 style={{ color: 'white' }}>Informazioni Utente:</h2>
      <p style={{ color: 'white' }}>Messaggio dell'utente: {userMessage}</p>
      <p style={{ color: 'white' }}>Numero di token utilizzati: {tokenCount}</p>
    </div>
  );
}
 export default TokenViewer;