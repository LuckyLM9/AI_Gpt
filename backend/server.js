const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");
const User = require("./models/User");
const github = require("./routes/GitAuth0");
const jwt = require('jsonwebtoken');
 // Configura il server
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/", github);

 // Configura l'endpoint OpenAI
const configuration = new Configuration({
  apiKey: process.env.CHATBOT_KEY,
});
const openai = new OpenAIApi(configuration);
 // Genera un token
app.post('/token',  (req, res) => {
  const token = jwt.sign({ user: req.body.user }, process.env.SECRET_KEY);
  res.send({ token });
});
console.log(jwt)
 // Aggiungi un nuovo endpoint per gestire la richiesta di chat
app.post("/chat", async (req, res) => {
  const { prompt } = req.body;
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 2048,
  });
  res.send(completion.data.choices[0].text);
});
 // Aggiungi un nuovo endpoint per gestire la richiesta di login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      // Restituisci un token o qualsiasi altra informazione desideri
      res.send({ message: "Login successful" });
    } else {
      res.status(401).send({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});
 // Aggiungi un nuovo endpoint per aggiornare il profilo utente
app.put("/updateProfile", async (req, res) => {
  const { email, userData } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      // Aggiorna i dati dell'utente
      user.firstName = userData.firstName;
      user.lastName = userData.lastName;
      user.username = userData.username;
      user.city = userData.city;
      user.state = userData.state;
      user.zip = userData.zip;
      // Salva l'utente aggiornato
      await user.save();
      res.send({ message: "User data updated successfully" });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});
 // Avvia il server
const port = 5050;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log(`http://localhost:${port}`);
});
 // Connessione al database MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Failed to connect to MongoDB", error);
  });