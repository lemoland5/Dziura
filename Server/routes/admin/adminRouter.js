const express = require("express");
const router = express.Router();
const db_utils = require("../../lib/db_utilities");
const session_utils = require("../../lib/session_utilities")
const {ObjectId} = require("mongodb");

router.get('/', async(req,res)=>{
    const {db, client} = await db_utils.get_db();

    if (!req.cookies.session) {
        res.redirect('/login')
    }
    const {session, user} = await session_utils.get_user_data(req.cookies.session, db)

    if(user.type !== 'admin'){
        res.redirect('/profile')
    }

    res.render('./admin/admin.ejs')
})

router.get("/verify", async (req, res) => {
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


    res.render("./admin/verify.ejs", {data: unverifiedUsers});
    await  client.close()
});

router.post('/verify', async(req,res)=>{
    const {db, client} = await db_utils.get_db();

    if (!req.cookies.session) {
        res.redirect('/login')
    }
    const {session, user} = await session_utils.get_user_data(req.cookies.session, db)

    if(user.type !== 'admin'){
        res.redirect('/profile')
    }
    const users = await db.collection('users')
    // console.log(req.body.user)
    await users.findOneAndUpdate({_id: new ObjectId(req.body.user)}, {$set: {verified: true}})
    res.redirect('/admin')
    await client.close()
})

router.get("/subjects", async (req, res) => {
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


    res.render("./admin/subjects.ejs", {data: data});
    await  client.close()
});

router.post('/subjects', async(req,res)=>{
    const {db, client} = await db_utils.get_db();

    if (!req.cookies.session) {
        res.redirect('/login')
    }
    const {session, user} = await session_utils.get_user_data(req.cookies.session, db)

    if(user.type !== 'admin'){
        res.redirect('/profile')
    }
    const subjects = await db.collection("subjects")
    const chapters = await db.collection('chapters')

    const subjectToInsert = req.body["subject"].toLowerCase()
    const chapterToInsert = req.body["chapter"].toLowerCase()
    const topicToInsert = req.body["topic"].toLowerCase()

    if(!subjectToInsert||!chapterToInsert||!topicToInsert){
        res.redirect('/admin/subjects')
        return
    }

    let subjectFind = await subjects.findOne({name: subjectToInsert})



    if(!subjectFind){
        await subjects.insertOne({
            name: subjectToInsert
        })
    }

    subjectFind = await subjects.findOne({name: subjectToInsert})
    const chapterFind = await chapters.findOne({name: chapterToInsert, subjectId: subjectFind._id})

    if(!chapterFind){
        await chapters.insertOne({
            subjectId: subjectFind._id,
            name: chapterToInsert,
            topics: [topicToInsert]
        })
    }else{
        let topicsArray = chapterFind.topics
        console.log(topicsArray)
        topicsArray.push(topicToInsert)
        await chapters.findOneAndUpdate({_id: chapterFind._id}, {$set: {topics: topicsArray}})
    }



    res.redirect('/admin/subjects')
    await client.close()
})


module.exports = router;