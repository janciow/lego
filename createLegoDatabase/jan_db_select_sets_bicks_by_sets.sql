use jan_db;
--  SELECT brick.img_pathname  ,brick.model_id, lego_set_parts.quantity FROM lego_set_parts
-- LEFT JOIN brick 
-- ON lego_set_parts.brick_id = brick.element_id
-- WHERE lego_set_parts.lego_set_id = "10210"
-- ORDER BY brick.description;

SELECT * 
FROM 
( SELECT brick.img_pathname  ,brick.model_id, lego_set_parts.quantity FROM lego_set_parts
LEFT JOIN brick
ON lego_set_parts.brick_id = brick.element_id
WHERE lego_set_parts.lego_set_id = "10210"
ORDER BY brick.description
limit  10 ) as a
 join
 ( SELECT brick.img_pathname  ,brick.model_id, lego_set_parts.quantity FROM lego_set_parts
LEFT JOIN brick
ON lego_set_parts.brick_id = brick.element_id
WHERE lego_set_parts.lego_set_id = "10040"
ORDER BY brick.description
limit  10 ) as b

ON a.model_id = b.model_id;

