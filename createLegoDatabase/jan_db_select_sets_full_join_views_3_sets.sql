use jan_db;
CREATE OR REPLACE VIEW t1 AS (
        SELECT brick.img_pathname as img1,
            brick.model_id as mid1,
            lego_set_parts.quantity as s10210_q
        FROM lego_set_parts
            LEFT JOIN brick ON lego_set_parts.brick_id = brick.element_id
        WHERE lego_set_parts.lego_set_id = "10210"
        ORDER BY brick.description
        limit 10
    );
CREATE OR REPLACE VIEW t2 AS (
        SELECT brick.img_pathname as img2,
            brick.model_id as mid2,
            lego_set_parts.quantity as s10040_q
        FROM lego_set_parts
            LEFT JOIN brick ON lego_set_parts.brick_id = brick.element_id
        WHERE lego_set_parts.lego_set_id = "10040"
        ORDER BY brick.description
        limit 10
    );
CREATE OR REPLACE VIEW t3 AS (
        SELECT brick.img_pathname,
            brick.model_id,
            lego_set_parts.quantity as s6286_q
        FROM lego_set_parts
            LEFT JOIN brick ON lego_set_parts.brick_id = brick.element_id
        WHERE lego_set_parts.lego_set_id = "6286"
        ORDER BY brick.description
        limit 10
    );
--  select * from t1;
--  select * from t2;-- 
select *
from (
        SELECT *
        FROM t1
            LEFT JOIN t2 ON t1.mid1 = t2.mid2
        UNION ALL
        SELECT *
        FROM t1
            RIGHT JOIN t2 ON t1.mid1 = t2.mid2
        WHERE t1.mid1 IS NULL
    ) as tt