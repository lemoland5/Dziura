const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const db_utils = require('../lib/db_utilities')
const crypto = require('crypto')


router.get('/', async (req,res)=>{
    const db = await db_utils.get_db();
    let name = null;
    if(req.cookies.session)
    {
        name = await db.collection('users').findOne({user: req.cookies.session.user}).name;
    }
    name = name || 'Stranger';
    // console.log(name);
    res.render("./public/index.ejs", {name: name})
    db.client.close();
});


router.get('/login', async (req, res)=>{
    res.render("./logowanie-rejestracja/login.ejs")
})

router.get('/register', async (req, res)=>{
    res.render("./logowanie-rejestracja/rejestracja.ejs")
})

router.post('/register/register', async(req, res)=>{
    const db = await db_utils.get_db();

    const salt = crypto.randomBytes(16).toString('base64');
    const passwordOld = req.body.password;

    const passwordNew = crypto.createHash('sha256').update(passwordOld + salt).digest('base64')


    await db.db.collection('users').insertOne(
        {
            username: req.body.username,
            type: "student",
            profile_picture: undefined,
            created: Date.now(),
            email: req.body.email,
            verified: true,
            password: {
                hash: passwordNew,
                salt: salt
            },
            social_links:undefined
        }
    )

    db.client.close()
    res.redirect('../login')
})

router.get('/profile', async (req, res)=>{
    const db = await db_utils.get_db();

    let id = null
    if(req.cookies.session){
        id = await db.collection('users').findOne({user: req.cookies.session.user})._id;
    
    }

    if(!id){
        res.redirect('./login')
    }

    res.render("./profil/profile.ejs")
})

router.get('/notes', async (req, res)=>{
    res.render("./notatki/notatki.ejs")
})

router.get('/competences', async (req, res)=>{
    res.render("./kompetencje/index.ejs")
})

router.get('/kor-d', async (req, res)=>{
    res.render("./korepetycje/kor-d.ejs")
})

router.get('/kor-s', async (req, res)=>{
    res.render("./korepetycje/kor-s.ejs")
})

router.get('/search', async (req, res)=>{
    res.render("./korepetycje/kor-s.ejs")
})

router.get('/user/:user', async (req,res)=>{
    //if :user = @me -> get user from session
    const db = db.get_db();
    const users = db.collection('users');
    let user_id = null;
    if(req.params.user === '@me')
    {
        //get user from session
        const session = await db.check_session(req.cookies.session);
        if (session === null)
        {
            res.status(401).json({message: 'Unauthorized'});
            db.close();
            return;
        }
        user_id = session.user;
    }else{
        user_id = req.params.user;
    }
    const user = await users.findOne({user: user_id});
    if(user === null){
        res.status(404).json({message: 'User not found'});
        db.close();
        return;
    }
    //if user not verified send 403
    if(!user.verified){
        res.status(403).json({message: 'User not verified'});
        db.close();
        return;
    }
    //send user without password data
    delete user.password;
    res.status(200).json(user);
    db.close();
});

module.exports = router;
