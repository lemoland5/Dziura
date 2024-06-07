const mongo = require("mongodb");
const db_utilities = require("../../lib/db_utilities");
const router = require("express").Router({ mergeParams: true });

router.post("/", async (req, res) => {
  const {db, client} = await db_utilities.get_db();
  const offers_collection = db.collection("offers");
  const sessions_collection = db.collection("sessions");
  const id = new mongo.ObjectId(req.cookies.session);
  const session = await sessions_collection.findOne({ _id: id });
  if (session === null) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const offer = {
    user: session.user,
    created: Date.now() / 1000,
    title: req.body.title,
    subject: req.body.subject,
    topic: req.body.topic,
    content: req.body.content,
    daterange: {
      from: req.body.daterange.from,
      to: req.body.daterange.to,
    },
    attachments: [], //TODO - validate request, attachments logic -> for backend >:3
    comments: [],
    ratings: [],
  };
  const result = await offers_collection.insertOne(offer);
  client.close()
  res.status(200).json(result);
});

router.get("/", async (req, res) => {
  const {db, client} = await db_utilities.get_db();
  const offers_collection = db.collection("offers");
  const limit = req.query.limit ? parseInt(req.query.limit) : 5;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  const result = await offers_collection
    .find()
    .sort({ created: -1 })
    .skip(page * limit)
    .limit(limit)
    .toArray();
  client.close()
  res.status(200).json(result);
});

router.get("id/:id", async (req, res) => {
  const {db, client} = await db_utilities.get_db();
  const offers_collection = db.collection("offers");
  const result = await offers_collection.findOne({
    _id: new mongo.ObjectId(req.params.id),
  });
  if (!result) {
    res.status(404).json({ message: "Offer not found" });
    return;
  }
  client.close()
  res.status(200).json(result);
});

router.get("user/:id", async (req, res) => {
  const {db, client} = await db_utilities.get_db();
  const offers_collection = db.collection("offers");
  const result = await offers_collection
    .find({
      user: new mongo.ObjectId(req.params.id),
    })
    .toArray();
  if (!result) {
    res.status(404).json({ message: "Offer not found" });
    return;
  }
  client.close()
  res.status(200).json(result);
});

module.exports = router;
