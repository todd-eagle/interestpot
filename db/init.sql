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

  CREATE TABLE cat_travel (
  id SERIAL PRIMARY KEY,
	url TEXT
  );

  CREATE TABLE cat_gaming (
  id SERIAL PRIMARY KEY,
	url TEXT
  );
 
 CREATE TABLE cat_food (
  id SERIAL PRIMARY KEY,
	url TEXT
  );

  CREATE TABLE cat_sports (
  id SERIAL PRIMARY KEY,
	url TEXT
  );

 CREATE TABLE cat_movies (
  id SERIAL PRIMARY KEY,
	url TEXT
  );

 CREATE TABLE cat_health (
  id SERIAL PRIMARY KEY,
	url TEXT
  );

  CREATE TABLE cat_dyi (
  id SERIAL PRIMARY KEY,
	url TEXT
  );

   CREATE TABLE cat_photography (
  id SERIAL PRIMARY KEY,
	url TEXT
  );


insert into cat_travel
values
(1, 'https://www.travelandleisure.com/travel-news'),
(2, 'https://www.lonelyplanet.com/news'),
(3, 'https://suitcasemag.com/'),
(4, 'https://www.nationalgeographic.com/travel/'),
(5, 'https://www.afar.com/tips-and-news');

insert into cat_movies
values
(1, 'https://screenrant.com/movie-news/'),
(2, 'https://www.empireonline.com/movies/news/'),
(3, 'https://collider.com/'),
(4, 'https://www.cinemablend.com/');


insert into cat_food
values
(1, 'https://www.epicurious.com/'),
(2, 'https://www.chowhound.com/'),
(3, 'https://www.thekitchn.com/'),
(4, 'https://www.vice.com/en_us/topic/food'),
(5, 'https://www.eater.com/');

insert into cat_health
values
(1, 'https://www.healthline.com/'),
(2, 'https://www.wellandgood.com/'),
(3, 'https://www.livestrong.com/'),
(4, 'https://www.acefitness.org/education-and-resources/lifestyle/blog/'),
(5, 'https://www.health.com/');

insert into cat_gaming
values
(1, 'https://www.destructoid.com/'),
(2, 'https://www.gamesradar.com/'),
(3, 'https://www.gameinformer.com'),
(4, 'https://www.gamespot.com/'),
(5, 'https://www.polygon.com/');