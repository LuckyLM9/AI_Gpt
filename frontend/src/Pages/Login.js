
import React, { useState, useEffect } from 'react';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBInput, MDBValidation } from 'mdb-react-ui-kit';
import LoginImg from '../components/Pictures/6216d4a9e16432bc2f2f5198015787fe.gif';
import LogoAi from '../components/Pictures/logoAImulti.png';
import LogoGit from '../components/Pictures/github-square-icon-256x256-7bp3g5mc.png';
import "../Login.css";
import { GoogleLogin } from 'react-google-login';
function App() {
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    // Recupera i dati dell'utente da GitHub dopo il login
    if (token) {
      fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => setUserData(data))
      .catch(error => console.log(error));
    }
  }, [token]);
  

   
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5050/auth/google/callback';
  };
  const handleGithubLogin = () => {
    window.location.href = 'http://localhost:5050/auth/github/callback';
    
  };

  const handleLogin = () => {
    if (token) {
      // If token is valid, redirect to /Home
      window.location.href = '/Home';
      localStorage.setItem('userToken', token);
    } else {
      // If token is not valid, show error and disable button for 5 seconds
      setError('Token non valido. Riprova tra 5 secondi.');
      setIsButtonDisabled(true);
      setTimeout(() => {
        setError(null);
        setIsButtonDisabled(false);
      }, 5000);
    }
  };

   
return (
  <>
    <img src={LogoAi} width={100} className={'cg-logo loading login'} />
    <h1 className='Text-Login'>AI-GPT Login</h1>
    <img src={LogoGit} width={40} className={'git-logo login'} />
    <MDBContainer className='my-5'>
      <MDBCard>
        <MDBRow className='g-0 d-flex align-items-center'>
          <MDBCol md='4'>
            <MDBCardImage src={LoginImg} alt='phone' className='rounded-t-5 rounded-tr-lg-0' fluid />
            {!token && (
              <>
                <MDBValidation className="git-login" onClick={handleGithubLogin}>LOGIN WITH GITHUB</MDBValidation>
                <MDBValidation className="google-login" onClick={handleGoogleLogin}>LOGIN WITH GOOGLE</MDBValidation>
              </>
            )}
          </MDBCol>
          <MDBCol md='8'>
            <MDBCardBody>
              <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email' />
              <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' />

              {token && (
                <MDBBtn className="mb-4 w-100" href="/Home">Accedi</MDBBtn>
              )}
          
              <MDBBtn className="mb-4 w-100" href="/Registrazione">Registrati</MDBBtn>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  </>
);
}
 export default App;