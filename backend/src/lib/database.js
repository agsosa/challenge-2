const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
});

// Our sequelize instance
exports.instance = sequelize;

// Async function to connect sequelize with our database.
// Resolves on connection success
exports.initialize = async () => {
  try {
    await sequelize.authenticate();
    // TODO: SYNC MODELS
    console.log('[DB] Connection has been established successfully.');
  } catch (error) {
    console.error('[DB] Unable to connect to the database:', error);
  }
};
