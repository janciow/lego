const connection = require("../../db/db_connect");

const getColors = (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 300;


  const form = (page - 1) * limit;
  const to = page * limit;
  const pageSQL = page && limit ? `LIMIT ${form}, ${limit}` : "";

  const q = `SELECT * FROM color_exact WHERE name IS NOT NULL ${pageSQL}`;
  connection.query(q, function (err, results) {
    if (err) queryError(err, res);
    const lego_colors = results;
    res.status(200);
    res.json({
      items: lego_colors, 
      page: {
        form,
        to,
        count: lego_colors.length
      }
    });
  });
};


exports.getColors = getColors;

