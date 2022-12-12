# Веб-приложение: Mesto
### [Ссылка на приложение](https://mmesto.nomoredomains.club/)
Веб-сервис для обмена фотографиями красивых мест.  
Пользователи могут авторизироваться, добавлять новые фотографии мест, лайкать, удалять фото, редактировать информацию о себе, изменять фото профиля. Формы валидируются, во время загрузки обновленных данных (новая карточка, аватар или изменение данных пользвателя) появляются индикаторы загрузки запросов.  
(!) Для просмотра ленты необходимо зарегистрироваться.

## Использованные технологии
Frontend:
* React - функциональные компоненты, хуки (useState, useEffect), контекст (useContext), управляемые компоненты, REST API, JWT, React router (Route, Switch, useHistory), валидация форм на React-hook-form. Использование HOC.
* CSS (адаптивная верстка, простое меню-бургер в мобильной версии).

Backend:
* Node.js, express, MongoDB + Mongoose, Валидация Celebrate+Joi


## Скринкаст функциональности

Добавление новой карточки места

![image](https://github.com/Nika414/mesto/blob/main/Preview_new%20place.gif)

Изменение информации профиля

![image](https://github.com/Nika414/mesto/blob/main/Preview_edit%20profile.gif)

## Установка и запуск
### Требования:

Node.js >= 14;
npm >= 6.14;

### Директория Backend:
* `npm i` - установка зависимостей;
* `npm run start` - запуск сервера;

### Директория Frontend:
* `npm i` - установка зависимостей;
* `npm run start` - запуск;
