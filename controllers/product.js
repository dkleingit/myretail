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
                models.product.findById(id, function(err, dbResults)
                {
                    if (err)
                        return next(err);
                        
                    var p = {};
                        
                    if (dbResults && dbResults.length > 0)
                    {
                       p.current_price = {};
                       p.current_price.value = (dbResults[0].price/100).toFixed(2);
                       p.current_price.currency_code = 'USD';
                    }
                    
                    if (apiResult 
                    && apiResult.product
                    && apiResult.product.item
                    && apiResult.product.item.product_description)
                    {
                        p.name = apiResult.product.item.product_description.title;
                    }
                    
                    p.id = id;
                    
                    res.send(p);
                });
            }
        
        ]);

    }
};

module.exports = product;