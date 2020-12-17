use jan_db;
-- getSetBricksById
SELECT * FROM lego_set_parts
LEFT JOIN brick
ON lego_set_parts.brick_id = brick.element_id
WHERE lego_set_parts.lego_set_id = "10210"
ORDER BY brick.description;