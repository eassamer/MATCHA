var mongodb = require('mongodb');

const client = new mongodb.MongoClient(
    process.env.ME_CONFIG_MONGODB_URL
)

module.exports = client