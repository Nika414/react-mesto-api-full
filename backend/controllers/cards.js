const NotFoundError = require('../errors/NotFoundError');
const AccessError = require('../errors/AccessError');
const BadRequestError = require('../errors/BadRequestError');
const Card = require('../models/cards');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.deleteCards = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((result) => {
      if (!result) {
        throw new NotFoundError('Карточки с указанным id не существует');
      } else if (result && req.user.id === result.owner.toString()) {
        return result.remove();
      } else {
        throw new AccessError('Вы не можете удалить эту карточку');
      }
    })
    .then((result) => res.send(result))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const card = new Card({ name, link, owner: req.user.id });

  card
    .save()
    .then((result) => res.send(result))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные при создании карточки'));
      } else { next(err); }
    });
};

module.exports.putLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user.id } },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((result) => {
      if (!result) {
        throw new NotFoundError('Карточки с указанным id не существует');
      } else {
        res.send(result);
      }
    })
    .catch(next);
};

module.exports.deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user.id } },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((result) => {
      if (!result) {
        throw new NotFoundError('Карточки с указанным id не существует');
      } else {
        res.send(result);
      }
    })
    .catch(next);
};
