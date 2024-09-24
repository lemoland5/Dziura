const db_utilities = require("../../lib/db_utilities");
describe("signup+login", () => {
  describe("signup", () => {
    test("signup", async () => {
      //signup as a new user
      const req = {
        method: "POST",
        body: JSON.stringify({
          username: "testuser",
          email: "test@test",
          password: "password1234567890",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await fetch("http://localhost:3000" + "/api/signup", req);
      const json = await res.json();
      expect(res.status).toBe(200);
      expect(json.message).toBe("User created");
    });
  });
  describe("login", () => {
    test("login", async () => {
      //signup as a new user
      const req = {
        method: "POST",
        body: JSON.stringify({
          email: "test@test",
          password: "password1234567890",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await fetch("http://localhost:3000" + "/api/login", req);
      const json = await res.json();
      expect(res.status).toBe(200);
      expect(json.message).toBe("login successful");
    });
  });
  afterAll(async () => {
    const { db, client } = await db_utilities.get_db();
    const users_collection = db.collection("users");
    await users_collection.deleteOne({ username: "testuser" });
    await client.close();
  });
});
