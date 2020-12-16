const connection = require("../../db/db_connect");
const bbQueryBuilder = require("./query-utils/brick-balance");

const getBrickBalanceBySet = (req, res) => {
  const setNumber = req.params.setNumber;
  const q =
    "SELECT brick.img_pathname,  brick.model_id, lego_set_parts.quantity FROM lego_set_parts LEFT JOIN brick ON lego_set_parts.brick_id = brick.element_id WHERE lego_set_parts.lego_set_id = ? ORDER BY brick.description";
  connection.query(q, [setNumber], function (err, results) {
    if (err) throw err;
    const lego_set_brick_balance = results;
    res.status(200);
    res.json({ items: lego_set_brick_balance });
  });
};

const getBrickBalanceBySetsGroup = (req, res) => {
  const setNumber = req.params.setNumber;
  const { setsGroup } = req.query;
  const setsGroupArray = setsGroup.split(",");

  const q =
    "SELECT brick.img_pathname,  brick.model_id, lego_set_parts.quantity FROM lego_set_parts LEFT JOIN brick ON lego_set_parts.brick_id = brick.element_id  WHERE lego_set_parts.lego_set_id = ? ORDER BY brick.description";

  connection.query(`${q};${q}`, setsGroupArray, function (err, results) {
    if (err) throw err;
    const items1 = results[0];
    const items2 = results[1];
    res.status(200);
    res.json({ setsGroupArray, items1, items2 });
  });
};

const legoPiratesShipBrickList = (req, res) => {
  const setNumber = req.params.setNumber;
  const qParams = [
    setNumber,
    setNumber,
    setNumber,
    setNumber,
    setNumber,
    setNumber,
    setNumber,
  ];

  const q = `
	SELECT img_pathname,
		price,
		model_id,
		element_id,
		quantity_total,
		${bbQueryBuilder.bbSelect(['6286','6285','10210', '4195','6243','6274','70413'])}
		brick.description
	FROM brick
		${bbQueryBuilder.bbLeftJoin('6286')}
		${bbQueryBuilder.bbLeftJoin('6285')}
		${bbQueryBuilder.bbLeftJoin('10210')}
		${bbQueryBuilder.bbLeftJoin('4195')}
		${bbQueryBuilder.bbLeftJoin('6243')}
		${bbQueryBuilder.bbLeftJoin('6274')}
		${bbQueryBuilder.bbLeftJoin('70413')}
	WHERE 
		${bbQueryBuilder.bbWhere(['6286','6285','10210', '4195','6243','6274','70413'])}
	ORDER BY brick.description;
    `;

  connection.query(q, qParams, function (err, results) {
    if (err) throw err;

    res.status(200);
    res.json({ items: results });
  });
};

const legoSWCloneShipBrickList = (req, res) => {
  const setNumber = req.params.setNumber;
  const qParams = [setNumber, setNumber, setNumber];

  const q = `
	SELECT img_pathname,
		price,
		model_id,
		element_id,
		quantity_total,
		${bbQueryBuilder.bbSelect(['7675','7676','10195'])}
		brick.description
	FROM brick
		${bbQueryBuilder.bbLeftJoin('7675')}
		${bbQueryBuilder.bbLeftJoin('7676')}
		${bbQueryBuilder.bbLeftJoin('10195')}
	WHERE
		${bbQueryBuilder.bbWhere(['7675','7676','10195'])}
	ORDER BY brick.description;
    `;

  connection.query(q, qParams, function (err, results) {
    if (err) throw err;

    res.status(200);
    res.json({ items: results });
  });
};

exports.getBrickBalanceBySet = getBrickBalanceBySet;
exports.getBrickBalanceBySetsGroup = getBrickBalanceBySetsGroup;
exports.legoPiratesShipBrickList = legoPiratesShipBrickList;
exports.legoSWCloneShipBrickList = legoSWCloneShipBrickList;
