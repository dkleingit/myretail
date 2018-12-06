var errors = require('../errors');
var validators = require('../validators');
var models = require('../models');
var apis = require('../apis');
var async = require('async');

const INVALID_ID_MESSAGE = 'The product id is invalid.';

var product = {

    find: function (req, res, next)
    {
        var id = req.params.id;
        
        if (validators.product.isValidId(id) === false)
            return next(new errors.ValidationError(INVALID_ID_MESSAGE));
            
        id = validators.product.normalizeId(id);
        
        async.waterfall([
            
            //retrieve from target api
            function(callback)
            {
                apis.target.getProductById(id, function(err, result)
                {
                    if (err)
                        return next(err);
                    
                    callback(null, result);
                });
            },
            
            //retrieve from local data store
            function (apiResult, callback)
            {
                models.product.findById(id, function(err, dbResult)
                {
                    if (err)
                        return next(err);
                        
                    var p = {};
                    p.id = id;
                    
                    if (apiResult 
                    && apiResult.product
                    && apiResult.product.item
                    && apiResult.product.item.product_description)
                    {
                        p.name = apiResult.product.item.product_description.title;
                    }
                        
                    if (dbResult)
                    {
                       var r = dbResult;
                       p.current_price = {};
                       p.current_price.value = formatPrice(r.price, r.currency_code);
                       p.current_price.currency_code = r.currency_code;
                    }
                    
                    res.send(p);
                });
            }
        
        ]);

    }
};

function formatPrice(price, currencyCode)
{
    if (price)
        return (price/100).toFixed(2);
    else
        return null;
}

module.exports = product;