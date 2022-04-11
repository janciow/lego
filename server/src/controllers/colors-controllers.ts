import express, { Request, Response, NextFunction } from 'express'

import connection from "../db_connect"
import  queryError  from "../middleware/error"

const getColors = (req: Request, res: Response) => {
  const page: any = req.query.page || 1;
  const limit: any = req.query.limit || 300;


  const form: any = (page - 1) * limit;
  const to: any = page * limit;
  const pageSQL = page && limit ? `LIMIT ${form}, ${limit}` : "";

  const q = `SELECT * FROM color_exact WHERE name IS NOT NULL ${pageSQL}`;
  connection.query(q, function (err:any, results: any) {
    if (err) queryError(err, res);
    const lego_colors = results;
    res.status(200);
    res.json({
      items: lego_colors, 
      page: {
        form,
        to,
        count: lego_colors.length
      }
    });
  });
};


export default {
  getColors
} ;

