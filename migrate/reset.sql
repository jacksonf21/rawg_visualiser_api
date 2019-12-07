DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS games CASCADE;
DROP TABLE IF EXISTS watchlists CASCADE;
DROP TABLE IF EXISTS watchlists_games CASCADE; 
DROP TABLE IF EXISTS ratings CASCADE; 
DROP TABLE IF EXISTS exceptional_ratings CASCADE;
DROP TABLE IF EXISTS recommended_ratings CASCADE;
DROP TABLE IF EXISTS meh_ratings CASCADE;
DROP TABLE IF EXISTS skip_ratings CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR (255) NOT NULL,
  last_name VARCHAR (255) NOT NULL,
  email VARCHAR (255) UNIQUE NOT NULL,
  u_id VARCHAR (255) UNIQUE NOT NULL
);

CREATE TABLE exceptional_ratings (
  id SERIAL PRIMARY KEY NOT NULL,
  exc_rating_count INTEGER,
  exc_percent DECIMAL
);

CREATE TABLE recommended_ratings (
  id SERIAL PRIMARY KEY NOT NULL,
  rec_rating_count INTEGER,
  rec_percent DECIMAL
);

CREATE TABLE meh_ratings (
  id SERIAL PRIMARY KEY NOT NULL,
  meh_rating_count INTEGER,
  meh_percent DECIMAL
);

CREATE TABLE skip_ratings (
  id SERIAL PRIMARY KEY NOT NULL,
  skip_rating_count INTEGER,
  skip_percent DECIMAL
);

CREATE TABLE ratings (
  id SERIAL PRIMARY KEY NOT NULL,
  exceptional_id INTEGER REFERENCES exceptional_ratings(id) ON DELETE CASCADE,
  recommended_id INTEGER REFERENCES recommended_ratings(id) ON DELETE CASCADE,
  meh_id INTEGER REFERENCES meh_ratings(id) ON DELETE CASCADE,
  skip_id INTEGER REFERENCES skip_ratings(id) ON DELETE CASCADE
);

CREATE TABLE games (
  id SERIAL PRIMARY KEY NOT NULL,
  rawg_id INTEGER NOT NULL,
  game_name VARCHAR (255) NOT NULL,
  rating DECIMAL,
  ratings_id INTEGER REFERENCES ratings(id) ON DELETE CASCADE,
  ratings_count INTEGER,
  recorded_at TIMESTAMP DEFAULT Now()
);

CREATE TABLE watchlists (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id VARCHAR (255) REFERENCES users(u_id) ON DELETE CASCADE,
  watchlist_name VARCHAR (255) NOT NULL
);

CREATE TABLE watchlists_games (
  id SERIAL PRIMARY KEY NOT NULL,
  watchlist_id INTEGER REFERENCES watchlists(id) ON DELETE CASCADE,
  game_id INTEGER REFERENCES games(id) ON DELETE CASCADE
);

