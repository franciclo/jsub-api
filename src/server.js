const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(cors());

app.use(require('./routes'));

app.use(require('./errors'));

app.listen(7000);

console.log('Listening on http://localhost:7000');
