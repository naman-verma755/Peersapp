const {MongoClient} = require("mongodb");
const bcrypt = require('bcrypt');

const url = "mongodb+srv://naman:Naman@123()@cluster0.agahb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority&useUnifiedTopology=true";

const client = new MongoClient(url);
 client.connect();


module.exports = {client};










