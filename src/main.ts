import express from 'express';
import { userRouter } from './modules/user/router';
import { DatabaseConnection } from './database/database';
import { orderRouter } from './modules/order/router';

const app = express();

const port: number = 3000;

//Routers Config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routers
app.use('/user', userRouter);
app.use('/order', orderRouter);

//DB Config
DatabaseConnection();

app.listen(port, () => `running on port ${port}`);