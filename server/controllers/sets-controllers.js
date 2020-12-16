const connection = require("../../db/db_connect");

const getSets = (req, res) => {
    const q = "SELECT * FROM lego_sets";
    connection.query(q, function (err, results) {
        if (err) throw err;
        const lego_sets = results;
        res.status(200);
        res.json({ items: lego_sets });
    });
}

const getSetById = (req, res) => {
    const setNumber = req.params.setNumber;
    const q = "SELECT * FROM lego_sets WHERE lego_sets.set_number = ?";
    connection.query(q, [setNumber], function (error, results) {
        if (error) throw error;
        const set = results;
        res.status(200);
        res.json({ data: set });
    });
}

const getSetBricksById = (req, res) => {
    const sortBy = req.query.sortBy || '';
    const sortDir = req.query.sortDir || 'ASC';
    const setNumber = req.params.setNumber;

    const q = "SELECT * FROM lego_set_parts LEFT JOIN brick ON lego_set_parts.brick_id = brick.element_id WHERE lego_set_parts.lego_set_id = ? ORDER BY brick.description";
    connection.query(q, [setNumber], function (error, results) {
        if (error) throw error;
        const setBricks = results;
        res.status(200);
        res.json({ items: setBricks });
    });
}

const createLegoSet = async (req, res, next) => {
    const { setNumber, name, description } = req.body;
    const setData = [[setNumber, name, description]]
    const setQuery = "INSERT IGNORE INTO lego_sets (set_number, name, description) VALUES ?";
    connection.query(setQuery, [setData], function (error, result) {
        res.status(200);
        res.json({ data: result });
    });

}

const updateLegoBrickQuantityInSet = async (req, res, next) => {
    const { elementId, legoSetId } = req.params;   
    const { quantityInSet } = req.body;
    const setData = [[quantityInSet], [legoSetId], [elementId]]
    const setQuery = "UPDATE lego_set_parts SET quantity_in_set = ? WHERE lego_set_id = ? and brick_id = ?";
    connection.query(setQuery, setData, function (error, result) {
        res.status(200);
        res.json({ message: result.message });
    });
}

exports.getSets = getSets;
exports.getSetById = getSetById;
exports.getSetBricksById = getSetBricksById;
exports.createLegoSet = createLegoSet;
exports.updateLegoBrickQuantityInSet = updateLegoBrickQuantityInSet;