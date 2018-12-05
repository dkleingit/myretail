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
    
    normalizeId: function normalizeId(id)
    {
        return id.trim();
    }
};

module.exports = product;