const { Sequelize } = require('sequelize');
const postModel = require('@models/post.model');
const helpers = require('@lib/helpers');

exports.delete = async function (req, res) {
  try {
    // Parse ID param
    const id = Number.parseInt(req.params.id);
    if (Number.isNaN(id)) throw new Error('INVALID_POST_ID');

    // Execute model method
    const result = await postModel.destroy({ where: { id: Number(req.params.id) } }); // result: number, the amount of entries destroyed

    // If we get result = 0, then no post was deleted
    if (!result) throw new Error('POST_NOT_FOUND');
    else helpers.sendSuccessResponse(res, 'POST_DELETED', result);
  } catch (error) {
    helpers.sendFailedResponse(res, error, 500);
  }
};

exports.findAll = async function (req, res) {
  try {
    const result = await postModel.findAll({ include: 'category' }); // result: array of postModel objects

    helpers.sendSuccessResponse(res, 'POSTS_LIST', result);
  } catch (error) {
    helpers.sendFailedResponse(res, error, 500);
  }
};

exports.update = async function (req, res) {};

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
    const result = await postModel.create({ title, content, categoryId }, { include: 'category' }); // result: object of postModel

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

exports.findOne = async function (req, res) {
  try {
    // Parse ID param
    const id = Number.parseInt(req.params.id);
    if (Number.isNaN(id)) throw new Error('INVALID_POST_ID');

    // Execute model method
    const result = await postModel.findOne({ where: { id: Number(req.params.id) }, include: 'category' }); // result: object of postModel

    // If we get !result, then no post was found
    if (!result) throw new Error('POST_NOT_FOUND');
    else helpers.sendSuccessResponse(res, 'POST_FOUND', result);
  } catch (error) {
    helpers.sendFailedResponse(res, error, 500);
  }
};
