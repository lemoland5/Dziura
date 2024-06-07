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
  const result = await users_collection.findOne({ email: req.body.email });
  if (!result) {
    res.status(400).json({ message: "login failed" });
  }
  const salt = result.password.salt;
  const hash = sha256(req.body.password + salt);
  if (!(result.password.hash === hash)) {
    res.status(400).json({ message: "login failed" });
  }

  // login successful
  const sessions_collection = db.collection("sessions");
  const insert_result = await sessions_collection.insertOne({
    user: result._id,
    start: Date.now() / 1000,
    expires: Date.now() / 1000 + 3600_0000, // one hour long sessions
  });

  await client.close()
  res
    .status(200)
    .json({ message: "login successful", id: insert_result.insertedId });
   await client.close();
};
