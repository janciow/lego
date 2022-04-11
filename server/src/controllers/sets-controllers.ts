import connection  from "../db_connect"
import  queryError   from "../middleware/error"
import express, { Request, Response, NextFunction } from "express"

const getSets = (req: Request, res: Response) => {
    const q = "SELECT * FROM lego_sets";
    connection.query(q, function (err: any , results: any) {
        if (err) throw err;
        const lego_sets = results;
        res.status(200);
        res.json({ items: lego_sets });
    });
}

const getSetById = (req: Request, res: Response) => {
    const setNumber = req.params.setNumber;
    const q = "SELECT * FROM lego_sets WHERE lego_sets.set_number = ?";
    connection.query(q, [setNumber], function (err: any, results: any) {
        if (err) queryError(err, res);
        const set = results;
        res.status(200);
        res.json({ data: set });
    });
}

const getSetBricksById = (req: Request, res: Response) => {
    const sortBy = req.query.sortBy || '';
    const sortDir = req.query.sortDir || 'ASC';
    const setNumber = req.params.setNumber;

    const q = `
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
    WHERE lego_set_parts.lego_set_id = ?
    ORDER BY brick.description;
    
    `
    connection.query(q, [setNumber], function (err: any, results: any) {
        if (err) queryError(err, res);
        const setBricks = results;
        res.status(200);
        res.json({ items: setBricks });
    });
}

const createLegoSet = async (req: Request, res: Response, next: NextFunction) => {
    const { setNumber, name, description } = req.body;
    const setData = [[setNumber, name, description]]
    const setQuery = "INSERT IGNORE INTO lego_sets (set_number, name, description) VALUES ?";
    connection.query(setQuery, [setData], function (error: any, result: any) {
        res.status(200);
        res.json({ data: result });
    });

}

const updateLegoBrickQuantityInSet = async (req: Request, res: Response, next: NextFunction) => {
    const { elementId, legoSetId } = req.params;   
    const { quantityInSet } = req.body;
    const setData = [[quantityInSet], [legoSetId], [elementId]]
    const setQuery = "UPDATE lego_set_parts SET quantity_in_set = ? WHERE lego_set_id = ? and brick_id = ?";
    connection.query(setQuery, setData, function (error: any, result: any) {
        res.status(200);
        res.json({ message: result.message });
    });
}

export default {
    getSets,
    getSetById,
    getSetBricksById,
    createLegoSet,
    updateLegoBrickQuantityInSet
}
// exports.getSets = getSets;
// exports.getSetById = getSetById;
// exports.getSetBricksById = getSetBricksById;
// exports.createLegoSet = createLegoSet;
// exports.updateLegoBrickQuantityInSet = updateLegoBrickQuantityInSet;