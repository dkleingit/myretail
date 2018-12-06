const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const dbName = 'myretail';
const dbHost = 'localhost';
mongoose.connect('mongodb://' + dbHost +'/' + dbName, { useNewUrlParser: true });

const Product = mongoose.model('Product', { product_id: Number, price: Number, currency_code: String });

var product = {
    
    findById: function (id, next) 
    {
        Product.findOne({product_id:id},function(err, results) {
            if (err)
                return next(err);
            
            return next(null, results);
        });
    },
    
    upsert: function(product, next)
    {
        //var p = new Product({ product_id: product.product_id, price: product.price, currency_code: product.current_code });
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