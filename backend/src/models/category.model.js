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
    // Disable updatedAt, createdAt fields for this model
    timestamps: false,
  }
);

module.exports = model;
