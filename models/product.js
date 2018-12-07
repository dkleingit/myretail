const config = require('../config');
const mongoose = require('mongoose');
//disable useFindAndModify since it is deprecated
mongoose.set('useFindAndModify', false);

mongoose.connect(config.dbConnectionString, { useNewUrlParser: true });

const Product = mongoose.model('Product', { product_id: Number, current_price: Number, currency_code: String });

var product = {
    
    findByProductId: function (product_id, next) 
    {
        Product.findOne({product_id:product_id})
        .then((results) => {
            next(null, results);
        })
        .catch((err) => {
            next (err);
        });
    },
    
    upsert: function(product, next)
    {
        Product.findOneAndUpdate({ product_id: product.product_id}, product, {upsert:true})
        .then(() => {
            next(null, product);
        })
        .catch((err) => {
            next(err);
        });
    },
    
    removeByProductId: function (product_id, next) 
    {
        Product.deleteOne({product_id:product_id})
        .then((results) => {
            next(null, results);
        })
        .catch((err) => {
            next (err);
        });
    },
};


module.exports = product;