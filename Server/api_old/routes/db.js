const express = require("express");
const router = express.Router({ mergeParams: true });

const signupRoute = require("./auth/signup");
const loginRoute = require("./auth/login");
const requestRouter = require("./requests/requests");
const offersRouter = require("./offers/offers");
const notesRoute = require("./notes/notes");

//docs at /doc/db/index.md

router.post("/register", signupRoute);

router.post("/login", loginRoute);

router.post("/notes", notesRoute);

router.use("/requests", requestRouter);

router.use("/offers", offersRouter);

module.exports = router;
