import express, { Request, Response } from "express"

const queryError: any = (err: any, res: Response) => {
    console.log(JSON.stringify(err));

    res.json({
      Error: 1,
      Message: "Error while getting the data from Remote DataBase lego.org",
    });

    return
};

export default queryError
