const categoryModel = require('@models/category.model');
const helpers = require('@lib/helpers');

// DELETE /api/categories/:id
exports.delete = async function (req, res) {
  try {
    await categoryModel.deleteById(req.params.id);
    helpers.sendSuccessResponse(res, 'CATEGORY_DELETED', {});
  } catch (error) {
    helpers.sendFailedResponse(res, error, 500);
  }
};

// GET /api/categories
exports.findAll = async function (req, res) {
  try {
    const result = await categoryModel.findAll();
    helpers.sendSuccessResponse(res, 'CATEGORIES_LIST', result);
  } catch (error) {
    helpers.sendFailedResponse(res, error, 500);
  }
};

// POST /api/categories
exports.create = async function (req, res) {
  try {
    const result = await categoryModel.add(req.body.locale_es, req.body.locale_en);
    helpers.sendSuccessResponse(res, 'CATEGORY_CREATED', result);
  } catch (error) {
    helpers.sendFailedResponse(res, error, 500);
  }
};
