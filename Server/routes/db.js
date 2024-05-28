const express = require("express");
const router = express.Router({ mergeParams: true });

const signupRoute = require("./auth/signup");
const loginRoute = require("./auth/login");
const requestRouter = require("./requests/requests");

//docs at /doc/db/index.md

router.post("/signup", signupRoute);

router.post("/login", loginRoute);

router.use("/request", requestRouter);

module.exports = router;
