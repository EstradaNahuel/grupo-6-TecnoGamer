const express = require("express");
const path = require("path");
const mainRouter = require("./routes/main");
const methodOverride = require("method-override");

const app = express();
const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter")

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs")


app.use(express.static(path.resolve(__dirname, "./public")));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(methodOverride("_method"));

//rutas
app.use("/",mainRouter);
app.use("/products", productRouter);
app.use('/users', userRouter)
app.listen(3020, () => {
  console.log("Success");
});

