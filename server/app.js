const express = require('express');

const app = express();
const createError = require('http-errors');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const logger = require('./config/winston')(__filename);

// require authMiddleware
const authMiddleware = require('./authMiddleware');

// require database connection
const dbConnect = require('./db/dbConnect');

const authRouter = require('./routes/auth');
const apiRouter = require('./routes/api');

// execute database connection
dbConnect();

// logger configuration
app.use(
  morgan('combined', {
    stream: logger.stream
  })
);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors());
app.use(helmet());
app.use(compression());

// User Endpoints
app.use('/auth', authRouter);

// Tasks Endpoints
app.use('/api', authMiddleware, apiRouter);

// catch 404 and forward to error handler
app.use((request, response, next) => {
  next(createError(404));
});

// error handler
app.use((error, request, response, next) => {
  response.locals.message = error.message;
  response.locals.error = request.app.get('env') === 'development' ? error : {};
  console.log(error.message, error.stack);
  response.status(error.status || 500);
  response.json({ error });
});

module.exports = app;
