require('dotenv').config();
require('module-alias/register');
const express = require('express');
const database = require('@lib/database');
const helpers = require('@lib/helpers');

const app = express();
const port = process.env.PORT || 3001;

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
