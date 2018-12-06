var express = require('express');
var controllers = require('./controllers');

var app = express();

const port = process.env.PORT || 8080;

app.get('/products/:id', controllers.product.findByProductId);
app.use(controllers.error.handle);
 
app.listen(port);

console.log ('Listening on port: '+ port);

module.exports = app; // for testing