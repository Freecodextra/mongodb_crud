const { MongoClient } = require("mongodb");
const url = "mongodb://localhost/27017/";
const client = new MongoClient(url);

const database = client.db("todoDB");
const collection = database.collection("todos");

module.exports =  collection;