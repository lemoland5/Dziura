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

router.post('/', async(req,res)=>{
    const {db, client} = await db_utils.get_db();
    const {session, user} = await session_utils.get_user_data(req.cookies.session, db)

    const competencesSubjects = await db.collection('competencesSubjects')
    const competencesChapters = await db.collection('competencesChapters')
    const users = await db.collection('users')

    const username = req.body['username']
    const subject = req.body["subject"]
    const chapter = req.body["chapter"]
    const topic = req.body["topic"]

    console.log(subject,chapter,topic)

    if(!subject&&!chapter&&!topic&&!username){
        res.redirect('/kor-s')
        return
    }



    if(!subject&&!chapter&&!topic&&username){
        const user = await users.findOne({username: username})
        if (user){
            res.render('./wyszukiwanie/wyniki.ejs', {data: [user]})
            return
        }else{
            res.render('./wyszukiwanie/wyniki.ejs', {data: false})
            await client.close()
            return
        }
    }
    if(subject&&!chapter&&!topic&&!username){
        const userCompetencesSubjects = await competencesSubjects.find({name: subject})
        if(userCompetencesSubjects){
            let data = Array()
            for await (const doc of userCompetencesSubjects){
                const user = await users.findOne({_id: doc['userId']})
                data.push(user)
            }
            res.render('./wyszukiwanie/wyniki.ejs', {data: data})
            return
        }else{
            res.render('./wyszukiwanie/wyniki.ejs', {data: false})
        }
    }
    if(subject&&chapter&&!topic&&!username){
        const userCompetencesSubjects = await competencesSubjects.find({name: subject})
        if(userCompetencesSubjects){
            let data = Array()
            for await (const doc of userCompetencesSubjects){
                const userCompetencesChapters = await competencesChapters.find({subjectId: doc['_id']})
                if (userCompetencesChapters){
                    for await (const dc of userCompetencesChapters){
                        if(dc['name']===chapter){
                            const userr = await users.findOne({_id: doc['userId']})
                            data.push(userr)
                    }}
                }else{
                    res.render('./wyszukiwanie/wyniki.ejs', {data: false})
                    return
                }


            }
            res.render('./wyszukiwanie/wyniki.ejs', {data: data})
            return
        }else{
            res.render('./wyszukiwanie/wyniki.ejs', {data: false})
        }
    }



    // subjectFind = await competencesSubjects.findOne({name: subject})
    // const chapterFind = await competencesChapters.findOne({name: chapter, subjectId: subjectFind._id})
    //
    // if(!chapterFind){
    //     await competencesChapters.insertOne({
    //         subjectId: subjectFind._id,
    //         name: chapter,
    //         topics: [topic]
    //     })
    // }else{
    //     let topicsArray = chapterFind.topics
    //     if (!topicsArray.includes(topic)){
    //         topicsArray.push(topic)
    //         await competencesChapters.findOneAndUpdate({_id: chapterFind._id}, {$set: {topics: topicsArray}})
    //     }
    // }
    await client.close()
})

module.exports = router;