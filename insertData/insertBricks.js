const mysql = require('mysql');
const fs = require('fs');
const getImages = require('./insertBricks/getImages');
const prepereBrickData = require('./insertBricks/prepereBrickData');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1qaz2wsx',
    database: 'jan_db'
});

const colorQuery = "INSERT IGNORE INTO color_exact (id,name,color_family_id) VALUES ?"
const brickQuery = "INSERT IGNORE INTO brick (color_exact_id, category, element_id, model_id, price, description, img_pathname) VALUES ?" //[ 49, 'Y910', 4144012, 3958, 2.29]
const legoSets = ['6286', '10040', '10210'];




legoSets.forEach(legotSetNumber => {

    // getImages(legotSetNumber);

    let legoSetBrickModel = JSON.parse(fs.readFileSync(`${legotSetNumber}.json`));

    const { colors, brickData } = prepereBrickData(legoSetBrickModel[legotSetNumber])

    connection.query(colorQuery, [colors], function (error, result) {
        if (error) throw error;
        // console.log(result);
    });

    connection.query(brickQuery, [brickData], function (error, result) {
        if (error) {
            console.log('this.sql', this.sql); //command/query
            console.log(error);
        }
        console.log(result);
    });


});


connection.end();