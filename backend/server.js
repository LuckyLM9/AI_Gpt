const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");
const github = require("./routes/GitAuth0");
const axios = require("axios");
 const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const secretKey = process.env.SECRET_KEY;
const MyData = require("../backend/models/User.js");
 const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/", github);
 const configuration = new Configuration({
  apiKey: process.env.CHATBOT_KEY,
});
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
 app.post("/register", async (req, res) => {
  const { nome, cognome, email, password } = req.body;
  try {
    const user = await User.create({ nome, cognome, email, password });
    res.send({ message: "Registrazione avvenuta con successo" });
  } catch (error) {
    res.status(500).send({ message: "Errore interno del server" });
  }
});
 app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.send({ message: "Accesso effettuato con successo" });
    } else {
      res.status(401).send({ message: "Email o password non validi" });
    }
  } catch (error) {
    res.status(500).send({ message: "Errore interno del server" });
  }
});
 app.post("/github/login", async (req, res) => {
  const { code } = req.body;
  try {
    const response = await axios.post("https://github.com/login/oauth/access_token", {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: code,
    });
     const params = new URLSearchParams(response.data);
    const githubToken = params.get("access_token");
     const userResponse = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${githubToken}`
      }
    });
     const userData = userResponse.data;
    res.send({ message: "Accesso GitHub effettuato con successo", userData });
  } catch (error) {
    res.status(401).send({ message: "Codice non valido" });
  }
});
 passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      return done(null, profile);
    }
  )
);
app.post('/userData', (req, res) => {
  // Ottieni i dati inviati nella richiesta
  const formData = req.body;
  res.status(200).json({ message: 'Dati salvati con successo' });
});
 app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
 app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/Home");
  }
);
 const port = 5050;
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
  console.log(`http://localhost:${port}`);
});
 mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'User'
})
.then(() => {
  console.log("Connesso a MongoDB");
})
.catch((error) => {
  console.log("Impossibile connettersi a MongoDB", error);
});