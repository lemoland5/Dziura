const express = require("express");
const router = express.Router();
const db_utils = require("../../lib/db_utilities");
const session_utils = require("../../lib/session_utilities")
const {ObjectId} = require("mongodb");
router.get("/", async (req, res) => {
    const {db, client} = await db_utils.get_db();

    if (!req.cookies.session) {
        res.redirect('/login')
    }
    const {session, user} = await session_utils.get_user_data(req.cookies.session, db)

    if(user.type !== 'admin'){
        res.redirect('/profile')
    }
    //   const session = await db
//   .collection("sessions")
//   .findOne({ _id: new mongodb.ObjectId(req.cookies.session.toString()) });
//     const user = await db
//   .collection("users")
//   .findOne({ _id: new mongodb.ObjectId(session.user) });

    const getUnverifiedUsers = await db.collection("users").find({verified: false})

    let unverifiedUsers = Array()

    for await (const doc of getUnverifiedUsers) {
        unverifiedUsers.push(doc)
    }


    res.render("./admin/admin.ejs", {data: unverifiedUsers});
    await  client.close()
});

router.post('/', async(req,res)=>{
    const {db, client} = await db_utils.get_db();
    const users = await db.collection('users')
    console.log(req.body.user)
    await users.findOneAndUpdate({_id: new ObjectId(req.body.user)}, {$set: {verified: true}})
    res.redirect('/admin')
    await client.close()
})

module.exports = router;