const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
});

exports.instance = sequelize;

exports.initialize = async () => {
  try {
    await sequelize.authenticate();
    // TODO: SYNC MODELS
    console.log('[DATABASE] Connection has been established successfully.');
  } catch (error) {
    console.error('[DATABASE] Unable to connect to the database:', error);
  }
};
