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
    res.render("./kompetencje/index.ejs");


});

router.get("/subjects", async (req, res) => {
    const {db, client} = await db_utils.get_db();

    if (!req.cookies.session) {
        res.redirect('/login')
    }
    const {session, user} = await session_utils.get_user_data(req.cookies.session, db)

    const competences = await db.collection('competencesSubjects')

    const userCompetences = await competences.findOne({userId: user._id})
    console.log(userCompetences)
    res.render("./kompetencje-dodaj/przedmioty.ejs", {data: userCompetences});
    await client.close()
});
router.post('/subjects', async(req,res)=>{
    const {db, client} = await db_utils.get_db();
    const {session, user} = await session_utils.get_user_data(req.cookies.session, db)
    const competences = await db.collection('competences')

    const userCompetences = await competences.findOne({userId: new ObjectId(req.body.userId)})
    const subject = req.body.subject
    if (!userCompetences){
        const competencesSubjectSchema = {
            userId: user._id,
            subjects: [subject],
        }
        await competences.insertOne(competencesSubjectSchema);
    }else{
        const subjectsArray = await userCompetences.subjects;
        subjectsArray.push(subject)
        await competences.updateOne({userId: new ObjectId(req.body.userId)}, {$set: {subjects: subjectsArray}})
    }

    res.redirect('/competences/subjects')
    await client.close();
})


router.get("/chapters", async (req, res) => {
    const {db, client} = await db_utils.get_db();

    if (!req.cookies.session) {
        res.redirect('/login')
    }
    const {session, user} = await session_utils.get_user_data(req.cookies.session, db)

    const competences = await db.collection('competencesChapters')

    const userCompetences = await competences.findOne({userId: new ObjectId(user._id)})

    res.render("./kompetencje-dodaj/dzialy.ejs", {data: userCompetences});
});
router.post('/chapters', async(req,res)=>{
    const {db, client} = await db_utils.get_db();
    const {session, user} = await session_utils.get_user_data(req.cookies.session, db)
    const competences = await db.collection('competencesSubjects')

    const userCompetences = await competences.findOne({userId: new ObjectId(req.body.userId)})
    const subject = req.body.subject
    if (!userCompetences){
        const competencesSubjectSchema = {
            userId: user._id,
            subjects: [subject],
        }
        await competences.insertOne(competencesSubjectSchema);
    }else{
        const subjectsArray = await userCompetences.subjects;
        subjectsArray.push(subject)
        await competences.updateOne({userId: new ObjectId(req.body.userId)}, {$set: {subjects: subjectsArray}})
    }

    res.redirect('/competences/subjects')
    await client.close();
})

router.get("/topics", async (req, res) => {
    const {db, client} = await db_utils.get_db();

    if (!req.cookies.session) {
        res.redirect('/login')
    }
    const {session, user} = await session_utils.get_user_data(req.cookies.session, db)
    res.render("./kompetencje-dodaj/tematy.ejs");
});

module.exports = router;