const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use('/public', express.static(process.cwd() + 'public'));