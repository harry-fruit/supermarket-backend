import express, { Router, Request, Response, Express } from 'express';
import { DatabaseConnection } from './database/database';
import { usersRouter } from './modules/users/router';

const app = express();
const router = Router();

const port: number = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', usersRouter);

DatabaseConnection()

app.listen(port, () => `running on port ${port}`);