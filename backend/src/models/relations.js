const postModel = require('@models/post.model');
const categoryModel = require('@models/category.model');

// Model relations
categoryModel.hasMany(postModel, { as: 'category' });
