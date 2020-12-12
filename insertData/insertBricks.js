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

const set_parts_query = "INSERT IGNORE INTO lego_set_parts (lego_set_id, brick_id, quantity) VALUES ?"

// const legoSets = ['6286', '6285', '10210', '4195', '6243', '6274', '70413'];

const legoSets = ['7675', '7676'];


legoSets.forEach(legotSetNumber => {

    getImages(legotSetNumber);

    let legoSetBrickModel = JSON.parse(fs.readFileSync(`jsons_lego/${legotSetNumber}.json`));

    const { colors, brickData } = prepereBrickData(legoSetBrickModel[legotSetNumber]);
    const setData = [[legoSetBrickModel["setNumber"], legoSetBrickModel["setTitle"], ""]];
    const setPartData = prepereSetsData(legoSetBrickModel[legotSetNumber], legotSetNumber);

    console.log(setPartData);

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
        console.log(result);
    });

    connection.query(set_parts_query, [setPartData], function (error, result) {
        if (error) {
            console.log('this.sql', this.sql); //command/query
            console.log(error);
        }
        console.log(result);
    });


});


connection.end();