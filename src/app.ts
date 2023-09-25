import express, { Application } from 'express';
import cors from 'cors';
import 'express-async-errors';

import { UserRoutes } from './api/users';
import { notFound } from './middlewares/notFound.middleware';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/v1/users', new UserRoutes().getRoutes());

app.use(notFound);

export default app;
