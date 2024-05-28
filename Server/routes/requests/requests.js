const mongo = require("mongodb");
const auth_utilities = require("../../lib/auth_utilities");
const db_utilities = require("../../lib/db_utilities");
const router = require("express").Router({ mergeParams: true });
const requestRoute = require("./request");

router.post("/", requestRoute);

router.get("/", async (req, res) => {
  const db = await db_utilities.get_db();
  const session = auth_utilities.check_session(db, req.cookies.session)
  if ((session) === null) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const requests_collection = db.collection("requests");
  const limit = req.query.limit ? parseInt(req.query.limit) : 5;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  const result = await requests_collection
    .find()
    .sort({ created: -1 })
    .skip(page * limit)
    .limit(limit)
    .toArray();
  res.status(200).json(result);
});

router.get("/id/:id", async (req, res) => {
  const db = await db_utilities.get_db();
  const session = auth_utilities.check_session(db, req.cookies.session)
  if ((session) === null) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const requests_collection = db.collection("requests");
  const result = await requests_collection.findOne({
    _id: new mongo.ObjectId(req.params.id),
  });
  if (!result) {
    res.status(404).json({ message: "Request not found" });
    return;
  }
  res.status(200).json(result);
});

router.get("user/:id", async (req, res) => {
  const db = await db_utilities.get_db();
  const session = auth_utilities.check_session(db, req.cookies.session)
  if ((session) === null) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const requests_collection = db.collection("requests");
  const result = await requests_collection.find({
    user: new mongo.ObjectID(req.params.id),
  });
  res.status(200).json(result);
});

module.exports = router;
