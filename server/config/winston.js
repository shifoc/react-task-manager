const winston = require('winston');
const split = require('split');
const httpContext = require('express-http-context');

const colorizer = winston.format.colorize();
const winstonLogger = (module) => {
    const filename = module.replace(process.cwd(), '');
    const logger = winston.createLogger({
        level: process.env.LOG_LEVEL || 'info',
        levels: {
            error: 0,
            warn: 1,
            info: 2,
            verbose: 3,
            debug: 4
        },
        handleExceptions: true,
        json: false,
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.simple(),
            winston.format.errors({ stack: true }),
            winston.format.printf(
                (msg) =>
                    `${colorizer.colorize(msg.level, `${msg.timestamp} - ${msg.level}`)} - ${filename ? `[${filename}]` : ''
                    } - ${httpContext.get('correlationId')
                        ? `${httpContext.get('correlationId')} - `
                        : ''
                    }${msg.message}${msg.stack ? `${msg.stack}` : ''}${msg.durationMs && msg.durationMs > 0 ? ` - ${msg.durationMs} ms` : ''}`
            )
        ),
        transports: [new winston.transports.Console()],
        exitOnError: false // do not exit on handled exceptions
    });

    winston.addColors({
        error: 'red',
        warn: 'yellow',
        info: 'magenta',
        debug: 'green',
        verbose: 'green'
    });

    // create a stream object with a 'write' function that will be used by `morgan`
    logger.stream = split().on('data', (message) => {
        logger.info(message);
    });

    return logger;
};

module.exports = winstonLogger;
