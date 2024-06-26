import cors from "cors";
import { Application } from "express";

export const setupCors = (app: Application) => {
  app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: process.env.CORS_METHODS,
    allowedHeaders: process.env.CORS_HEADERS,
  }));
}
