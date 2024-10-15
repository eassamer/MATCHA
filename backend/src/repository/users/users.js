var db = require('../dbconnect');

async function getUsers(req, res) {
    let client;
    try {
        client = await db.connect();
        const collection = client.db('test').collection('users');
        const result = await collection.find().toArray();
        res.status(200).json(result);  // Send the result as a response
    } catch (err) {
        res.status(500).send({ message: "Error fetching users", error: err });
    } finally {
        if (client) client.close(); // Ensure the client is always closed
    }
}

async function addUser(req, res) {
    let client;
    try {
        client = await db.connect();
        const collection = client.db('test').collection('users');
        const user = await collection.insertOne(req.body);
        res.status(201).json(user); // Send the result of insert as a response
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: "Error adding user", error: e });
    } finally {
        if (client) client.close(); // Ensure the client is always closed
    }
}

module.exports = { getUsers, addUser };
