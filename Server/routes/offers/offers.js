/*```ts
{
  "_id": ObjectID, // ID of request
  "user": ObjectID, // who posted it
  "created": number, // UNIX timestamp - date of creation
  "title": string, // title of the request
  "subject": string, // school subject, must be one of the available subjects, is checked on backend
  "topic": ObjectID|undefined, // optional topic ID
  "content": string, // content of the request, as typed by user
  "daterange": {
    "from": number, // since when is the offer applicable
    "to": number, // until when will it be
  },
  "attachments":{
      "filename": string, // name of the attachment
      "url": string, // URL of attachment after uploading
      "embed": "image"|"video"|null, // should it be embedded in the webpage as a preview or not
      "mimetype": string, // MIME type of the uploaded file
  }[],
  "comments": {
    "author": ObjectID, // original author
    "content": string, // contents as string
    "created": number, // UNIX timestamp of creation
    "votes":{
      "up": number, // upvotes (or "likes")
      "down": number, // downvotes (or "dislikes")
    }
  }[],
  "ratings": {
    "author": ObjectID, // who gave the rating, might not be necessary
    "rating": number, // number of points awarded or stars rated
  }
}
``` */
const mongo = require("mongodb");
const url = process.env.DZIURA_DB;
const db_utilities = require("../../lib/db_utilities");
const router = require("express").Router({ mergeParams: true });

router.post("/", async (req, res) => {
  const db = await db_utilities.get_db();
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
    res.status(200).json(result);
});

router.get("/", async (req, res) => {
  const db = await db_utilities.get_db();
  const offers_collection = db.collection("offers");
  const limit = req.query.limit ? parseInt(req.query.limit) : 5;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  const result = await offers_collection
    .find()
    .sort({ created: -1 })
    .skip(page * limit)
    .limit(limit)
    .toArray();
  res.status(200).json(result);
});

router.get("id/:id", async (req, res) => {
  const db = await db_utilities.get_db();
  const offers_collection = db.collection("offers");
  const result = await offers_collection.findOne({
    _id: new mongo.ObjectId(req.params.id),
  });
  if (!result) {
    res.status(404).json({ message: "Offer not found" });
    return;
  }
  res.status(200).json(result);
});

router.get("user/:id", async (req, res) => {
    const db = await db_utilities.get_db();
    const offers_collection = db.collection("offers");
    const result = await offers_collection.find({
        user: new mongo.ObjectId(req.params.id),
    });
    if (!result) {
        res.status(404).json({ message: "Offer not found" });
        return;
    }
    res.status(200).json(result);
});

module.exports = router;

