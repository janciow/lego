import dotenv from "dotenv"
import express, { Request, Response, NextFunction } from "express"
import bodyParser from "body-parser"


import setsRoutes  from "./routes/sets-routes"
import brickBalanceRoutes  from"./routes/brick-balance-routes"
import bricksRoutes  from"./routes/bricks-routes"
import colorsRoutes  from"./routes/colors-routes"
import authRoutes  from"./routes/auth"


dotenv.config();

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



app.get("/api", (req, res) => {
  res.status(200);
  res.json({ message: "ok ok " });
});

app.use("/api/sets", setsRoutes);
app.use("/api/brick-balance", brickBalanceRoutes);
app.use("/api/bricks", bricksRoutes);
app.use("/api/colors", colorsRoutes);
app.use("/api/auth", authRoutes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  // console.log(error);
  const status = 500 //error.statusCode || 500;
  const message = error.message;
  // const data = error.data ;
  res.status(status).json({
    message: message,
    // data: data 
  });
});

app.listen(8080, function () {
  console.log("Server running on 8080!");
});
