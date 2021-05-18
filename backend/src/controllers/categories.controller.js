const { Sequelize } = require('sequelize');
const categoryModel = require('@models/category.model');
const helpers = require('@lib/helpers');

exports.delete = async function (req, res) {
  try {
    // Parse ID param
    const id = Number.parseInt(req.params.id);
    if (Number.isNaN(id)) throw new Error('INVALID_CATEGORY_ID');

    // Execute model method
    const result = await categoryModel.destroy({ where: { id: Number(req.params.id) } }); // result: number, the amount of entries destroyed

    // If we get result = 0, then no post was deleted
    if (!result) throw new Error('CATEGORY_NOT_FOUND');
    else helpers.sendSuccessResponse(res, 'CATEGORY_DELETED', result);
  } catch (error) {
    helpers.sendFailedResponse(res, error, 500);
  }
};

exports.findAll = async function (req, res) {
  try {
    const result = await categoryModel.findAll(); // result: array of categoryModel objects

    helpers.sendSuccessResponse(res, 'CATEGORIES_LIST', result);
  } catch (error) {
    helpers.sendFailedResponse(res, error, 500);
  }
};

exports.create = async function (req, res) {
  try {
    // Get title & content
    const { locale_es, locale_en } = req.body;

    // Execute model method
    const result = await categoryModel.create({ locale_es, locale_en }); // result: object of categoryModel

    // If we get !result, then no category was created
    if (!result) throw new Error('CATEGORY_NOT_CREATED');
    else helpers.sendSuccessResponse(res, 'CATEGORY_CREATED', result);
  } catch (error) {
    helpers.sendFailedResponse(res, error, 500);
  }
};
