const express = require('express');

const app = express();

const process = require('process');

const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const {
  celebrate, Joi, errors, Segments,
} = require('celebrate');
const auth = require('./middlewares/auth');
const { urlSchema, infoTextSchema } = require('./validators/general');
const { emailSchema, passwordSchema } = require('./validators/users');
const NotFoundError = require('./errors/NotFoundError');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const {
  login, createUser,
} = require('./controllers/users');

const allowedOrigins = [
  'https://mmesto.nomoredomains.club/',
  'http://mmesto.nomoredomains.club/',
  'http://api.mmesto.nomoredomains.club/',
  'https://api.mmesto.nomoredomains.club/',
  'http://localhost:3000',
  'http://localhost:3001',
];

process.on('uncaughtException', (err, origin) => {
  console.log(`message: ${origin} ${err.name} c текстом ${err.message} не была обработана. Обратите внимание!`);
});

mongoose.connect('mongodb://localhost:27017/mestodb', {}, () => {
  console.log('DB is working');
});

app.use(cors(
  {
    origin: allowedOrigins,
    allowedHeaders: ['Content-Type', 'Authorization'],
  },
));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(requestLogger);

app.post('/signup', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: infoTextSchema,
    about: infoTextSchema,
    avatar: urlSchema,
    email: emailSchema,
    password: passwordSchema,
  }),
}), createUser);
app.post('/signin', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: emailSchema,
    password: passwordSchema,
  }),
}), login);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use(errorLogger);

app.use((req, res, next) => {
  next(new NotFoundError(`Страница ${req.url} не найдена`));
});

app.use((errors()));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
