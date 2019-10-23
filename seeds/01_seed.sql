INSERT INTO users (first_name, last_name, email, password) 
VALUES 
('Tessa', 'Hiddy', 'thiddy0@time.com', 'slbpTJ0'),
('Claudelle', 'Medler', 'cmedler1@bizjournals.com', 'pvORp1k'),
('Bryn', 'Schreurs', 'bschreurs2@ucsd.edu', 'VLxVi2');

INSERT INTO games (name, category, rating_number, rating_word)
VALUES
('Space Jam', 'Arcade', 4.55, 'Excellent'),
('GTA V', 'Shooter', 3.95, 'Average'),
('Tents', 'Simulator', 2.55, 'Poor'),
('Warframe', 'Shooter', 4.65, 'Excellent');

INSERT INTO watchlists (user_id)
VALUES
(1),(2),(3),(1);

INSERT INTO watchlists_games (watchlist_id, game_id)
VALUES
(1,2),(1,3),(2,1),(2,4),(3,1),(3,2),(4,4);