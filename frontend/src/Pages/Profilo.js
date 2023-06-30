
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Form, Button } from 'react-bootstrap';

function DataForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formHistory, setFormHistory] = useState([]);
  const [userData, setUserData] = useState(null); // Stato per i dati utente
  const [isLoading, setIsLoading] = useState(true); // Stato per il caricamento dei dati

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5050/chat', formData);
      console.log(response.data);
      setFormHistory([...formHistory, formData]); // Aggiungi i dati del form alla cronologia
      // Aggiorna l'interfaccia utente o esegui altre azioni
    } catch (error) {
      console.error('Errore nell\'invio dei dati:', error);
    }
  };

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_CLIENT_SECRET}`,
        },
      });
      setUserData(response.data);
    } catch (error) {
      console.error('Errore nel recupero dei dati utente da GitHub:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
   return (
    <>
      <Navbar />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Inserisci il tuo nome"
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Inserisci la tua email"
          />
        </Form.Group>
        <Form.Group controlId="message">
          <Form.Label>Messaggio</Form.Label>
          <Form.Control
            as="textarea"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Inserisci il tuo messaggio"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Invia
        </Button>
        <Button onClick={fetchUserData}>Aggiorna dati</Button>
      <div className="form-history">
        {/* ... */}
      </div>
      {isLoading ? (
        <p>Caricamento dei dati...</p>
      ) : userData ? (
        <div className="user-data">
          <h3>Dati utente da GitHub</h3>
          <p>
            <strong>Username:</strong> {userData.login}
          </p>
          <p>
            <strong>Nome completo:</strong> {userData.name}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          {/* Altre informazioni utente da GitHub */}
        </div>
      ) : (
        <p>Non sono stati trovati dati utente.</p>
      )}
      </Form>
      <div className="form-history">
        <h3>Cronologia</h3>
        <ul>
          {formHistory.map((form, index) => (
            <li key={index}>
              <strong>Nome:</strong> {form.name}
              <br />
              <strong>Email:</strong> {form.email}
              <br />
              <strong>Messaggio:</strong> {form.message}
            </li>
          ))}
        </ul>
      </div>
      {userData && (
        <div className="user-data">
          
        </div>
      )}
    </>
  );
}
 export default DataForm;