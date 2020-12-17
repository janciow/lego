use jan_db;
SELECT img_pathname,
	price,
	model_id,
	element_id,
	quantity_total,
	s7675.quantity as set_7675_q,
	s7676.quantity as set_7676_q,
	s7676.quantity as set_10195_q,

	(
		ifnull(s7675.quantity, 0) + ifnull(s7676.quantity, 0) + ifnull(s10195.quantity, 0) 
	) as total_q,
	s7675.lego_set_id,
	s7676.lego_set_id,
	s10195.lego_set_id,
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
		LEFT JOIN (
		SELECT brick.element_id as brick_id,
			lego_set_parts.quantity as quantity,
			lego_set_parts.lego_set_id as lego_set_id
		FROM lego_set_parts
			LEFT JOIN brick ON lego_set_parts.brick_id = brick.element_id
		WHERE lego_set_parts.lego_set_id = "10195"
		ORDER BY brick.description
	) as s10195 ON s10195.brick_id = brick.element_id
WHERE (
		s7675.quantity IS NOT NULL
		or s7676.quantity IS NOT NULL
		or s10195.quantity IS NOT NULL
	)
	and (
		s7675.lego_set_id = "7676"
		or s7676.lego_set_id = "7676"
		or s10195.lego_set_id = "7676"

	)
ORDER BY brick.description;