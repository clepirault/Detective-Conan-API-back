const connection = require("./db-config");
const express = require('express');
const app = express();
app.use(express.json());
const port = process.env.PORT || 8080;

app.get('/', (req, res)=>{
  res.send("Bienvenue sur l'api du dessin animé Detective Conan")
})

app.get('/characters', (req, res)=>{
  connection.query(
    'SELECT * FROM `character`',
    (err, results)=>{
      console.log(results);
      if (err){
        res.status(500).json(err);
      }else{
        res.status(200).json(results);
        
      }
    }
  )
})

app.post('/characters', (req, res)=>{
  const newCharacter = req.body;
  console.log(req.body);
  connection.query(
    'INSERT INTO `character` SET ?', [newCharacter],
    (err)=>{
      if (err){
        res.status(500).json(err);
      }else{
        res.sendStatus(201);
      }
    }
  )
})


app.listen(port, ()=>{
  console.log(`server is running on port ${port}`);
});