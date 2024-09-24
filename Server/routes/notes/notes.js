const mongo = require("mongodb");
const db_utilities = require("../../lib/db_utilities");
const router = require("express").Router({ mergeParams: true });

router.post("/", async (req, res) => {
  const { db, client } = await db_utilities.get_db();
  const notes_collection = db.collection("notes");
  const sessions_collection = db.collection("sessions");
  const id = new mongo.ObjectId(req.cookies.session);
  const session = await sessions_collection.findOne({ _id: id });
  if (session === null) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const note = {
    user: session.user,
    created: Date.now() / 1000,
    title: req.body.title,
    subject: req.body.subject,
    content: req.body.content,
    attachments: req.body.attachments,
    comments: [],
    ratings: [],
  };
  const insert_result = await notes_collection.insertOne(note);
  client.close();
  res
    .status(200)
    .json({ message: "Note created", id: insert_result.insertedId });
});

router.get("/", async (req, res) => {
  const { db, client } = await db_utilities.get_db();
  const notes_collection = db.collection("notes");
  const limit = req.query.limit ? parseInt(req.query.limit) : 5;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  const result = await notes_collection
    .find()
    .sort({ created: -1 })
    .skip(page * limit)
    .limit(limit)
    .toArray();
  client.close();
  res.status(200).json(result);
});

router.get("/id/:id", async (req, res) => {
  const { db, client } = await db_utilities.get_db();
  const notes_collection = db.collection("notes");
  const result = await notes_collection.findOne({
    _id: new mongo.ObjectId(req.params.id),
  });
  if (!result) {
    res.status(404).json({ message: "Note not found" });
    return;
  }
  client.close();
  res.status(200).json(result);
});

router.get("/user/:id", async (req, res) => {
  const { db, client } = await db_utilities.get_db();
  const notes_collection = db.collection("notes");
  const result = await notes_collection.find({
    user: req.params.id,
  });
  client.close();
  res.status(200).json(result);
});
