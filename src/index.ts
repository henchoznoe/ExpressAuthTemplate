import express, { Request, Response, NextFunction, Application } from 'express';
import { setupParser } from "./lib/parser";
import { setupMorgan } from "./lib/morgan";
import { setupCORS } from "./lib/cors";
import { setupSwagger } from "./lib/swagger";
import { setupRoutes } from "./routes/routes";
import 'dotenv/config';
import { errorResponse } from "./http/http-responses";

const app: Application = express();

setupParser(app);
setupMorgan(app)
setupCORS(app);
setupSwagger(app);
setupRoutes(app);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  errorResponse(res, err.code || 500, err.message || 'An unknown error occurred...')
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running : http://localhost:${process.env.SERVER_PORT}`);
  console.log(`Swagger running : http://localhost:${process.env.SERVER_PORT}/api-docs`)
});