var logger = require('../logger');
var errors = require('../errors');

var error =
{
    handle: function(error, req, res, next)
    {
        logger.log(error);
   
       if (error instanceof errors.ValidationError)
       {
           res.status(422).json({
               code: 422,
               error: 'validation_error',
               error_description: error.message
           });
       }
       else
       {
          res.status(500).json({
              code: 500,
              error: 'internal_server_error',
              error_description: 'internal server error'
          });
       }
    }
};

module.exports = error;