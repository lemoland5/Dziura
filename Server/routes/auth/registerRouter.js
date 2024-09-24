const mongo = require("mongodb");
const sha256 = require("sha256");
const url = process.env.DZIURA_DB;
const db_utilities = require("../../lib/db_utilities");
const express = require('express')
const router = express.Router()

router.post(async (req, res) => {
  const { db, client } = await db_utilities.get_db();
  const users_collection = db.collection("users");
  //check if user exists
  const result = await users_collection.findOne({
    $or: [{ username: req.body.username }, { email: req.body.email }],
  });
  if (result) {
    res.redirect("/register?exists=true");
    return;
  }
  if (req.body.password.length < 9) {
    res.redirect("/register?tooshort=true");
    return;
  }
  const salt =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  const user = {
    username: req.body.username,
    created: Date.now() / 1000,
    email: req.body.email,
    verified: false,
    password: {
      hash: sha256(req.body.password + salt),
      salt: salt,
    },
    social_links: [],
    skills: [],
  };
  const insert_result = await users_collection.insertOne(user);
  await client.close();
  res.redirect("/login?created=true");
})

module.exports = router;
