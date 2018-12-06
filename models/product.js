const mongoose = require('mongoose');
//disable useFindAndModify since it is deprecated
mongoose.set('useFindAndModify', false);

//db connection information
const dbName = process.env.DB_NAME || 'myretail';
const dbHost = process.env.DB_HOST || 'localhost';

mongoose.connect('mongodb://' + dbHost +'/' + dbName, { useNewUrlParser: true });

const Product = mongoose.model('Product', { product_id: Number, price: Number, currency_code: String });

var product = {
    
    findByProductId: function (product_id, next) 
    {
        Product.findOne({product_id:product_id},function(err, results) {
            if (err)
                return next(err);
            
            return next(null, results);
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
    }
};

module.exports = product;