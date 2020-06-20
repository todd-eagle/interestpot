DROP TABLE IF EXISTS users, user_landing_page, user_profile, cat_travel, cat_gaming, cat_food;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(50),
  password TEXT
  );

  CREATE TABLE user_landing_page (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  category VARCHAR(100),
  title TEXT,
  img TEXT,
  link TEXT
  );

  CREATE TABLE user_profile (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  category VARCHAR(100),
  sub_category VARCHAR(100)
  );

  CREATE TABLE travel (
  id SERIAL PRIMARY KEY,
	url TEXT
  );

  CREATE TABLE gaming (
  id SERIAL PRIMARY KEY,
	url TEXT
  );
 
 CREATE TABLE food (
  id SERIAL PRIMARY KEY,
	url TEXT
  );
