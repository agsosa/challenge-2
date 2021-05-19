const { Sequelize } = require('sequelize');

const ALTER_DATABASE = true; // Poner true para actualizar el esquema de la base de datos
const FORCE_DATABASE = false; // Poner true para inicializar la base de datos (ADVERTENCIA: SE BORRARAN TODOS LOS DATOS)
const CREATE_TEST_CATEGORIES = true; // Poner true para inicializar la tabla de categorias con algunas categorias de prueba (solo funciona si la tabla está vacia)

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

    require('@models/relations');

    await sequelize.sync({ alter: ALTER_DATABASE, force: FORCE_DATABASE }); // SYNC EVERYTHING

    // CREATE TEST CATEGORIES
    if (CREATE_TEST_CATEGORIES) {
      const categoryModel = require('@models/category.model');

      try {
        // Check if we already have categories in our categories table
        const categories = await categoryModel.findAll({ limit: 1 });

        if (!categories || categories.length === 0) {
          // Add test categories if we don't have any category yet
          const promises = [];

          console.log('[DB] Creating test categories');

          const testCategories = [
            { locale_es: 'General', locale_en: 'General' },
            { locale_es: 'Deportes', locale_en: 'Sports' },
            { locale_es: 'Turismo', locale_en: 'Tourism' },
            { locale_es: 'Tecnología', locale_en: 'Technology' },
            { locale_es: 'Política', locale_en: 'Politics' },
            { locale_es: 'Entretenimiento', locale_en: 'Entertainment' },
          ];

          testCategories.forEach((cat) => {
            promises.push(categoryModel.create(cat));
          });

          await Promise.allSettled(promises);
        } else console.log('[DB] Test categories will not be created because the categories table is not empty');
      } catch (err) {
        console.error('[DB] An error occured while creating test categories', err);
      }
    }

    console.log('[DB] Connection has been established successfully.');
  } catch (error) {
    console.error('[DB] Unable to connect to the database:', error);
  }
};
