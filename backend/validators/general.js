const { Joi } = require('celebrate');

const checkIdSchema = Joi.string().hex().length(24);
const urlSchema = Joi.string().regex(/https?:\/\/w{0,3}\.?[a-z0-9\-._~:/?#[@!$&'()*+,;=]*\.[a-z0-9\-._~:/?#[@!$&'()*+,;=]*/);
const infoTextSchema = Joi.string().min(2).max(30);

module.exports = { urlSchema, checkIdSchema, infoTextSchema };
