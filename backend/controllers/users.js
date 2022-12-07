const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/NotFoundError');
const EmailIsTakenError = require('../errors/EmailIsTakenError');
const BadRequestError = require('../errors/BadRequestError');
const User = require('../models/users');

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((result) => {
      if (!result) {
        throw new NotFoundError('Пользователя с указанным id не существует');
      } else { res.send(result); }
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      const user = new User({
        name, about, avatar, email, password: hash,
      });
      user
        .save()
        .then((result) => {
          const response = result.toObject();
          delete response.password;
          res.send(response);
        })
        .catch((err) => {
          if (err.code === 11000) {
            next(new EmailIsTakenError());
          } else if (err.name === 'ValidationError') {
            next(new BadRequestError('Некорректные данные при создании пользователя'));
          } else next(err);
        });
    })
    .catch(next);
};

module.exports.changeAvatar = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user.id,
    { avatar: req.body.avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((result) => {
      if (!result) {
        throw new NotFoundError('Пользователя с указанным id не существует');
      } else {
        res.send(result);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные при изменении аватара'));
      } else { next(err); }
    });
};

module.exports.changeProfile = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user.id,
    { name: req.body.name, about: req.body.about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((result) => {
      if (!result) {
        throw new NotFoundError('Пользователя с указанным id не существует');
      } else {
        res.send(result);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else { next(err); }
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user.id)
    .then((result) => {
      if (!result) {
        throw new NotFoundError('Пользователя с указанным id не существует');
      } else { res.send(result); }
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        });
      res.send({ id: user._id, token });
    })
    .catch(next);
};
