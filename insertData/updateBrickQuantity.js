const dotenv = require("dotenv");
dotenv.config();
const fs = require('fs');
const connection = require('../db/db_connect');

let brickData = JSON.parse(fs.readFileSync(`jsons_lego/db_tables_json/brick_table.json`));

brickData.forEach(element => {
    brickQuery = `UPDATE brick SET quantity_total = ${element.quantity_total} WHERE element_id = '${element.element_id}'`;

    connection.query(brickQuery, function (error, result) {
        if (error) {
            console.log('this.sql', this.sql); //command/query
            console.log(error);
        }
    });
});


connection.end();

