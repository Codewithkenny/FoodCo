require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const router = require("./routes/routes");
const requireAuth = require("./middlewares/requireAuth");

// create an express app
const app = express();

// register view engine
app.set("view engine", "ejs");

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// connect to database and start up server
const dbURI = "mongodb://127.0.0.1:27017/foodco";

mongoose
  .connect(dbURI, { useNewURLParser: true })
  .then((result) => {
    console.log("Connected to Database");
    app.listen(3000, () => {
      console.log("Server listening on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });

// routes
app.get("/", (req, res) => {
  res.render("index");
});

// app.get("/login", (req, res) => {
//   res.render("login");
// });

app.use(router);

// app.use((req, res) => {
//   res.render("404");
// });
