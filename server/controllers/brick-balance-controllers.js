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
        res.json({ setsGroupArray, items1, items2 });
    });
}

const legoPiratesShipBrickList = (req, res) => {
    const setNumber = req.params.setNumber;
    const qPramas = [setNumber, setNumber, setNumber, setNumber, setNumber, setNumber];

    const q = `
    SELECT img_pathname,
        price,
        model_id,
        element_id,
        s6286.quantity as set_6286_q,
        s10040.quantity as set_10040_q,
        s10210.quantity as set_10210_q,
        s4195.quantity as set_4195_q,
        s6243.quantity as set_6243_q,
        s6274.quantity as set_6274_q,
        (
            ifnull(s6286.quantity, 0) + ifnull(s10040.quantity, 0) + ifnull(s10210.quantity, 0) + ifnull(s4195.quantity, 0) + ifnull(s6243.quantity, 0) + ifnull(s6274.quantity, 0)
        ) as total_q,
        s6286.lego_set_id,
        s10040.lego_set_id,
        s10210.lego_set_id,
        s4195.lego_set_id,
        s6243.lego_set_id,
        s6274.lego_set_id,
        description
        FROM brick
        LEFT JOIN (
            SELECT brick.element_id as brick_id,
                lego_set_parts.quantity as quantity,
                lego_set_parts.lego_set_id as lego_set_id
            FROM lego_set_parts
                LEFT JOIN brick ON lego_set_parts.brick_id = brick.element_id
            WHERE lego_set_parts.lego_set_id = "6286"
            ORDER BY brick.description
        ) as s6286 ON s6286.brick_id = brick.element_id
        LEFT JOIN (
            SELECT brick.element_id as brick_id,
                lego_set_parts.quantity as quantity,
                lego_set_parts.lego_set_id as lego_set_id
            FROM lego_set_parts
                LEFT JOIN brick ON lego_set_parts.brick_id = brick.element_id
            WHERE lego_set_parts.lego_set_id = "10040"
            ORDER BY brick.description
        ) as s10040 ON s10040.brick_id = brick.element_id
        LEFT JOIN (
            SELECT brick.element_id as brick_id,
                lego_set_parts.quantity as quantity,
                lego_set_parts.lego_set_id as lego_set_id
            FROM lego_set_parts
                LEFT JOIN brick ON lego_set_parts.brick_id = brick.element_id
            WHERE lego_set_parts.lego_set_id = "10210"
            ORDER BY brick.description
        ) as s10210 ON s10210.brick_id = brick.element_id
        LEFT JOIN (
            SELECT brick.element_id as brick_id,
                lego_set_parts.quantity as quantity,
                lego_set_parts.lego_set_id as lego_set_id
            FROM lego_set_parts
                LEFT JOIN brick ON lego_set_parts.brick_id = brick.element_id
            WHERE lego_set_parts.lego_set_id = "4195"
            ORDER BY brick.description
        ) as s4195 ON s4195.brick_id = brick.element_id
        LEFT JOIN (
            SELECT brick.element_id as brick_id,
                lego_set_parts.quantity as quantity,
                lego_set_parts.lego_set_id as lego_set_id
            FROM lego_set_parts
                LEFT JOIN brick ON lego_set_parts.brick_id = brick.element_id
            WHERE lego_set_parts.lego_set_id = "6243"
            ORDER BY brick.description
        ) as s6243 ON s6243.brick_id = brick.element_id
        LEFT JOIN (
            SELECT brick.element_id as brick_id,
                lego_set_parts.quantity as quantity,
                lego_set_parts.lego_set_id as lego_set_id
            FROM lego_set_parts
                LEFT JOIN brick ON lego_set_parts.brick_id = brick.element_id
            WHERE lego_set_parts.lego_set_id = "6274"
            ORDER BY brick.description
        ) as s6274 ON s6274.brick_id = brick.element_id
    WHERE (
            s6286.quantity IS NOT NULL
            or s10040.quantity IS NOT NULL
            or s10210.quantity IS NOT NULL
            or s4195.quantity IS NOT NULL
            or s6243.quantity IS NOT NULL
            or s6274.quantity IS NOT NULL
        )
        and (
            s6286.lego_set_id = ?
            or s10040.lego_set_id = ?
            or s10210.lego_set_id = ?
            or s4195.lego_set_id = ?
            or s6243.lego_set_id = ?
            or s6274.lego_set_id = ?
        )
        ORDER BY brick.description;
    `;

    connection.query(q, qPramas, function (err, results) {
        if (err) throw err;

        res.status(200);
        res.json({ items: results });
    });
}

exports.getbrickBalanceBySet = getbrickBalanceBySet;
exports.getbrickBalanceBySetsGoup = getbrickBalanceBySetsGoup;
exports.legoPiratesShipBrickList = legoPiratesShipBrickList;
