const express = require("express");
const path = require("path");
const mainRoutes = require("./routes/main.js");
const methodOverride = require("method-override");

const app = express();
const productRouter = require("./routes/productRouter.js");
const userViews = path.join(__dirname, "/views/users");
const productViews = path.join(__dirname, "/views/products");

app.set("view engine", "ejs")
app.set("views", [userViews, productViews]);
app.use(express.static(path.resolve(__dirname, "./public")));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(methodOverride("_method"));

app.use("/",mainRoutes);
app.use("/products", productRouter);
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