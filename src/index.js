const express = require("express");
const path = require("path");
const mainRouter = require("./routes/main");
const methodOverride = require("method-override");
const session = require("express-session");

const app = express();
const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");
const categoriaApiRouter = require("./apis/routes/categoryRoutes");
const productApiRouter = require("./apis/routes/productsRoutes");
const userApiRouter = require("./apis/routes/usersRoutes")

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs")


app.use(express.static(path.resolve(__dirname, "../public")));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(methodOverride("_method"));
app.use(session({
  secret:"Secreto",
  resave: true ,
  saveUninitialized: true 
}));

//rutas
app.use("/",mainRouter);
app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/api", categoriaApiRouter);
app.use("/api", productApiRouter);
app.use("/api", userApiRouter);
app.listen(3020, () => {
  console.log("Success");
});

