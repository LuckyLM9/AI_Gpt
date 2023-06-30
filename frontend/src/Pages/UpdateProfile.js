const UpdateProfile = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
     // Funzione per gestire l'invio del modulo
    const handleSubmit = async (e) => {
      e.preventDefault();
       // Crea un oggetto con i dati del profilo utente
      const userData = {
        firstName,
        lastName,
        username,
        city,
        state,
        zip
      };
       try {
        // Effettua una richiesta PUT per aggiornare il profilo utente
        const response = await axios.put('/updateProfile', { email: 'email@example.com', userData });
        console.log(response.data.message);
         // Resetta i campi del modulo
        setFirstName('');
        setLastName('');
        setUsername('');
        setCity('');
        setState('');
        setZip('');
      } catch (error) {
        console.error(error);
      }
    };
     // Renderizza il modulo di aggiornamento del profilo
    return (
      <form onSubmit={handleSubmit}>
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
        <input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="State" />
        <input type="text" value={zip} onChange={(e) => setZip(e.target.value)} placeholder="ZIP" />
        <button type="submit">Update Profile</button>
      </form>
    );
  };
   export default UpdateProfile;