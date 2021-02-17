const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const User = require("./models/user");

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use(express.static(__dirname + "/public"));

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

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

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "jan",
          email: "jan@test.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(8080, function () {
      console.log("Server running on 8080!");
    });
  })
  .catch((err) => {
    console.log(err);
  });
