const express = require("express");
const router = express.Router();
const db_utils = require("../../lib/db_utilities");
const session_utils = require("../../lib/session_utilities")
const sha256 = require("sha256");

router.get("/kor-d", async(req, res) => {
    const { db, client } = await db_utils.get_db();
    let name = null;
    console.log(req.cookies);

    if (!req.cookies.session) {
        res.redirect('/login')
        return
    }
    const przedmioty = {

    };

    res.render('./korepetycje/kor-d', {groupedData: groupedData})
});

module.exports = router;