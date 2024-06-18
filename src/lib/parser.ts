import express, { Application } from "express";

export const setupParser = (app: Application) => {
  app.use(express.json());
}