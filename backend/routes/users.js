const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

const { urlSchema, checkIdSchema } = require('../validators/general');
const { infoTextSchema } = require('../validators/general');

const {
  getAllUsers, getUserById, changeAvatar, changeProfile, getCurrentUser,
} = require('../controllers/users');

router.get('/', getAllUsers);

router.get('/me', getCurrentUser);

router.get('/:userId', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: checkIdSchema,
  }),
}), getUserById);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: urlSchema.required(),
  }),
}), changeAvatar);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: infoTextSchema,
    about: infoTextSchema,
  }),
}), changeProfile);

module.exports = router;
