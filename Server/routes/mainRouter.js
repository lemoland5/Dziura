const express = require("express");
const router = express.Router();

const indexRouter = require('./index/indexRouter')
const loginRouter = require('./auth/loginRouter')
const registerRouter = require('./auth/registerRouter')
const notesRouter = require('./notes/notesRouter')
const profileRouter = require('./profile/profileRouter')
const competencesRouter = require('./competences/competencesRotuer')
const kor_dRouter = require('./korepetycje/kor-dRouter')
const kor_sRouter = require('./korepetycje/kor-sRouter')
const searchRouter = require('./search/searchRouter')
const adminRouter = require('./admin/adminRouter')

router.use('/', indexRouter)
router.use('/login', loginRouter)
router.use('/register', registerRouter)
router.use('/notes', notesRouter)
router.use('/profile', profileRouter)
router.use('/competences', competencesRouter)
router.use('/kor-d', kor_dRouter)
router.use('/kor-s', kor_sRouter)
router.use('/search', searchRouter)
router.use('/admin', adminRouter)

module.exports = router;
