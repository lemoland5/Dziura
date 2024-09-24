const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const db_utils = require("../lib/db_utilities");
const crypto = require("crypto");
const mongodb = require("mongodb");
const session_utils = require("../lib/session_utilities")

router.get("/", async (req, res) => {
  const { db, client } = await db_utils.get_db();
  let name = null;
  console.log(req.cookies); 

  if (!req.cookies.session) {
    res.redirect('./login')  
  }
  const {session, user} = await session_utils.get_user_data(req.cookies.session, db)

  name = user.username || "Stranger";
  console.log(name);
  await client.close();
  res.render("./index/index.ejs", { name: name });
});

router.get("/login", async (req, res) => {
  res.render("./logowanie-rejestracja/login.ejs");
});

router.get("/register", async (req, res) => {
  res.render("./logowanie-rejestracja/rejestracja.ejs");
});

router.post("/register/register", async (req, res) => {
  const db = await db_utils.get_db();

  const salt = crypto.randomBytes(16).toString("base64");
  const passwordOld = req.body.password;

  const passwordNew = crypto
    .createHash("sha256")
    .update(passwordOld + salt)
    .digest("base64");

  await db.db.collection("users").insertOne({
    username: req.body.username,
    type: "student",
    profile_picture: undefined,
    created: Date.now(),
    email: req.body.email,
    verified: true,
    password: {
      hash: passwordNew,
      salt: salt,
    },
    social_links: undefined,
  });

  db.client.close();
  res.redirect("../login");
});

router.get("/profile", async (req, res) => {
  const {db, client} = await db_utils.get_db();



  if (!req.cookies.session) {
    res.redirect('./login')  
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

router.get("/notes", async (req, res) => {
    const {db, client} = await db_utils.get_db();

    if (!req.cookies.session) {
        res.redirect('./login')  
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

router.get("/competences", async (req, res) => {
  res.render("./kompetencje/index.ejs");
});

router.get("/kor-d", async (req, res) => {
  res.render("./korepetycje/kor-d.ejs");
});

router.get("/kor-s", async (req, res) => {
  res.render("./korepetycje/kor-s.ejs");
});

router.get("/search", async (req, res) => {
  res.render("./korepetycje/kor-s.ejs");
});

router.get("/user/:user", async (req, res) => {
  //if :user = @me -> get user from session
  const db = db.get_db();
  const users = db.collection("users");
  let user_id = null;
  if (req.params.user === "@me") {
    //get user from session
    const session = await db.check_session(req.cookies.session);
    if (session === null) {
      res.status(401).json({ message: "Unauthorized" });
      db.close();
      return;
    }
    user_id = session.user;
  } else {
    user_id = req.params.user;
  }
  const user = await users.findOne({ user: user_id });
  if (user === null) {
    res.status(404).json({ message: "User not found" });
    db.close();
    return;
  }
  //if user not verified send 403
  if (!user.verified) {
    res.status(403).json({ message: "User not verified" });
    db.close();
    return;
  }
  //send user without password data
  delete user.password;
  res.status(200).json(user);
  db.close();
});

module.exports = router;
