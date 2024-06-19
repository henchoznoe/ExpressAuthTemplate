import express, { NextFunction, Request, Response } from "express";
import { app } from "../index";

export const setupCORS = () => {
  app.use((_: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ORIGIN);
    res.setHeader('Access-Control-Allow-Headers', process.env.CORS_HEADERS);
    res.setHeader('Access-Control-Allow-Methods', process.env.CORS_METHODS);
    next();
  });
};

export const setupParser = () => {
  app.use(express.json());
}