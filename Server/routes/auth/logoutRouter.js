const mongo = require("mongodb");
const sha256 = require("sha256");
const url = process.env.DZIURA_DB;
const db_utilities = require("../../lib/db_utilities");
const express = require('express')
const session_utils = require("../../lib/session_utilities");
const router = express.Router()

router.get('/', (req, res) => {
    if (!req.cookies.session){ res.redirect('/login'); return}
    res.clearCookie('session')
    res.redirect('/login')
})

module.exports = router;