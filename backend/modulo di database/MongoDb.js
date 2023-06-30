const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;
const secretKey = process.env.SECRET_KEY;
const MyData = require('../models/User.js');

 app.use(bodyParser.json());
app.use(cors());
 mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connesso al database');
}).catch((error) => {
  console.error('Errore di connessione al database:', error);
});
 const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token mancante' });
  }
  try {
    const decodedToken = jwt.verify(token, secretKey);
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token non valido' });
  }
};
 app.get('/api/data', authenticateUser, async (req, res) => {
  try {
    const data = await MyData.find();
    res.json(data);
  } catch (error) {
    console.error('Errore nella ricerca dei dati:', error);
    res.status(500).json({ message: 'Errore nella ricerca dei dati' });
  }
});
 app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});