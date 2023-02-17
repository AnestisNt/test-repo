const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) =>{
  res.sendFile(process.cwd() + '/views/index.html');
});

const mySecret = process.env['secret1'];

app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
  console.log('listening on port' + PORT);
});

module.exports = app;