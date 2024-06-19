import { Application } from "express";
import { createLogger, format, transports } from 'winston';
import morgan from "morgan";

export const setupLogger = (app: Application) => {
  app.use(morgan('tiny', {
    stream: {
      write: (message: string) => {
        logger.info(message.trim());
      }
    }
  }));
}

const { combine, timestamp, printf, colorize } = format;

const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}] ${message}`;
});

export const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({
      format: 'DD.MM.YYYY HH:mm:ss'
    }),
    colorize(),
    customFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/all.log' })
  ],
});