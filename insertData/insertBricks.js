const dotenv = require("dotenv");
dotenv.config();

const fs = require('fs');
const getImages = require('./insertBricks/getImages');
const prepereBrickData = require('./insertBricks/prepereBrickData');
const prepereSetsData = require('./insertBricks/prepereSetsData');
const connection = require('../db/db_connect');


const colorQuery = "INSERT IGNORE INTO color_exact (id,name,color_family_id) VALUES ?"
const brickQuery = "INSERT IGNORE INTO brick (color_exact_id, category, element_id, model_id, price, description, img_pathname) VALUES ?" //[ 49, 'Y910', 4144012, 3958, 2.29]
const setQuery = "INSERT IGNORE INTO lego_sets (set_number, name, description) VALUES ?"
const legoSets = ['6286', '10040', '10210', '4195', '6243', '6274'];




legoSets.forEach(legotSetNumber => {

    // getImages(legotSetNumber);

    let legoSetBrickModel = JSON.parse(fs.readFileSync(`${legotSetNumber}.json`));

    const { colors, brickData } = prepereBrickData(legoSetBrickModel[legotSetNumber])

    const setData = [[legoSetBrickModel["setNumber"], legoSetBrickModel["setTitle"], ""]]


    const setsData = prepereSetsData(legoSetBrickModel[legotSetNumber], legotSetNumber)
    // console.log(setsData);

    connection.query(colorQuery, [colors], function (error, result) {
        if (error) throw error;
        // console.log(result);
    });

    connection.query(brickQuery, [brickData], function (error, result) {
        if (error) {
            console.log('this.sql', this.sql); //command/query
            console.log(error);
        }
        // console.log(result);
    });

    connection.query(setQuery, [setData], function (error, result) {
        if (error) {
            console.log('this.sql', this.sql); //command/query
            console.log(error);
        }
        // console.log(result);
    });


});


connection.end();