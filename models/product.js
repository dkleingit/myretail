const mongoose = require('mongoose');
const dbName = 'myretail';
const dbHost = 'localhost';
mongoose.connect('mongodb://' + dbHost +'/' + dbName, { useNewUrlParser: true });

const Product = mongoose.model('Product', { product_id: Number, price: Number });

var product = {
    
    findById: function (id, next) 
    {
        Product.find({product_id:id},function(err, results) {
            if (err)
                return next(err);
            
            return next(null, results);
        });
    },
    
    add: function(product, next)
    {
        var p = new Product({ product_id: product.product_id, price: product.price });
        p.save().then(() => next(null, product));
    }
};

module.exports = product;