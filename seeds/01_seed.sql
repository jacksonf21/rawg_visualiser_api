INSERT INTO users (first_name, last_name, email, u_id) 
VALUES 
('Tessa', 'Hiddy', 'thiddy0@time.com', 'ASD123FSDV2X'),
('Claudelle', 'Medler', 'cmedler1@bizjournals.com', 'DASU2BDFE'),
('Bryn', 'Schreurs', 'bschreurs2@ucsd.edu', 'DASDBUBW2123B');

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