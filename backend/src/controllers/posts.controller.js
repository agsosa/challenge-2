const postModel = require('@models/post.model');
const helpers = require('@lib/helpers');

// DELETE api/posts/:id
exports.delete = async function (req, res) {
  try {
    await postModel.deleteById(req.params.id);
    helpers.sendSuccessResponse(res, 'POST_DELETED', {});
  } catch (error) {
    helpers.sendFailedResponse(res, error, 500);
  }
};

// GET api/posts
exports.findAll = async function (req, res) {
  try {
    const result = await postModel.getAllWithoutContent();
    helpers.sendSuccessResponse(res, 'POSTS_LIST', result);
  } catch (error) {
    helpers.sendFailedResponse(res, error, 500);
  }
};

// PATCH api/posts/:id
exports.update = async function (req, res) {
  try {
    await postModel.updateInfo(req.params.id, req.body.title, req.body.content, req.body.categoryId, req.body.image);
    helpers.sendSuccessResponse(res, 'POST_UPDATED', {});
  } catch (error) {
    helpers.sendFailedResponse(res, error, 500);
  }
};

// POST api/posts
exports.create = async function (req, res) {
  try {
    const result = await postModel.add(req.body.title, req.body.content, req.body.categoryId, req.body.image);
    helpers.sendSuccessResponse(res, 'POST_CREATED', result);
  } catch (error) {
    helpers.sendFailedResponse(res, error, 500);
  }
};

// GET /api/posts/:id
exports.findOne = async function (req, res) {
  try {
    const result = await postModel.getById(req.params.id);
    helpers.sendSuccessResponse(res, 'POST_FOUND', result);
  } catch (error) {
    helpers.sendFailedResponse(res, error, 500);
  }
};
