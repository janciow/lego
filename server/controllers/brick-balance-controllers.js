const connection = require("../../db/db_connect");

const getbrickBalanceBySet = (req, res) => {
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

const getbrickBalanceBySetsGoup = (req, res) => {
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
  const qPramas = [
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
	s6286.quantity as set_6286_q,
	s6285.quantity as set_6285_q,
	s10210.quantity as set_10210_q,
	s4195.quantity as set_4195_q,
	s6243.quantity as set_6243_q,
	s6274.quantity as set_6274_q,
	s70413.quantity as set_70413_q,
	(
		ifnull(s6286.quantity, 0) + ifnull(s6285.quantity, 0) + ifnull(s10210.quantity, 0) + ifnull(s4195.quantity, 0) + ifnull(s6243.quantity, 0) + ifnull(s6274.quantity, 0) + ifnull(s70413.quantity, 0)
	) as total_q,
	s6286.lego_set_id,
	s6285.lego_set_id,
	s10210.lego_set_id,
	s4195.lego_set_id,
	s6243.lego_set_id,
	s6274.lego_set_id,
	s70413.lego_set_id,
	brick.description
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
		WHERE lego_set_parts.lego_set_id = "6285"
		ORDER BY brick.description
	) as s6285 ON s6285.brick_id = brick.element_id
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
	LEFT JOIN (
		SELECT brick.element_id as brick_id,
			lego_set_parts.quantity as quantity,
			lego_set_parts.lego_set_id as lego_set_id
		FROM lego_set_parts
			LEFT JOIN brick ON lego_set_parts.brick_id = brick.element_id
		WHERE lego_set_parts.lego_set_id = "70413"
		ORDER BY brick.description
	) as s70413 ON s70413.brick_id = brick.element_id
WHERE (
		s6286.quantity IS NOT NULL
		or s6285.quantity IS NOT NULL
		or s10210.quantity IS NOT NULL
		or s4195.quantity IS NOT NULL
		or s6243.quantity IS NOT NULL
		or s6274.quantity IS NOT NULL
		or s70413.quantity IS NOT NULL
	)
	and (
		s6286.lego_set_id = ?
		or s6285.lego_set_id = ?
		or s10210.lego_set_id = ?
		or s4195.lego_set_id = ?
		or s6243.lego_set_id = ?
		or s6274.lego_set_id = ?
		or s70413.lego_set_id = ?
	)
ORDER BY brick.description;
    `;

  connection.query(q, qPramas, function (err, results) {
    if (err) throw err;

    res.status(200);
    res.json({ items: results });
  });
};

const legoSWCloneShipBrickList = (req, res) => {
  const setNumber = req.params.setNumber;
  const qPramas = [
    setNumber,
    setNumber,
  ];

  const q = `
	SELECT img_pathname,
	price,
	model_id,
	element_id,
	quantity_total,
	s7675.quantity as set_7675_q,
	s7676.quantity as set_7676_q,

	(
		ifnull(s7675.quantity, 0) + ifnull(s7676.quantity, 0) 
	) as total_q,
	s7675.lego_set_id,
	s7676.lego_set_id,
	brick.description
FROM brick
	LEFT JOIN (
		SELECT brick.element_id as brick_id,
			lego_set_parts.quantity as quantity,
			lego_set_parts.lego_set_id as lego_set_id
		FROM lego_set_parts
			LEFT JOIN brick ON lego_set_parts.brick_id = brick.element_id
		WHERE lego_set_parts.lego_set_id = "7675"
		ORDER BY brick.description
	) as s7675 ON s7675.brick_id = brick.element_id
	LEFT JOIN (
		SELECT brick.element_id as brick_id,
			lego_set_parts.quantity as quantity,
			lego_set_parts.lego_set_id as lego_set_id
		FROM lego_set_parts
			LEFT JOIN brick ON lego_set_parts.brick_id = brick.element_id
		WHERE lego_set_parts.lego_set_id = "7676"
		ORDER BY brick.description
	) as s7676 ON s7676.brick_id = brick.element_id
WHERE (
		s7675.quantity IS NOT NULL
		or s7676.quantity IS NOT NULL
	)
	and (
		s7675.lego_set_id = ?
		or s7676.lego_set_id = ?

	)
ORDER BY brick.description;
    `;

  connection.query(q, qPramas, function (err, results) {
    if (err) throw err;

    res.status(200);
    res.json({ items: results });
  });
};

exports.getbrickBalanceBySet = getbrickBalanceBySet;
exports.getbrickBalanceBySetsGoup = getbrickBalanceBySetsGoup;
exports.legoPiratesShipBrickList = legoPiratesShipBrickList;
exports.legoSWCloneShipBrickList = legoSWCloneShipBrickList;
