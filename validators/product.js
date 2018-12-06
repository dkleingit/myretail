var product = 
{
    isValidId: function isValidId(id)
    {
        if (id == null)
            return false;
        
        if (id === undefined)
            return false;
            
        if (isNaN(id))
            return false;
            
        return true;
    },
    
    isValidPrice: function isValidPrice(price)
    {
        if (price == null)
            return false;
        
        if (price === undefined)
            return false;
            
        if (isNaN(price))
            return false;
            
        return true;
    }
};

module.exports = product;