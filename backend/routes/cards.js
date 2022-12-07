const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const { urlSchema, checkIdSchema, infoTextSchema } = require('../validators/general');

const {
  getCards, deleteCards, createCard, putLike, deleteLike,
} = require('../controllers/cards');

router.get('/', getCards);

router.delete('/:cardId', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: checkIdSchema,
  }),
}), deleteCards);

router.post('/', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: infoTextSchema.required(),
    link: urlSchema.required(),
  }),
}), createCard);

router.put('/:cardId/likes', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: checkIdSchema,
  }),
}), putLike);

router.delete('/:cardId/likes', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: checkIdSchema,
  }),
}), deleteLike);

module.exports = router;
