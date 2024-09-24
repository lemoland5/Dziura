const express = require("express");
const router = express.Router();
const db_utils = require("../../lib/db_utilities");
const session_utils = require("../../lib/session_utilities")
router.get("/", async (req, res) => {
    const {db, client} = await db_utils.get_db();



    if (!req.cookies.session) {
        res.redirect('/login')
    }
    const {session, user} = await session_utils.get_user_data(req.cookies.session, db)

    console.log(user);
//   const session = await db
//   .collection("sessions")
//   .findOne({ _id: new mongodb.ObjectId(req.cookies.session.toString()) });
//     const user = await db
//   .collection("users")
//   .findOne({ _id: new mongodb.ObjectId(session.user) });


    const data = {
        name : user.username,
        email : user.email,
        // github : user.social_links["github"].content | undefined,
        // pictureUrl : user.profile_picture.url | undefined
    }

    res.render("./profil/profile.ejs", {name : data.name, email : data.email});
});

module.exports = router;