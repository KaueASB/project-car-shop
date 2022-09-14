import express from 'express';
import 'express-async-errors';

import errorHandler from './middlewares/errorHandler';

import carsRoute from './routes/Cars';

const app = express();
app.use(express.json());

app.use('/cars', carsRoute);

app.use(errorHandler);

export default app;
