const mongo = require("mongodb");
const db_utilities = require("../../lib/db_utilities");
const auth_utilities = require("../../lib/auth_utilities");

//post new request
module.exports = async (req, res) => {
  const { db, client } = await db_utilities.get_db();
  const requests_collection = db.collection("requests");
  const session = auth_utilities.check_session(db, req.cookies.session);
  if (session === null) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const request = {
    user: session.user,
    created: Date.now() / 1000,
    title: req.body.title,
    subject: req.body.subject, // TODO: check if there exists such a subject and topic in `subjects` collection
    topic: req.body.topic, //       Ref: (../../../doc/db/subjects.md)
    content: req.body.content,
    attachments: [],
    comments: [],
    ratings: [],
  };
  //TODO: validate request, attachments logic -> for backend >:3
  const result = await requests_collection.insertOne(request);
  client.close();
  res.status(200).json({ message: "added", id: result.insertedId });
};
