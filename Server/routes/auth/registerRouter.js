const mongo = require("mongodb");
const sha256 = require("sha256");
const url = process.env.DZIURA_DB;
const db_utilities = require("../../lib/db_utilities");
const passwordValidator = require ('password-validator')
const emailValidator = require('email-validator')
const express = require('express')
const router = express.Router()

router.get("/", async (req, res) => {
  if (req.query["exists"]){
    alert('Użytkownik już istnieje!')
  }
  if (req.query["invalidpassword"]){
    alert('Złe hasło!')
  }
  if(req.query['invalidemail']){
    alert('Zły email!')
  }
  if(req.query["notzstiemail"]){
    alert('Email musi być na domenie @zstigliwicepl.onmicrosoft.com!')
  }
  if (req.query)
  res.render("./logowanie-rejestracja/rejestracja.ejs");
});

router.post("/", async (req, res) => {
  let schema = new passwordValidator();
  schema
      .is().min(8)
      .is().max(100)
      .has().uppercase()
      .has().lowercase()
      .has().digits()
      .has().not().spaces()
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
  if (schema.validate(req.body.password)===false){
    res.redirect("/register?invalidpassword=true")
    return
  }
  if(emailValidator.validate(req.body["email"])===false){
    res.redirect('/register/?invalidemail=true')
    return
  }
  if(req.body.email.includes('@zstigliwicepl.onmicrosoft.com')===false){
    res.redirect("/register/?notzstiemail=true")
    return
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
    type: 'student',
  };
  const insert_result = await users_collection.insertOne(user);
  await client.close();
  res.redirect("/login?created=true");
})

module.exports = router;
