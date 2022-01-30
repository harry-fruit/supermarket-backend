import express, { NextFunction, Request, Response } from "express";
import { userRouter } from "./modules/user/router";
import { DatabaseConnection } from "./database/database";
import { orderRouter } from "./modules/Order/router";
import 'express-async-errors';

const app = express();

const port: number = 3000;

//Routers Config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routers
app.use( (error:any, request:Request, response: Response, next: NextFunction) => {
    console.error(error.stack);
    response
        .status(500)
        .send('Something broke!');
});
app.use("/user", userRouter);
app.use("/order", orderRouter);

//DB Config
DatabaseConnection();

app.listen(port, () => `running on port ${port}`);
