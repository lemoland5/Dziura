async function check_session(db, cookie) {
  const sessions_collection = db.collection("sessions");
  const id = new mongo.ObjectId(cookie);
  return await sessions_collection.findOne({ _id: id });
}

module.exports = {
  check_session,
};
