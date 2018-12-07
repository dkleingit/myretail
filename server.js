var express = require('express');
var controllers = require('./controllers');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const port = process.env.PORT || 8080;

app.get('/products/:id', controllers.product.findByProductId);
app.put('/products/:id', controllers.product.upsert);
app.use(controllers.error.handle);
 
app.listen(port);

console.log ('Listening on port: ' + port);

module.exports = app; // for testing