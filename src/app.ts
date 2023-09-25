import express, { Application } from 'express';
import cors from 'cors';

import { UserRoutes } from './api/users';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/v1/users', new UserRoutes().getRoutes());

export default app;
