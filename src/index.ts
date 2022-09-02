import app from "./app";
import { Request, Response } from "express";

app.get("/", (req:Request, res:Response):void => {
    try {
        res.status(200).send("Hello world!");
    } catch(error:any) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});
