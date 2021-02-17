const connection = require("../../db/db_connect");

const getBrickCount = (req, res) => {
    const q = "SELECT COUNT(*) AS count FROM brick";
    connection.query(q, function (err, results) {
        if (err) throw err;
        const count = results[0].count;
        res.status(200);
        res.json({ message: count });
    });
}

const getBricks = (req, res) => {
    const q = "SELECT * FROM brick";
    connection.query(q, function (err, results) {
        if (err) throw err;
        const lego_sets = results;
      console.log('req.session.isLoggedIn ',req.session.isLoggedIn);  
        res.status(200);
        res.json({ items: lego_sets });
    });
}

const getBrickById = (req, res) => {
    const brickId = req.params.brickId;
    const q = "SELECT * FROM brick WHERE brick.element_id = ?";
    connection.query(q, [brickId], function (error, results) {
        if (error) throw error;
        const brick = results;
        res.status(200);
        res.json({ data: brick });
    });
}

const createLegoBrick = async (req, res, next) => {
    const { setNumber, name, description } = req.body;
    const setData = [[setNumber, name, description]]
    const setQuery = "INSERT IGNORE INTO lego_sets (set_number, name, description) VALUES ?";
    connection.query(setQuery, [setData], function (error, result) {
        res.status(200);
        res.json({ data: result });
    });
}

const updateLegoBrickQuantity = async (req, res, next) => {
    const { elementId } = req.params;   
    const { quantityTotal } = req.body;
    const setData = [[quantityTotal], [elementId]]
    const setQuery = "UPDATE  brick  SET quantity_total = ? WHERE element_id = ?";
    connection.query(setQuery, setData, function (error, result) {
        res.status(200);
        res.json({ message: result.message });
    });
}

exports.getBrickCount = getBrickCount;
exports.getBricks = getBricks;
exports.getBrickById = getBrickById;
exports.createLegoBrick = createLegoBrick;
exports.updateLegoBrickQuantity = updateLegoBrickQuantity;