const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 8000;

const routesRoot = require('./routes/00-root');
const routesUsers = require('./routes/01-users');
const routesWatchlists = require('./routes/02-watchlists');
const routesSearch = require('./routes/03-search');
const routeSignUp = require('./routes/04-signUp');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/', routesRoot);
app.use('/search', routesSearch);
app.use('/users', routesUsers);
app.use('/watchlists', routesWatchlists);
app.use('/signup', routeSignUp);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});


