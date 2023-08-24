const express = require("express");
const path = require("path");
const mainRoutes = require("./routes/main.js");

const app = express();

app.set("view engine", "ejs");

app.use(express.static(path.resolve(__dirname, "./public")));

app.use("/",mainRoutes);
/*rutas
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/views/index.html"));
});

app.get('/register', (req,res)=>{
  res.sendFile(__dirname + '/views/register.html');
});

app.get('/login', (req,res)=>{
  res.sendFile(__dirname + '/views/login.html');
});
app.get("/productcart", function (req, res) {
  res.sendFile(path.join(__dirname, "/views/productcart.html"));
});*/
app.listen(3020, () => {
  console.log("Success");
});