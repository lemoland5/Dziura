const db_utilities = require("../../lib/db_utilities");
const serverAddress = "http://localhost:3000";
describe("fetch user data", () => {
  test("fetch user data", async () => {
    const { db, client } = await db_utilities.get_db();
    const users_collection = db.collection("users");
    //get id of user dummy
    const user = await users_collection.findOne({ username: "dummy" });
    expect(user.username).toBe("dummy");
    //test fetching data of user dummy
    const res = await fetch(serverAddress + "/api/user/" + user._id);
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.username).toBe("dummy");
    expect(json.password).toBe(undefined);
    expect(json.salt).toBe(undefined);
    await client.close();
  });
});
afterAll(async () => {
  const { db, client } = await db_utilities.get_db();
  const users_collection = db.collection("users");
  await users_collection.deleteOne({ username: "dummy" });
  await client.close();
});
