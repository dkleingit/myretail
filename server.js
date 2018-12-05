var express = require('express');
var controllers = require('./controllers');
//var models = require('./models');

var app = express();

const port = process.env.PORT || 8080;

app.get('/products/:id', controllers.product.find);
app.use(controllers.error.handle);

//models.product.add ({product_id: 13860428, price: 500});
 
app.listen(port);

console.log ('Listening on port: '+ port);

module.exports = app; // for testing