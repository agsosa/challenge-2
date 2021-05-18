const request = require('request');

exports.env = process.env.NODE_ENV || 'development';

/**
 * Helper function to send an error response
 * @param {object} res - The express response object
 * @param {any} message - The error message/identification
 * @param {number} code - The http status code
 */
exports.sendFailedResponse = (res, message, code) => {
  if (typeof message === 'object') message = message.message;

  return res.status(code).send({
    error: true,
    message,
  });
};

/**
 * Helper function to send an success response
 * @param {object} res - The express response object
 * @param {any} message - The success message/identification
 * @param {any} data - The data object to send back
 */
exports.sendSuccessResponse = (res, message, data) => {
  if (typeof message === 'object') message = message.message;

  return res.status(200).send({
    error: false,
    message,
    data,
  });
};

/**
 * Validate & parse a possible sql id
 * @param {any} postId - The ID to parse & validate
 * @return {number} The parsed id or -1 if the parameter is not a valid id
 */
exports.validateID = (postId) => {
  const id = Number.parseInt(postId);
  if (id == null || id < 0 || Number.isNaN(id)) return -1;
  else return id;
};

/**
 * Check if an URL contains an image (by reading headers content-type)
 * @param {string} imageUrl - The image url to validate
 * @return {Promise<boolean>} Promise that will always resolve with true if the url contains an image, false if not
 */
exports.validateImageUrl = async (imageUrl) => {
  return new Promise((resolve) => {
    request(imageUrl, { method: 'HEAD' }, function (err, res, body) {
      if (res && res.headers && res.headers['content-type'] && res.headers['content-type'].startsWith('image'))
        resolve(true);
      else resolve(false);
    });
  });
};
