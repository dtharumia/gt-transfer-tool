require('dotenv').config()

const express = require("express");
let cors = require("cors");

const app = express();
const firebase = require('../src/firebase/firebase_utils.js');
const PORT = process.env.EXPRESS_PORT

app.use(cors());

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
    
  });
  
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });