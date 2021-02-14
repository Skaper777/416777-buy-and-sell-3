/* All categories */
SELECT * FROM categories;

/* Non-empty categories */
SELECT id, name FROM categories
  JOIN offers_categories
  ON id = category_id
  GROUP BY id;

/* Categories with number of ads */
SELECT
  id, name, count(offer_id)
FROM categories
  LEFT JOIN offers_categories
  ON id = category_id
  GROUP BY id;

/* Fresh first */
SELECT
  offers.id AS "Идентификатор объявления",
  offers.title AS "Заголовок объявления",
  offers.sum AS "Стоимость",
  offers.type AS "Тип объявления",
  offers.description AS "Текст объявления",
  offers.created_at AS "Дата публикации",
  users.first_name AS "Имя автора",
  users.last_name AS "Фамилия автора",
  users.email AS "Контактный email",
  COUNT(comments.id) AS "Количество комментариев",
  STRING_AGG(DISTINCT categories.name, ', ') AS "Наименование категорий"
FROM offers
  JOIN offers_categories ON offers.id = offers_categories.offer_id
  JOIN categories ON offers_categories.category_id = categories.id
  LEFT JOIN comments ON comments.offer_id = offers.id
  JOIN users ON users.id = offers.user_id
  GROUP BY offers.id, users.id
  ORDER BY offers.created_at DESC;

/* Offer details */
SELECT
  offers.*,
  COUNT(comments.id) AS "Количество комментариев",
  STRING_AGG(DISTINCT categories.name, ', ') AS "Категории",
  users.first_name AS "Имя автора",
  users.last_name AS "Фамилия автора",
  users.email AS "Контактный email"
FROM offers
  JOIN offers_categories ON offers.id = offers_categories.offer_id
  JOIN categories ON offers_categories.category_id = categories.id
  LEFT JOIN comments ON comments.offer_id = offers.id
  JOIN users ON users.id = offers.user_id
WHERE offers.id = 1
  GROUP BY offers.id, users.id;

/* 5 fresh comments*/
SELECT
  comments.id AS "Идентификатор комментария",
  comments.offer_id AS "Идентификатор объявления",
  users.first_name AS "Имя автора",
  users.last_name AS "Фамилия автора",
  comments.text AS "Текст комментария"
FROM comments
  JOIN users ON comments.user_id = users.id
  ORDER BY comments.created_at DESC
  LIMIT 5;

/* Offer comment */
SELECT
  comments.id AS "Идентификатор комментария",
  comments.offer_id AS "Идентификатор объявления",
  users.first_name AS "Имя автора",
  users.last_name AS "Фамилия автора",
  comments.text AS "Текст комментария"
FROM comments
  JOIN users ON comments.user_id = users.id
WHERE comments.offer_id = 1
  ORDER BY comments.created_at DESC;

/* 2 "buy" type offers */
SELECT * FROM offers
WHERE type = 'OFFER'
  LIMIT 2;

/* Update title */
UPDATE offers
SET title = 'Уникальное предложение!'
WHERE id = 1;
