var models = require('./models');
var numAttempted = 0;
var products = [{product_id: 13860424, price: 1198, currency_code: 'USD'},
                {product_id: 13860425, price: 1999, currency_code: 'USD'},
                {product_id: 13860428, price: 1349, currency_code: 'USD'},
                {product_id: 13860429, price: 1043, currency_code: 'USD'},
                {product_id: 13860433, price: 425, currency_code: 'USD'}];

console.log('loading data...');

products.forEach(function(product)
{
    models.product.upsert (product, onProductAdd);
});

function onProductAdd(err, result)
{
    if (err)
        console.log(err);
    else
        console.log('upserted product_id: ' + result.product_id);
        
    numAttempted ++;
    if (numAttempted >= products.length)
    {
        console.log ('done');
        process.exit();
    }
}
