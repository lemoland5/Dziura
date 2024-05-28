const mongo = require("mongodb");
const url = process.env.DZIURA_DB;
async function get_db() {
  const client = new mongo.MongoClient(url, {
    serverApi: {
      version: mongo.ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  await client.connect();
  return client.db("dziura");
}

module.exports = {
  get_db,
};
