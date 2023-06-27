// Importa dipendenze e middleware

const express = require("express");
require('dotenv').config();
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");

// Configura il server ////////////

const app = express();
app.use(bodyParser.json());
app.use(cors())

// Configura l'endpoint OpenAI

const configuration = new Configuration({
  apiKey: process.env.CHATBOT_KEY,
});

//Il file .env è l'autenticazione - il formato è :
// CHATBOT_KEY="la tua API KEY"

const openai = new OpenAIApi(configuration);
app.post("/chat", async (req, res) => {
  const { prompt } = req.body;
  const completion = await openai.createCompletion({
    model: "text-davinci-003", 
    prompt: prompt,
    max_tokens: 2048,
  });
  res.send(completion.data.choices[0].text);
});
// 'prompt' proviene da axios post - da react js state - il suo valore di campo di input o query o domanda

// Avvia il server ////////////////////

const port = 5050;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log(`http://localhost:${port}`);
});