import express, { Application, NextFunction, Request, Response } from "express";

export const setupCORS = (app: Application) => {
  app.use((_: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ORIGIN);
    res.setHeader('Access-Control-Allow-Headers', process.env.CORS_HEADERS);
    res.setHeader('Access-Control-Allow-Methods', process.env.CORS_METHODS);
    next();
  });
};

export const setupParser = (app: Application) => {
  app.use(express.json());
}