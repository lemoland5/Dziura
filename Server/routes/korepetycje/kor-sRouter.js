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

    //   const session = await db
//   .collection("sessions")
//   .findOne({ _id: new mongodb.ObjectId(req.cookies.session.toString()) });
//     const user = await db
//   .collection("users")
//   .findOne({ _id: new mongodb.ObjectId(session.user) });

    const subjects = await db.collection("subjects").find()

    let data = Array()

    for await (const doc of subjects) {
        const chapters = await db.collection('chapters').find({subjectId: doc['_id']})

        let chaptersArray = Array()
        let topicsArray = Array()
        for await (const dc of chapters) {
            chaptersArray.push(dc['name'])
            topicsArray.push(dc['topics'])
        }
        data.push({subject: doc['name'], chapters: chaptersArray, topics: topicsArray})
    }

    res.render("./korepetycje/kor-s.ejs", {subjects: data});
    await client.close()
});

module.exports = router;