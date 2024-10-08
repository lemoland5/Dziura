const express = require("express");
const router = express.Router();
const db_utils = require("../../lib/db_utilities");
const session_utils = require("../../lib/session_utilities")

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