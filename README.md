# HuaMao

## Идея проекта

**HuaMao** &ndash; социальная сеть. Минимальный функционал, который необходимо реализовать:
<ol>
    <li> Авторизация на сайте
    <li> Создание личного профиля с возможностью его редактирования (фото, логин, возраст, город проживания)
    <li> Добавление друзей
    <li> Обмен сообщениями с другими пользователями
    <li> Возможность оставить отзыв о сайте
</ol>

## How to build
### Locally
Для начала необходимо обновить константы в `backend/backend/settings.py` и `react-app/src/api/config.js`, соответствующие хосту и портам.
1. Применить миграции к моделям данных из директории backend:
```
python3 manage.py migrate
```

2. Поднять сервер из директории backend:
```
python3 manage.py runserver
```

3. Запустить докер-контейнер для работы сокетов с Redis channels:
```
docker run -p 6379:6379 -d redis:5
```

4. Запустить реакт-приложение из директории react-app:
```
npm install
npm start
```

## Макет веб-приложения

[Design in Figma](https://www.figma.com/file/hlFAIfFrGb8HHlGH0B2Uy7/HuaoMao?type=design&node-id=0-1&mode=design&t=LrnYanTZAVLeXxYG-0)

## UI приложения

![webapp.gif](samples/webapp.gif)

## TODO

1. Добавить тесты
2. Добавить поддержку авторизации пользователя по номеру телефона
3. Перейти на JWT-токены
4. Добавить криптографические зависимости
5. Добавить поддержку SEO