const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
 require("dotenv").config();
 const app = express();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
 app.get('/auth/google', (req, res) => {
  const redirectUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&response_type=code&scope=openid%20email%20profile`;
  res.redirect(redirectUrl);
});
 app.get('/auth/google/callback', async (req, res) => {
  const code = req.query.code;
  const { tokens } = await client.getToken(code);
  const ticket = await client.verifyIdToken({
    idToken: tokens.id_token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const user = {
    id: payload.sub,
    username: payload.name,
    email: payload.email,
    role: "role",
    authType: "google"
  };
  const token = jwt.sign(user, process.env.SECRET_KEY, {
    expiresIn: '4h'
  });
  const redirectUrl = `http://localhost:3000/Home?token=${encodeURIComponent(token)}`;
  res.redirect(redirectUrl);
});
 app.get('/success', (req, res) => {
  res.status(200).send("Login effettuato correttamente");
});
  

 exports.app = app;