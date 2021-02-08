CREATE TABLE categories(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE users(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  avatar VARCHAR(50) NOT NULL
);

CREATE TABLE offers(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id INTEGER NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  sum INTEGER NOT NULL,
  type VARCHAR(5) NOT NULL,
  picture VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT current_timestamp,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE comments(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  offer_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT current_timestamp,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (offer_id) REFERENCES offers(id)
);

CREATE TABLE offers_categories(
  offer_id INTEGER NOT NULL,
  category_id INTEGER NOT NULL,
  PRIMARY KEY (offer_id, category_id),
  FOREIGN KEY (offer_id) REFERENCES offers(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE INDEX ON offers (title);

