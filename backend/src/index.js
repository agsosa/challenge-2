require('dotenv').config();
require('module-alias/register');
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const database = require('@lib/database');
const helpers = require('@lib/helpers');
const routes = require('@routes');

const app = express();
const port = process.env.PORT || 3001;

// Configure middlewares
app.set('trust proxy', 1); // Heroku
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
// app.use(cors({}));

// Configure routes
app.use('/api/posts', routes.posts);
app.use('/api/categories', routes.categories);
app.get('/', (req, res) => {
  res.send('OK');
});

// Show stack trace errors on development environment
if (helpers.env === 'development') {
  app.use(function (err, req, res, next) {
    console.error(err.stack);

    res.status(err.status || 500);

    res.json({
      error: true,
      message: err.message,
      stack: err.stack,
    });
  });
}

// Hide stack trace errors on production environment
app.use(function (err, req, res, next) {
  helpers.sendFailedResponse(res, err.message, err.status || 500);
});

// Handle 404
app.use(function (req, res, next) {
  helpers.sendFailedResponse(res, 'endpoint not found', 404);
});

// Initialize database & start server
database.initialize().then(() => {
  app.listen(port, () => {
    console.log(`[APP] Listening on http://localhost:${port}`);
  });
});
