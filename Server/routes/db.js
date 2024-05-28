const express = require('express');
const router = express.Router();
const mongo = require('mongodb');
const sha256 = require('sha256');
const url = process.env.DZIURA_DB;

//docs at /doc/db/index.md

router.get('/signup', async (req, res) => {
  const client = new mongo.MongoClient(url, {
    serverApi: {
      version: mongo.ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });;
  await client.connect()
  const db = client.db('dziura');
  const users_collection = db.collection('users');
  //check if user exists
  const result = await users_collection.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] });
  if (result) {
    res.status(409).json({ message: 'User already exists' });
    return;
  }
  if (req.body.password.length < 9) {
    res.status(400).json({ message: 'Password too short' });
    return;
  }
  const salt = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  const user = {
    username: req.body.username,
    created: Date.now() / 1000,
    email: req.body.email,
    verified: false,
    password: {
      hash: sha256(req.body.password + salt),
      salt: salt
    },
    social_links: [],
  }
  const insert_result = await users_collection.insertOne(user);
  res.status(200).json({ message: 'User created', id: insert_result.insertedId });
});


module.exports = router;
