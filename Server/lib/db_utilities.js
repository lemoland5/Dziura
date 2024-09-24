const mongo = require("mongodb");
const url = 'mongodb+srv://dziura:rTyQoMU4Dp1qtxkg@cluster0.nthvuuy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
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
