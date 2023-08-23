const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

//rutas
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/views/index.html"));
});

app.get('/register', (req,res)=>{
  res.sendFile(__dirname + '/views/register.html');
});

app.get('/login', (req,res)=>{
  res.sendFile(__dirname + '/views/login.html');
});
<<<<<<< HEAD

app.get('/productcart', (req,res)=>{
  res.sendFile(__dirname + '/views/productcart.html');
});

=======
app.get("/productcart", function (req, res) {
  res.sendFile(path.join(__dirname, "/views/productcart.html"));
});
>>>>>>> 6c5909b80d46033311590cfe7aacf8b8b2c08679
app.listen(3020, () => {
  console.log("Success");
});