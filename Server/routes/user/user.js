const mongo = require("mongodb");
const db_utilities = require("../../lib/db_utilities");
const router = require("express").Router({ mergeParams: true });

//get profile data of current user
router.get("/", async (req, res) => {
    const {db, client} = await db_utilities.get_db();
    const users_collection = db.collection("users");
    const id = new mongo.ObjectId(req.cookies.session);
    const user = await users_collection.findOne({ _id: id });
    if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    delete user.password;
    await client.close()
    res.status(200).json(user);
});

//get any profile data by id
router.get("/:user", async (req, res) => {
    const {db, client} = await db_utilities.get_db();
    const users_collection = db.collection("users");
    const id = new mongo.ObjectId(req.params.user);
    const user = await users_collection.findOne({ _id: id });
    if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    if(user.type === "student")
    {
        delete user.email;
    }
    delete user.password;
    await client.close()
    res.status(200).json(user);
});

//update profile data
router.put("/", async (req, res) => {
    const {db, client} = await db_utilities.get_db();
    const users_collection = db.collection("users");
    const id = new mongo.ObjectId(req.cookies.session);
    const user = await users_collection.findOne({ _id: id });
    if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const update = {
        $set: {
            name: req.body.name,
            email: req.body.email,
            bio: req.body.bio,
            avatar: req.body.avatar,
            verified: req.body.verified,
            type: req.body.type,
        },
    };
    const result = await users_collection.updateOne({ _id: id }, update);
    await client.close()
    res.status(200).json(result);
});

//delete account
router.delete("/", async (req, res) => {
    const {db, client} = await db_utilities.get_db();
    const users_collection = db.collection("users");
    const id = new mongo.ObjectId(req.cookies.session);
    const result = await users_collection.deleteOne({ _id: id });
    await client.close()
    res.status(200).json(result);
});

module.exports = router;