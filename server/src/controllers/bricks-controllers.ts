import express, { Request, Response, NextFunction } from 'express'

import connection from "../db_connect"
import queryError from "../middleware/error"

const getBrickCount = (req: Request, res: Response) => {
  const q = "SELECT COUNT(*) AS count FROM brick";
  connection.query(q, function (err: any, results: any) {
    if (err) queryError(err, res);
    const count = results[0].count;
    res.status(200);
    res.json({ message: count });
  });
};

const getBricks = (req: Request, res: Response) => {
  const page: any = req.query.page || 1;
  const limit: any = req.query.limit || 300;
  const colorId = req.query.colorId || null;

  const form = (page - 1) * limit;
  const to = page * limit;
  const pageSQL = page && limit ? `LIMIT ${form}, ${limit}` : "";
  const colorSQL = colorId !== null ? `WHERE color_exact_id = ${colorId}` : '';

  const q = `SELECT * FROM brick ${colorSQL} ${pageSQL}`;
  connection.query(q, function (err: any, results: any) {
    if (err) queryError(err, res);
    const lego_sets = results;
    res.status(200);
    res.json({
      items: lego_sets,
      page: {
        form,
        to,
        count: lego_sets.length
      }
    });
  });
};

const getBrickById = (req: Request, res: Response) => {
  const brickId = req.params.brickId;
  const q = "SELECT * FROM brick WHERE brick.element_id = ?";
  connection.query(q, [brickId], function (error: any, results: any) {
    if (error) queryError(error, res);
    const brick = results;
    res.status(200);
    res.json({ data: brick });
  });
};

const createLegoBrick = async (req: Request, res: Response, next: NextFunction) => {
  const { setNumber, name, description } = req.body;
  const setData = [[setNumber, name, description]];
  const setQuery =
    "INSERT IGNORE INTO lego_sets (set_number, name, description) VALUES ?";
  connection.query(setQuery, [setData], function (error: any, result: any) {
    res.status(200);
    res.json({ data: result });
  });
};

const updateLegoBrickQuantity = async (req: Request, res: Response, next: NextFunction) => {
  const { elementId } = req.params;
  const { quantityTotal } = req.body;
  const setData = [[quantityTotal], [elementId]];
  const setQuery = "UPDATE  brick  SET quantity_total = ? WHERE element_id = ?";
  connection.query(setQuery, setData, function (error: any, result: any) {
    res.status(200);
    res.json({ message: result.message });
  });
};

export default {
  getBrickCount,
  getBricks,
  getBrickById,
  createLegoBrick,
  updateLegoBrickQuantity
}
