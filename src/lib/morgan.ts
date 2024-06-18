import { Application } from "express";
import morgan from "morgan";

export const setupMorgan = (app: Application) => {
  app.use(morgan('tiny'));
}