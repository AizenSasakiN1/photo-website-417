const express = require("express");
const app = express();
const cors = require("cors");
const pool = require('./config/db')

app.use(cors());
app.use(express.json());


app.get("/users", );

app.post("/signup", );

app.post("/login", );

// PHOTOS APIs
app.post("/photos", );

app.get("/photos", );

app.post("/like", );


const port = 4000;
app.listen(port, () => {
  console.log(`Server ${port}-portda ishga tushdi"`);
});
