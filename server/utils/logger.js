import fs from 'fs';
import { createLogger, format, transports } from 'winston';
import { isProduction } from '../../config/env';
import { logsDirectory, log, error } from '../../config/paths';

if (!fs.existsSync(logsDirectory)) {
  fs.mkdirSync(logsDirectory);
}

const simple = info => `[${info.timestamp}]${info.level}: ${info.message}`;

export const logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.simple(),
    format.printf(simple)
  ),
  transports: [
    new transports.Stream({
      stream: fs.createWriteStream(error),
      level: 'error'
    }),
    new transports.Stream({
      stream: fs.createWriteStream(log)
    })
  ]
});

if (isProduction) {
  logger.add(
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple(),
        format.printf(simple)
      )
    })
  );
}
