var errors = require('../errors');
var validators = require('../validators');
var models = require('../models');
var apis = require('../apis');
var async = require('async');

const INVALID_ID_MESSAGE = 'Please provide a valid product id.';
const INVALID_PRICE_MESSAGE = 'Please provide a valid price.';

var product = {

    findByProductId: function (req, res, next)
    {
        var productId = req.params.id;
        
        if (validators.product.isValidId(productId) === false)
            return next(new errors.ValidationError(INVALID_ID_MESSAGE));
            
        findByProductId(productId, function(err, result)
        {
            if (err)
                return next(err);
                
            res.send(result);
        });
    },
    upsert: function (req, res, next)
    {
        var productId = req.params.id;
        var currentPrice = req.body.current_price;
        
        if (validators.product.isValidId(productId) === false)
            return next(new errors.ValidationError(INVALID_ID_MESSAGE));
            
        if (validators.product.isValidPrice(currentPrice) === false)
            return next(new errors.ValidationError(INVALID_PRICE_MESSAGE));
            
        var p = {};
        p.product_id = productId;
        p.current_price = currentPrice;
        
        //update the price
        models.product.upsert(p, function(err, result)
        {
            if (err)
                return next(err);
            
            //return the current product information
            findByProductId(productId, function(err, result)
            {
                if (err)
                    return next(err);
                    
                res.json(result);
            });
        });
    }
};

function toProductInfo (productId, dbResult, apiResult)
{
    var p = {};
    p.id = productId;
    
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
       p.current_price.value = formatPrice(r.current_price, r.currency_code);
       p.current_price.currency_code = r.currency_code;
    }
    
    return p;
}

function formatPrice(price, currencyCode)
{
    if (price)
        return Number((price/100).toFixed(2));
    else
        return null;
}

function findByProductId(productId, next)
{
    async.waterfall([
            
        //retrieve from target api
        function(callback)
        {
            apis.target.getProductById(productId, function(err, result)
            {
                if (err)
                    return next(err);
                
                callback(null, result);
            });
        },
        
        //retrieve from local data store
        function (apiResult, callback)
        {
            models.product.findByProductId(productId, function(err, dbResult)
            {
                if (err)
                    return next(err);
                    
                callback(null, dbResult, apiResult);
            });
        },
        
        //combine results
        function (dbResult, apiResult, callback)
        {
            var product = toProductInfo(productId, dbResult, apiResult);
            return next(null, product);
        }
    ]);
}

module.exports = product;