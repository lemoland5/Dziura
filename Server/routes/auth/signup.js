const mongo = require("mongodb");
const sha256 = require("sha256");
const url = process.env.DZIURA_DB;
const db_utilities = require("../../lib/db_utilities");

module.exports = async (req, res) => {
<<<<<<< Updated upstream
  const { db, client } = await db_utilities.get_db();
=======
  const {db, client}= await db_utilities.get_db();
>>>>>>> Stashed changes
  const users_collection = db.collection("users");
  //check if user exists
  const result = await users_collection.findOne({
    $or: [{ username: req.body.username }, { email: req.body.email }],
  });
  if (result) {
    res.status(409).json({ message: "User already exists" });
    return;
  }
  if (req.body.password.length < 9) {
    res.status(400).json({ message: "Password too short" });
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
  };
  const insert_result = await users_collection.insertOne(user);
  await client.close()
  res
    .status(200)
    .json({ message: "User created", id: insert_result.insertedId });
    await client.close();
};
