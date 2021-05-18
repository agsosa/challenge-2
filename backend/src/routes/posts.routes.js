const express = require('express');
const router = express.Router();
const controller = require('@controllers/posts.controller');

// Get all posts
router.get('/', controller.findAll);

// Get a single post by id
// router.get('/:id', controller.findOne);

// Create a new post
// router.post('/', controller.create);

// Update a post by id
// router.patch('/:id', controller.update);

// Delete a transaction by id
router.delete('/:id', controller.delete);

module.exports = router;
