use jan_db;
SELECT *
FROM (
        SELECT brick.img_pathname,
            brick.model_id,
            lego_set_parts.quantity
        FROM lego_set_parts
            LEFT JOIN brick ON lego_set_parts.brick_id = brick.element_id
        WHERE lego_set_parts.lego_set_id = "10210"
        ORDER BY brick.description
        limit 10
    ) as t1
    LEFT JOIN (
        SELECT brick.img_pathname,
            brick.model_id,
            lego_set_parts.quantity
        FROM lego_set_parts
            LEFT JOIN brick ON lego_set_parts.brick_id = brick.element_id
        WHERE lego_set_parts.lego_set_id = "10040"
        ORDER BY brick.description
        limit 10
    ) as t2 ON t1.model_id = t2.model_id
UNION ALL
SELECT *
FROM (
        SELECT brick.img_pathname,
            brick.model_id,
            lego_set_parts.quantity
        FROM lego_set_parts
            LEFT JOIN brick ON lego_set_parts.brick_id = brick.element_id
        WHERE lego_set_parts.lego_set_id = "10210"
        ORDER BY brick.description
        limit 10
    ) as t1
    RIGHT JOIN (
        SELECT brick.img_pathname,
            brick.model_id,
            lego_set_parts.quantity
        FROM lego_set_parts
            LEFT JOIN brick ON lego_set_parts.brick_id = brick.element_id
        WHERE lego_set_parts.lego_set_id = "10040"
        ORDER BY brick.description
        limit 10
    ) as t2 ON t1.model_id = t2.model_id
WHERE t1.model_id IS NULL