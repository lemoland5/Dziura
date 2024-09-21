const mongo = require("mongodb");
const url = 'mongodb://127.0.0.1:27017/dziura'
async function get_db() {
  const client = new mongo.MongoClient(url, {
    serverApi: {
      version: mongo.ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  await client.connect();
  return {db: client.db("dziura"), client};
}

module.exports = {
  get_db,
};
