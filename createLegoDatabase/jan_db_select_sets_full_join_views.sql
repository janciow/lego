use jan_db;

CREATE OR REPLACE VIEW t1 AS (
        SELECT brick.img_pathname,
            brick.model_id,
            lego_set_parts.quantity as s10210_q
        FROM lego_set_parts
            LEFT JOIN brick ON lego_set_parts.brick_id = brick.element_id
        WHERE lego_set_parts.lego_set_id = "10210"
        ORDER BY brick.description
        limit 10
    );
    
 CREATE OR REPLACE VIEW t2 AS (
        SELECT brick.img_pathname,
            brick.model_id,
            lego_set_parts.quantity as s10040_q
        FROM lego_set_parts
            LEFT JOIN brick ON lego_set_parts.brick_id = brick.element_id
        WHERE lego_set_parts.lego_set_id = "10040"
        ORDER BY brick.description
        limit 10
    );

SELECT * 
FROM  t1
    LEFT JOIN  t2 ON t1.model_id = t2.model_id
UNION ALL
SELECT *
FROM  t1
    RIGHT JOIN  t2 ON t1.model_id = t2.model_id
WHERE t1.model_id IS NULL