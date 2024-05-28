const express = require("express");
const router = express.Router();

const signupRoute = require("./auth/signup");
const loginRoute = require("./auth/login");

//docs at /doc/db/index.md

router.get("/signup", signupRoute);

router.get("/login", loginRoute);



module.exports = router;