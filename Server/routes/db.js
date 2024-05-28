const express = require('express');
const router = express.Router();
const mongoDB = require('mongodb');
const mongoClient = mongoDB.MongoClient;
const url = process.env.DZIURA_DB;

//docs at /doc/db/index.md

mongoClient.connect(url, {useNewUrlParser: true}).then( (client) =>
{
    if(!client)
    {
        console.log('Connection error');
        return;
    }
    console.log('Connected...');
    const db = client.db('dziura');
});

module.exports = router;