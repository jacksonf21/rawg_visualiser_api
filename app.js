const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 8000;

const routesRoot = require('./routes/00-root');
const routesUsers = require('./routes/01-users');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/', routesRoot);
app.use('/users', routesUsers);
app.use('/watchlists', routesUsers);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});


