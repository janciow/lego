
const dotenv = require("dotenv");
const express = require('express');
const bodyParser  = require("body-parser");

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

const setsRoutes = require('./routes/sets-routes');

app.get("/api", (req, res)=>{
    res.status(200);
    res.json({ message: 'ok ok ' });
});

app.use('/api/sets', setsRoutes);

app.listen(8080, function(){
    console.log("Server running on 8080!");
});