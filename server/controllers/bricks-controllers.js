const connection = require("../../db/db_connect");
const { queryError } = require("../middleware/error");

const getBrickCount = (req, res) => {
  const q = "SELECT COUNT(*) AS count FROM brick";
  connection.query(q, function (err, results) {
    if (err) queryError(err, res);
    const count = results[0].count;
    res.status(200);
    res.json({ message: count });
  });
};

const getBricks = (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 300;
  const colorId = req.query.colorId || null;

  const form = (page - 1) * limit;
  const to = page * limit;
  const pageSQL = page && limit ? `LIMIT ${form}, ${limit}` : "";
  const colorSQL = colorId !== null ? `WHERE color_exact_id = ${colorId}` : '';

  const q = `SELECT * FROM brick ${colorSQL} ${pageSQL}`;
  connection.query(q, function (err, results) {
    if (err) queryError(err, res);
    const lego_sets = results;
    res.status(200);
    res.json({
      items: lego_sets, 
      page: {
        form,
        to,
        count: lego_sets.length
      }
    });
  });
};

const getBrickById = (req, res) => {
  const brickId = req.params.brickId;
  const q = "SELECT * FROM brick WHERE brick.element_id = ?";
  connection.query(q, [brickId], function (error, results) {
    if (err) queryError(err, res);
    const brick = results;
    res.status(200);
    res.json({ data: brick });
  });
};

const createLegoBrick = async (req, res, next) => {
  const { setNumber, name, description } = req.body;
  const setData = [[setNumber, name, description]];
  const setQuery =
    "INSERT IGNORE INTO lego_sets (set_number, name, description) VALUES ?";
  connection.query(setQuery, [setData], function (error, result) {
    res.status(200);
    res.json({ data: result });
  });
};

const updateLegoBrickQuantity = async (req, res, next) => {
  const { elementId } = req.params;
  const { quantityTotal } = req.body;
  const setData = [[quantityTotal], [elementId]];
  const setQuery = "UPDATE  brick  SET quantity_total = ? WHERE element_id = ?";
  connection.query(setQuery, setData, function (error, result) {
    res.status(200);
    res.json({ message: result.message });
  });
};

exports.getBrickCount = getBrickCount;
exports.getBricks = getBricks;
exports.getBrickById = getBrickById;
exports.createLegoBrick = createLegoBrick;
exports.updateLegoBrickQuantity = updateLegoBrickQuantity;
