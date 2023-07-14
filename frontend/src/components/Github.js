import React, { Component, useState} from 'react';
import GitHubLogin from 'react-github-login';

const [username, setusername] = useState();
const [usermail, setusermail] = useState();
const pass =(githubResponse) =>{
  console.log(githubResponse);

  setusername(githubResponse.clientId.json);
}
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
  handleGithubResponse = async (response) => {
    try {
      const code = response.code;
      const githubResponse = await fetch(`/auth/github/callback?code=${code}`);
      const data = await githubResponse.json();
      const token = data.token;
      // Salva il token nel local storage
      localStorage.setItem('token', token);
      // Imposta lo stato del componente con il token
      this.setState({ token });
      // Redirect all'utente alla nhome page o alla pagina successiva
      window.location.href = 'http://localhost:3000/Home';
    } catch (error) {
      console.error('Errore durante l\'autenticazione:', error);
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

            <GitHubLogin
              clientId={process.env.GITHUB_CLIENT_SECRET}
              onSuccess={this.handleGithubResponse}
              buttonText="LOGIN WITH GITHUB"
              className="git-login"
              valid={true}
              redirectUri="http://localhost:5050/auth/github/callback"
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