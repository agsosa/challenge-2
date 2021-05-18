const { DataTypes } = require('sequelize');
const db = require('@lib/database');

const TITLE_MIN_LENGTH = 3; // Minimum post title length
const TITLE_MAX_LENGTH = 254; // Maximum post title length

/* 
   Model definition

   NOTE: 
   - id (primary key)
   - createdAt (creation date)
   - updatedAt (modified date)
   - relations (foreign keys) fields are added automatically by sequelize
*/
const model = db.instance.define('posts', {
  title: {
    // The post title
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'No title',
    validate: {
      len: {
        args: [TITLE_MIN_LENGTH, TITLE_MAX_LENGTH],
        msg: `Title length must be between ${TITLE_MIN_LENGTH} and ${TITLE_MAX_LENGTH}`,
      },
    },
  },
  content: {
    // The post content
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: { msg: `Content must not be empty` },
    },
  },
  image: {
    // The post image
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// Model methods

module.exports = model;
