require('dotenv').config();
require('module-alias/register');
const express = require('express');
const database = require('@lib/database');

const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Initialize database & start server
database.initialize().then(() => {
  app.listen(port, () => {
    console.log(`[APPLICATION] Listening on http://localhost:${port}`);
  });
});
