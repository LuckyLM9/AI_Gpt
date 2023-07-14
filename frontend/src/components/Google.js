import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
 class App extends Component {
  state = {
    token: null
  }
   componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.setState({ token });
    }
  }
   handleGoogleResponse = async (response) => {
    try {
      const userId = response.profileObj.id;
      const tokenId = response.tokenId;
      const googleResponse = await fetch(`/auth/google/callback?tokenId=${tokenId}`);
      const data = await googleResponse.json();
      const token = data.token;
      // Salva il token nel local storage
      localStorage.setItem('token', token);
      // Imposta lo stato del componente con il token
      this.setState({ token });
      // Redirect all'utente alla home page o alla pagina successiva
      window.location.href = 'http://localhost:3000/Home';
    } catch (error) {
      console.error('Errore durante l\'autenticazione:', error);
      const handleGoogleLoginFailure = (error) => {
        console.log(error);
      };
      // Mostra un messaggio di errore all'utente
    }
  }
   render() {
    const { token } = this.state;
     return (
      <div className="App" align="center">
        {token ? (
          <h5>Utente autenticato</h5>
        ) : (
          <div>
            <GoogleLogin
              clientId={process.env.GOOGLE_CLIENT_ID}
              onSuccess={pass}
              onFailure={fail}
              buttonText="LOGIN WITH GOOGLE"
              className="google-login"
              redirectUri="http://localhost:5050/auth/google/callback"
              cookiePolicy={'single_host_origin'}
            />
          </div>
        )}
        <br />
        <br />
      </div>
    );
  }
}
 export default App;