const connection = require("../../db/db_connect");

const getbrickBalanceBySet = (req, res) => {
    const setNumber = req.params.setNumber;
    const q = "SELECT brick.img_pathname,  brick.model_id, lego_set_parts.quantity FROM lego_set_parts LEFT JOIN brick ON lego_set_parts.brick_id = brick.element_id WHERE lego_set_parts.lego_set_id = ? ORDER BY brick.description";
    connection.query(q, [setNumber], function (err, results) {
        if (err) throw err;
        const lego_set_brick_balance = results;
        res.status(200);
        res.json({ items: lego_set_brick_balance });
    });
}

const getbrickBalanceBySetsGoup = (req, res) => {
    const setNumber = req.params.setNumber;
    const { setsGroup } = req.query;
    const setsGroupArray = setsGroup.split(',')

    const q = "SELECT brick.img_pathname,  brick.model_id, lego_set_parts.quantity FROM lego_set_parts LEFT JOIN brick ON lego_set_parts.brick_id = brick.element_id  WHERE lego_set_parts.lego_set_id = ? ORDER BY brick.description";

    connection.query(`${q};${q}`, setsGroupArray, function (err, results) {
        if (err) throw err;
        const items1 = results[0];
        const items2 = results[1];
        res.status(200);
        res.json({ setsGroupArray, items1, items2  });
    });
}

exports.getbrickBalanceBySet = getbrickBalanceBySet;
exports.getbrickBalanceBySetsGoup = getbrickBalanceBySetsGoup;
