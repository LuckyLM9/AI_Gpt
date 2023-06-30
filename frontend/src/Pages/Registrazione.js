import React, { useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from 'mdb-react-ui-kit';
import '../Registrazione.css';

 function App() {
  const handleRegistration = async () => {
    try {
      const nome = document.getElementById('form1').value;
      const cognome = document.getElementById('form2').value;
      const email = document.getElementById('form3').value;
      const password = document.getElementById('form4').value;
       // Controlla se l'utente esiste già
      const userExists = await axios.get(`${process.env.MONGODB_URI}/user?email=${email}`);
      if (userExists.data) {
        alert('Utente già esistente!');
        return;
      }
       const response = await axios.post(`${process.env.MONGODB_URI}/user`, {
        nome,
        cognome,
        email,
        password,
      });
       const token = response.data.token;
      localStorage.setItem('jwtToken', token);
      console.log('Grazie per esserti registrato!');
    } catch (error) {
      console.log(error);
    }
  };
   const handleLogin = async () => {
    try {
      const email = document.getElementById('form3').value;
      const password = document.getElementById('form4').value;
       const response = await axios.post('http://localhost:5050/login', {
        email,
        password,
      });
       const token = response.data.token;
      localStorage.setItem('jwtToken', token);
      console.log('Grazie per esserti autenticato!');
    } catch (error) {
      console.log(error);
    }
  };
   const checkToken = () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const decoded = jwt_decode(token);
      console.log('Token decodificato:', decoded);
    } else {
      console.log('Nessun token trovato');
    }
  };
   useEffect(() => {
    checkToken();
  }, []);
   return (
    <>
      <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>
        <MDBRow>
          <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
            <h1 className='my-5 display-3 fw-bold ls-tight px-3' style={{ color: 'hsl(218, 81%, 95%)' }}>
              AI-GPT <br />
              <span style={{ color: 'hsl(218, 81%, 75%)' }}>Login</span>
            </h1>
            <p className='px-3' style={{ color: 'hsl(218, 81%, 85%)' }}>
              Questa AI-GPT, puoi costruire soluzioni di computer adottando un approccio in grado di automatizzare ed
              elaborare le informazioni in modo intelligente. Questo significa che AI-GPT può essere utilizzata per
              automatizzare dati, operazioni e strategie di business di un'azienda. Può anche essere utilizzata per le
              analisi predittive, creando modelli per il machine learning e la cura dei dati. Inoltre, AI-GPT può anche
              aiutare le aziende a prendere decisioni più illuminate.
            </p>
          </MDBCol>
          <MDBCol md='6' className='position-relative'>
            <div id='radius-shape-1' className='position-absolute rounded-circle shadow-5-strong'></div>
            <div id='radius-shape-2' className='position-absolute shadow-5-strong'></div>
            <MDBCard className='my-5 bg-glass'>
              <MDBCardBody className='p-5'>
                <MDBRow>
                  <MDBCol col='6'>
                    <MDBInput wrapperClass='mb-4' label='Nome' id='form1' type='text' />
                  </MDBCol>
                  <MDBCol col='6'>
                    <MDBInput wrapperClass='mb-4' label='Cognome' id='form2' type='text' />
                  </MDBCol>
                </MDBRow>
                <MDBInput wrapperClass='mb-4' label='Email' id='form3' type='email' />
                <MDBInput wrapperClass='mb-4' label='Password' id='form4' type='password' />
                <MDBBtn className='w-100 mb-4' size='md' onClick={handleRegistration}>
                  Registrati
                </MDBBtn>
                 <p className='name-registrazione'>Sei già registrato? "Clicca Accedi"</p>
                <MDBBtn className='mb-4 w-100' href='/Home' onClick={handleLogin}>
                  Accedi
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}
 export default App;