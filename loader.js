var models = require('./models');
var numAttempted = 0;
var products = [{product_id: 13860424, current_price: 1198, currency_code: 'USD'},
                {product_id: 13860425, current_price: 1999, currency_code: 'USD'},
                {product_id: 13860428, current_price: 1349, currency_code: 'USD'},
                {product_id: 13860429, current_price: 1043, currency_code: 'USD'},
                {product_id: 13860433, current_price: 425, currency_code: 'USD'}];

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
