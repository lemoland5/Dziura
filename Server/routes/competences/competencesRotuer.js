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


    const subjects = await db.collection("subjects").find()

    let subjectsData = Array()

    for await (const doc of subjects) {
        const chapters = await db.collection('chapters').find({subjectId: doc['_id']})

        let chaptersArray = Array()
        let topicsArray = Array()
        for await (const dc of chapters) {
            chaptersArray.push(dc['name'])
            topicsArray.push(dc['topics'])
        }
        subjectsData.push({subject: doc['name'], chapters: chaptersArray, topics: topicsArray})
    }



    const competencesSubjects = await db.collection('competencesSubjects')
    const competencesChapters = await db.collection('competencesChapters')

    const userCompetencesSubjects = await competencesSubjects.find({userId: user._id})

    let competencesData = Array()

    for await (const doc of userCompetencesSubjects) {
        const userCompetencesChapters = await competencesChapters.find({subjectId: doc['_id']})


        let chaptersArray = Array()
        let topicsArray = Array()
        for await (const dc of userCompetencesChapters) {
            chaptersArray.push(dc['name'])
            topicsArray.push(dc['topics'])
        }
        competencesData.push({subject: doc['name'], chapters: chaptersArray, topics: topicsArray})
    }

    res.render("./kompetencje/index.ejs", {competences: competencesData, subjects: subjectsData});
    await client.close()


});

router.post('/', async(req,res)=>{
    const {db, client} = await db_utils.get_db();
    const {session, user} = await session_utils.get_user_data(req.cookies.session, db)
    const competencesSubjects = await db.collection('competencesSubjects')
    const competencesChapters = await db.collection('competencesChapters')




    const subject = req.body["subject"]
    const chapter = req.body["chapter"]
    const topic = req.body["topic"]

    console.log(subject,chapter,topic)

    if(!subject||!chapter||!topic){
        res.redirect('/competences')
        return
    }

    let subjectFind = await competencesSubjects.findOne({name: subject})



    if(!subjectFind){
        await competencesSubjects.insertOne({
            userId: user._id,
            name: subject
        })
    }

    subjectFind = await competencesSubjects.findOne({name: subject})
    const chapterFind = await competencesChapters.findOne({name: chapter, subjectId: subjectFind._id})

    if(!chapterFind){
        await competencesChapters.insertOne({
            subjectId: subjectFind._id,
            name: chapter,
            topics: [topic]
        })
    }else{
        let topicsArray = chapterFind.topics
        if (!topicsArray.includes(topic)){
            topicsArray.push(topic)
            await competencesChapters.findOneAndUpdate({_id: chapterFind._id}, {$set: {topics: topicsArray}})
        }
    }


    res.redirect('/competences')
    await client.close();
})


module.exports = router;