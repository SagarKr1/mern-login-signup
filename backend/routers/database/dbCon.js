let { MongoClient } = require('mongodb');


const database = "LoginSignup";
const url = "mongodb://127.0.0.1";


const client = new MongoClient(url);

module.exports.handler = async () => {
    try {
        const client = new MongoClient(url);
        let result = await client.connect();
        let db = await result.db(database);
        return db;
    } catch (e) {
        return e;
    }
}

module.exports.close = () => {
    try {
        client.close();
        return "db close";
    } catch (e) {
        return e;
    }
}