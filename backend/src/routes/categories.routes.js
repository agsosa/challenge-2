const express = require('express');
const router = express.Router();
const controller = require('@controllers/categories.controller');

// Get all categories
router.get('/', controller.findAll);

// Create a new category
router.post('/', controller.create);

// Delete a category by id
router.delete('/:id', controller.delete);

module.exports = router;
