var request = require('request');

const targetUrl = 'https://redsky.target.com/v2/pdp/tcin/##productId##?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics';

var target = 
{
    getProductById: function(id, next)
    {
        var url = targetUrl.replace('##productId##', id);
        
        request(url, function (error, response, body) {
            
            var json = {};
            
            if (error)
                return next (error);
                
            if (body)
                json = JSON.parse(body);
            
                
    	    return next(null, json);
        });
    }
};

module.exports = target;

