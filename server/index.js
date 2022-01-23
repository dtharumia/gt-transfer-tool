require('dotenv').config()

const express = require("express");
let cors = require("cors");

const app = express();
import result from './firebase/firebase_utils';
const PORT = process.env.EXPRESS_PORT

app.use(cors());

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
    console.log
  });
  
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });