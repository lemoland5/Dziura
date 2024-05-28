const mongo = require("mongodb");
const url = process.env.DZIURA_DB;
const db_utilities = require("../../lib/db_utilities");

//post new request
module.exports = async (req, res) => {
  const db = await db_utilities.get_db();
  const requests_collection = db.collection("requests");
  const sessions_collection = db.collection("sessions");
  const id = new mongo.ObjectId(req.cookies.session);
  if(await sessions_collection.findOne({ _id: id }) === null){
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const request = {
    user: req.body.user,
    created: Date.now() / 1000,
    title: req.body.title,
    subject: req.body.subject,
    topic: req.body.topic,
    content: req.body.content,
    attachments: [],
    comments: [],
    ratings: [],
  };
  //TODO: validate request, attachments logic -> for backend >:3
  const result = await requests_collection.insertOne(request);
  res.status(200).json(result);
};
