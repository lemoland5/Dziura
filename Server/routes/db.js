const express = require('express');
const router = express.Router();
const mongoDB = require('mongodb');
const sha256 = require('sha256');
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
    const users_collection = db.collection('users');
    const requests_collection = db.collection('requests');
    const offers_collection = db.collection('offers');
    const sessions_collection = db.collection('sessions');
    const notes_collection = db.collection('notes');
    const subjects_collection = db.collection('subjects');


    router.get('/signup', async (req, res) =>{
        //check if user exists
        const result = await users_collection.findOne({$or: [{username: req.body.username}, {email: req.body.email}]});
        if(result)
        {
            res.status(409).json({ message: 'User already exists'});
            return;
        }
        if(req.body.password.length < 9){
            res.status(400).json({ message: 'Password too short'});
            return;
        }
        const salt = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const user = {
            username: req.body.username,
            created: Date.now() / 1000,
            email: req.body.email,
            verified: false,
            password: {
                hash: sha256(req.body.password+salt),
                salt: salt
            },
            social_links: [],
            }
        const insert_result = await users_collection.insertOne(user);
        res.status(200).json({message: 'User created', id: insert_result.insertedId});
    });


});


module.exports = router;