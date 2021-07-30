const express = require('express');
const cors = require('cors');
const connection = require('./db-config');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL
  })
);

app.get('/', (req, res) => {
  res.send("Bienvenue sur l'API du dessin animé Detective Conan");
});

app.get('/characters', (req, res) => {
  connection.query('SELECT * FROM `character`', (err, results) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
