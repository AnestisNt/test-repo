const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', (req, res) =>{
  res.sendFile(process.cwd() + '/views/index.html');
});

/*app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});*/

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) =>{
  err 
    ? console.log('Error in server setup') 
    : console.log('Listening on port ' + PORT);
});

//module.exports = app;