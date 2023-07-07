import { useEffect, useState } from 'react'; 
import Button from 'react-bootstrap/Button'; 
import axios from 'axios';
function LoadingButton() { 
  const [isLoading, setLoading] = useState(false); 
 
  useEffect(() => { 
    function simulateNetworkRequest() { 
      return new Promise((resolve) => setTimeout(resolve, 2000)); 
    } 
 
    if (isLoading) { 
      simulateNetworkRequest().then(() => { 
        setLoading(false); 
      }); 
    } 
  }, [isLoading]); 
 
 const handleLogout = () => {
  // Esegui il logout dell'utente dal token JWT
  localStorage.removeItem('token'); // Rimuovi il token JWT memorizzato nel local storage o dove è stato salvato
   // Esegui il logout di GitHub (esempio con libreria axios)
  axios.post('https://api.github.com/logout')
    .then(response => {
      // Operazioni dopo il logout di GitHub (ad esempio, reindirizzamento a una pagina di login)
      window.location.href = '/login';
    })
    .catch(error => {
      // Gestione dell'errore durante il logout di GitHub
      console.error('Errore durante il logout di GitHub:', error);
    });
   // Aggiungi qui altre operazioni di logout specifiche che potresti avere
};
 
  const handleClick = () => { 
    setLoading(true); 
    handleLogout(); 
  } 
 
  return ( 
    <Button 
      variant="secondary" 
      disabled={isLoading} 
      href="/" 
      onClick={!isLoading ? handleClick : null} 
    > 
      {isLoading ? 'Log-Out in corso...' : 'Log-Out'} 
    </Button> 
  ); 
} 
 
export default LoadingButton