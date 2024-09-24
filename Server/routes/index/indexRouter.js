const express = require("express");
const router = express.Router();
const db_utils = require("../../lib/db_utilities");
const session_utils = require("../../lib/session_utilities")

router.get("/", async (req, res) => {
    const { db, client } = await db_utils.get_db();
    let name = null;
    console.log(req.cookies);

    if (!req.cookies.session) {
        res.redirect('/login')
        return
    }
    const {session, user} = await session_utils.get_user_data(req.cookies.session, db)

    name = user.username || "Stranger";
    console.log(name);
    await client.close();
    res.render("./index/index.ejs", { name: name });
});

module.exports = router;