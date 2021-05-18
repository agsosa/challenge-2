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
    const result = await postModel.findAll({ include: 'category' }); // result: array of postModel

    helpers.sendSuccessResponse(res, 'POSTS_LIST', result);
  } catch (error) {
    helpers.sendFailedResponse(res, error, 500);
  }
};

exports.update = async function (req, res) {};

exports.create = async function (req, res) {};

exports.findOne = async function (req, res) {};
