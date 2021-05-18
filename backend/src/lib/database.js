const { Sequelize } = require('sequelize');

const ALTER_DATABASE = true; // Poner true para actualizar el esquema de la base de datos
const FORCE_DATABASE = false; // Poner true para inicializar la base de datos (ADVERTENCIA: SE BORRARAN TODOS LOS DATOS)

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
    await sequelize.authenticate(); // CONNECT

    require('@models/relations'); // NEEDED TO SYNC ALL MODELS

    await sequelize.sync({ alter: ALTER_DATABASE, force: FORCE_DATABASE }); // SYNC EVERYTHING

    console.log('[DB] Connection has been established successfully.');
  } catch (error) {
    console.error('[DB] Unable to connect to the database:', error);
  }
};
