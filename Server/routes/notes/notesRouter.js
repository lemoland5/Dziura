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

    const notes = await db.collection("notes").find({}).toArray((err, result) => {
        if(err) throw err;
        console.log(result);
        db.close()
    });

    let notesData = []


    for (const element of notes){
        const user = await db.collection("users").findOne({_id : element.user});
        console.log("USER-------------");
        console.log(user);
        notesData.push(
            {
                subject : element.subject,
                // username : username
                username : user.username,

                title : element.title,
                content : element.content
            }
        )
    }





    console.log(notesData);

    res.render("./notatki/notatki.ejs", {data : notesData});
});

module.exports = router;