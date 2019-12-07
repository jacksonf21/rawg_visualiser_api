INSERT INTO users (first_name, last_name, email, u_id) 
VALUES 
('Jackson', 'Fung', 'jacksonf21@hotmail.com', 'PsXzqO4dCMMqIKTqj7xT4UzJzwc2'),
('Claudelle', 'Medler', 'cmedler1@bizjournals.com', 'DASU2BDFE'),
('Bryn', 'Schreurs', 'bschreurs2@ucsd.edu', 'DASDBUBW2123B');

INSERT INTO exceptional_ratings (exc_rating_count, exc_percent)
VALUES
(100, 20.00), (100, 20.00), (100, 20.00), (100, 1.00);

INSERT INTO recommended_ratings (rec_rating_count, rec_percent)
VALUES
(200, 39.95), (140, 10.00), (100, 20.00), (30, 4.00);

INSERT INTO meh_ratings (meh_rating_count, meh_percent)
VALUES
(100, 20.05), (50, 35.00), (200, 30.00), (500, 60.00);

INSERT INTO skip_ratings (skip_rating_count, skip_percent)
VALUES
(100, 20.00), (700, 35.00), (200, 30.00), (200, 35.00);

INSERT INTO ratings (exceptional_id, recommended_id, meh_id, skip_id)
VALUES
(1,1,1,1),(2,2,2,2),(3,3,3,3),(4,4,4,4);

INSERT INTO games (rawg_id, game_name, rating, ratings_id, ratings_count)
VALUES
(1804, 'Space Jam', 4.55, 1, 800),
(903, 'GTA V', 3.95, 2, 590),
(10, 'Tents', 2.55, 3, 100),
(1094, 'Warframe', 4.65, 4, 769);

INSERT INTO watchlists (user_id, watchlist_name)
VALUES
('PsXzqO4dCMMqIKTqj7xT4UzJzwc2', 'arpgs'),('DASU2BDFE', 'action'),('DASDBUBW2123B', 'puzzles'),('PsXzqO4dCMMqIKTqj7xT4UzJzwc2', 'jrpgs');

INSERT INTO watchlists_games (watchlist_id, game_id)
VALUES
(1,2),(1,3),(2,1),(2,4),(3,1),(3,2),(4,4);
