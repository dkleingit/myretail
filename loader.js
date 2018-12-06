var models = require('./models');

console.log('loading data...');

models.product.upsert ({product_id: 13860424, price: 1198, currency_code: 'USD'}, onProductAdd);
models.product.upsert ({product_id: 13860425, price: 1999, currency_code: 'USD'}, onProductAdd);
models.product.upsert ({product_id: 13860428, price: 1349, currency_code: 'USD'}, onProductAdd);
models.product.upsert ({product_id: 13860429, price: 1043, currency_code: 'USD'}, onProductAdd);
models.product.upsert ({product_id: 13860433, price: 425, currency_code: 'USD'}, onProductAdd);

function onProductAdd(err, result)
{
    if (err)
        console.log(err);
    else
        console.log('Upserted product_id: ' + result.product_id);
}
