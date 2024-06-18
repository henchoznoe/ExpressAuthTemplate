import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { errorResponse } from "./http/http-responses";
import authRoutes from './routes/auth';

require('dotenv').config();

const app = express();

/* Body in JSON format */
app.use(bodyParser.json());

/* CORS */
app.use((_: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ORIGIN);
  res.setHeader('Access-Control-Allow-Headers', process.env.CORS_HEADERS);
  res.setHeader('Access-Control-Allow-Methods', process.env.CORS_METHODS);
  next();
});

/* Routes */
app.use('/api/auth', authRoutes);
app.use((_: Request, res: Response) => {
  errorResponse(res, 404, 'This route doesn\'t exist...');
});

/* Any errors */
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  errorResponse(res, err.code || 500, err.message || 'An unknown error occurred...')
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running : http://localhost:${process.env.SERVER_PORT}`);
});