const express = require("express");
const router = express.Router();
const db_utils = require("../../lib/db_utilities");
const session_utils = require("../../lib/session_utilities")

router.get("/", async (req, res) => {
    res.render("./korepetycje/kor-s.ejs");
});

module.exports = router;