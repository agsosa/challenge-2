const { DataTypes } = require('sequelize');
const db = require('@lib/database');

/* 
   Model definition

   NOTE: 
   - id (primary key)
   - createdAt (creation date)
   - updatedAt (modified date)
   - relations (foreign keys) fields are added automatically by sequelize
*/
const model = db.instance.define(
  'categories',
  {
    locale_es: {
      // Spanish translation
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'NO_TRANSLATION',
    },
    locale_en: {
      // English translation
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'NO_TRANSLATION',
    },
  },
  {
    timestamps: false, // Disable updatedAt, createdAt fields for this model
  }
);

/**
 * Create a new category
 * @param {string} locale_es - The translated name (spanish)
 * @param {string} locale_en - The translated name (english)
 * @return {Promise<categoryModel>} Promise that will resolve with an object of postModel
 */
model.add = async function (locale_es, locale_en) {
  try {
    const result = await model.create({ locale_es, locale_en }); // result: object of categoryModel

    if (!result) throw new Error('CATEGORY_NOT_CREATED');

    return result;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete a category by ID
 * @param {number} id - The category ID to delete
 * @return {Promise<number>} Promise that will resolve with the number of deleted entries
 */
model.deleteById = async function (categoryId) {
  try {
    // Parse ID param
    const id = Number.parseInt(categoryId);
    if (id == null || id < 0 || Number.isNaN(id)) throw new Error('INVALID_CATEGORY_ID');

    const result = await model.destroy({ where: { id } }); // result: number, the amount of entries destroyed

    // If we get result = 0, then no post was deleted
    if (!result) throw new Error('CATEGORY_NOT_FOUND');

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = model;
