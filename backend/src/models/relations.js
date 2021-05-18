const postModel = require('@models/post.model');
const categoryModel = require('@models/category.model');

// Model relations
postModel.belongsTo(categoryModel, { as: 'category' });
categoryModel.hasMany(postModel, { as: 'posts' });
