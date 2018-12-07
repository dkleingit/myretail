const dbName = process.env.DB_NAME || 'myretail';
const dbHost = process.env.DB_HOST || 'localhost';

var config =
{
    dbConnectionString: 'mongodb://' + dbHost +'/' + dbName
};

module.exports = config;