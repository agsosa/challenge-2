const { Sequelize } = require('sequelize');
const postModel = require('@models/post.model');
const helpers = require('@lib/helpers');

// DELETE api/posts/:id
exports.delete = async function (req, res) {
  try {
    // Parse ID param
    const id = Number.parseInt(req.params.id);
    if (Number.isNaN(id)) throw new Error('INVALID_POST_ID');

    // Execute model method
    const result = await postModel.destroy({ where: { id: Number(req.params.id) } }); // result: number, the amount of entries destroyed

    // If we get result = 0, then no post was deleted
    if (!result) throw new Error('POST_NOT_FOUND');
    else helpers.sendSuccessResponse(res, 'POST_DELETED', {});
  } catch (error) {
    helpers.sendFailedResponse(res, error, 500);
  }
};

// GET api/posts
exports.findAll = async function (req, res) {
  try {
    const result = await postModel.findAll({ include: 'category', attributes: { exclude: ['categoryId', 'content'] } }); // result: array of postModel objects

    helpers.sendSuccessResponse(res, 'POSTS_LIST', result);
  } catch (error) {
    helpers.sendFailedResponse(res, error, 500);
  }
};

// PATCH api/posts/:id
exports.update = async function (req, res) {
  try {
    // Parse post ID param
    const postId = Number.parseInt(req.params.id);
    if (Number.isNaN(postId)) throw new Error('INVALID_POST_ID');

    // Build update params object
    const updateParams = {};

    // Get title & content
    const { title, content, category_id } = req.body;
    if (title) updateParams.title = title;
    if (content) updateParams.content = content;

    if (category_id) {
      const categoryId = Number.parseInt(req.body.category_id);
      if (Number.isNaN(categoryId)) throw new Error('INVALID_CATEGORY_ID');

      updateParams.categoryId = categoryId;
    }

    // TODO: Add image field param

    // Execute model method
    const result = await postModel.update(updateParams, { where: { id: postId } }); // result: array of numbers

    // If we get !result, then no post was created
    if (!result || result.length === 0 || result[0] === 0) throw new Error('POST_NOT_FOUND');
    else {
      helpers.sendSuccessResponse(res, 'POST_UPDATED', {});
    }
  } catch (error) {
    if (error instanceof Sequelize.ForeignKeyConstraintError && error.fields.includes('categoryId')) {
      error = 'CATEGORY_NOT_FOUND';
    }

    helpers.sendFailedResponse(res, error, 500);
  }
};

// POST api/posts
exports.create = async function (req, res) {
  try {
    // Parse category ID
    const categoryId = Number.parseInt(req.body.category_id);
    if (Number.isNaN(categoryId)) throw new Error('INVALID_CATEGORY_ID');

    // Get title & content
    const { title, content } = req.body;
    if (!title) throw new Error('EMPTY_TITLE_NOT_ALLOWED');
    if (!content) throw new Error('EMPTY_CONTENT_NOT_ALLOWED');

    // TODO: Accept image param

    // Execute model method
    const result = await postModel.create({ title, content, categoryId }); // result: object of postModel

    result.dataValues.category = await result.getCategory();
    delete result.dataValues.categoryId;

    // If we get !result, then no post was created
    if (!result) throw new Error('POST_NOT_CREATED');
    else helpers.sendSuccessResponse(res, 'POST_CREATED', result);
  } catch (error) {
    if (error instanceof Sequelize.ForeignKeyConstraintError && error.fields.includes('categoryId')) {
      error = 'CATEGORY_NOT_FOUND';
    }

    helpers.sendFailedResponse(res, error, 500);
  }
};

// GET /api/posts/:id
exports.findOne = async function (req, res) {
  try {
    // Parse ID param
    const id = Number.parseInt(req.params.id);
    if (Number.isNaN(id)) throw new Error('INVALID_POST_ID');

    // Execute model method
    const result = await postModel.findOne({
      where: { id: Number(req.params.id) },
      include: 'category',
      attributes: { exclude: ['categoryId'] },
    }); // result: object of postModel

    // If we get !result, then no post was found
    if (!result) throw new Error('POST_NOT_FOUND');
    else helpers.sendSuccessResponse(res, 'POST_FOUND', result);
  } catch (error) {
    helpers.sendFailedResponse(res, error, 500);
  }
};
