const { DataTypes, Sequelize } = require('sequelize');
const db = require('@lib/database');
const helpers = require('@lib/helpers');

const TITLE_MIN_LENGTH = 3; // Minimum post title length
const TITLE_MAX_LENGTH = 254; // Maximum post title length

/* 
   Model definition

   NOTE: 
   - id (primary key)
   - createdAt (creation date)
   - updatedAt (modified date)
   - relations i.e. categoryId (foreign keys) fields are added automatically by sequelize
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
  image_url: {
    // The post image's url
    type: DataTypes.STRING,
    allowNull: true,
  },
});

/**
 * Delete a post by ID
 * @param {number} postId - The post ID to delete
 * @return {Promise<number>} Promise that will resolve with the number of deleted entries
 */
model.deleteById = async function (postId) {
  try {
    const id = helpers.validateID(postId);
    if (id === -1) throw new Error('INVALID_POST_ID');

    const result = await model.destroy({ where: { id } }); // Number, amount of destroyed entries

    if (!result) throw new Error('POST_NOT_FOUND');

    return result;
  } catch (error) {
    throw error;
  }
};

/**
 * Get all posts without the content field
 * @return {Promise<Array<postModel>>} Promise that will resolve with an array of postModel objects, without the content field
 */
model.getAllWithoutContent = async function () {
  return model.findAll({
    include: 'category',
    order: [['createdAt', 'DESC']],
    attributes: { exclude: ['categoryId', 'content'] },
  });
};

/**
 * Update a post by ID
 * @param {number} postId - The post ID to update
 * @param {string} title - (Optional) The new title
 * @param {string} content - (Optional) The new content
 * @param {number} category_id - (Optional) The new category id
 * @param {string} imageUrl - (Optional) The new image url
 * @return {Promise<Array<number>>} Promise that will resolve with an array of numbers (?)
 */
// TODO: Add image field
model.updateInfo = async function (postId, title = null, content = null, category_id = null, imageUrl = null) {
  try {
    const id = helpers.validateID(postId);
    if (id === -1) throw new Error('INVALID_POST_ID');

    // Build update params object
    const updateParams = {};

    if (title) updateParams.title = title;
    if (content) updateParams.content = content;
    if (category_id !== null) {
      const categoryId = helpers.validateID(category_id);
      if (categoryId === -1) throw new Error('INVALID_CATEGORY_ID');

      updateParams.categoryId = categoryId;
    }
    if (imageUrl) {
      if (await helpers.validateImageUrl(imageUrl)) updateParams.image_url = imageUrl;
      else throw new Error('INVALID_IMAGE_URL');
    }

    const result = await model.update(updateParams, { where: { id } }); // Number, amount of destroyed entries

    if (!result || result.length === 0 || result[0] === 0) throw new Error('POST_NOT_FOUND');

    return result;
  } catch (error) {
    if (error instanceof Sequelize.ForeignKeyConstraintError && error.fields.includes('categoryId'))
      throw new Error('CATEGORY_NOT_FOUND');
    throw error;
  }
};

/**
 * Create a new post
 * @param {string} title - The post title
 * @param {string} content - The post content
 * @param {number} category_id - The post category id
 * @param {string} image_url - (Optional) The post image url
 * @return {Promise<postModel>} Promise that will resolve with an object of postModel
 */
model.add = async function (title, content, category_id, image_url) {
  try {
    const categoryId = helpers.validateID(category_id);
    if (categoryId === -1) throw new Error('INVALID_CATEGORY_ID');

    // Validate title, content, image url
    if (!title) throw new Error('EMPTY_TITLE_NOT_ALLOWED');
    if (!content) throw new Error('EMPTY_CONTENT_NOT_ALLOWED');
    if (image_url) {
      const isValidImageUrl = await helpers.validateImageUrl(image_url);
      if (!isValidImageUrl) throw new Error('INVALID_IMAGE_URL');
    }

    const result = await model.create({ title, content, categoryId, image_url }); // result: object of postModel

    if (!result) throw new Error('POST_NOT_CREATED');

    // Add our category object manually
    result.dataValues.category = await result.getCategory();
    delete result.dataValues.categoryId;

    return result;
  } catch (error) {
    if (error instanceof Sequelize.ForeignKeyConstraintError && error.fields.includes('categoryId'))
      throw new Error('CATEGORY_NOT_FOUND');
    throw error;
  }
};

/**
 * Get a post by id
 * @param {number} postId - The post id
 * @return {Promise<postModel>} Promise that will resolve with an object of postModel
 */
model.getById = async function (postId) {
  try {
    const id = helpers.validateID(postId);
    if (id === -1) throw new Error('INVALID_POST_ID');

    const result = await model.findOne({
      where: { id },
      include: 'category',
      attributes: { exclude: ['categoryId'] },
    }); // result: object of postModel

    if (!result) throw new Error('POST_NOT_FOUND');
    else return result;
  } catch (error) {
    throw error;
  }
};

module.exports = model;
