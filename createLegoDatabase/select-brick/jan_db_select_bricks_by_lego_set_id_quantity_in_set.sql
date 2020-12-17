use jan_db;
SELECT lego_set_parts.lego_set_id,
	lego_set_parts.brick_id,
	lego_set_parts.quantity,
	color_exact_id,
	category,
	element_id,
	model_id,
	price,
	description,
	img_pathname,
	quantity_total,
	lego_set_parts.quantity_in_set,
	lsp.quantity_in_sets_total as quantity_in_sets_total,
	(quantity_total - quantity_in_sets_total) as quantity_free_bricks
FROM lego_set_parts
	LEFT JOIN brick ON lego_set_parts.brick_id = brick.element_id
	LEFT JOIN (
		SELECT SUM(quantity_in_set) as quantity_in_sets_total,
			brick_id
		FROM lego_set_parts
		group by brick_id
	) as lsp ON lsp.brick_id = lego_set_parts.brick_id
WHERE lego_set_parts.lego_set_id = "10210"
ORDER BY brick.description;