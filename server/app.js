const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PATCH, DELETE"
  );
  next();
});

app.use(express.static(__dirname + "/public"));

const setsRoutes = require("./routes/sets-routes");
const brickBalanceRoutes = require("./routes/brick-balance-routes");
const bricksRoutes = require("./routes/bricks-routes");
const authRoutes = require("./routes/auth");

app.get("/api", (req, res) => {
  res.status(200);
  res.json({ message: "ok ok " });
});

app.use("/api/sets", setsRoutes);
app.use("/api/brick-balance", brickBalanceRoutes);
app.use("/api/bricks", bricksRoutes);
app.use("/api/auth", authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(8080, function () {
      console.log("Server running on 8080!");
    });
  })
  .catch((err) => {
    console.log(err);
  });
