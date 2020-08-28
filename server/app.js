
const dotenv = require("dotenv");
const express = require('express');
const bodyParser = require("body-parser");

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next()
})

app.use(express.static(__dirname + "/public"));

const setsRoutes = require('./routes/sets-routes');

app.get("/api", (req, res) => {
    res.status(200);
    res.json({ message: 'ok ok ' });
});

app.use('/api/sets', setsRoutes);

app.listen(8080, function () {
    console.log("Server running on 8080!");
});