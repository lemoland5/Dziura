const express = require('express')
const {Router} = require("express");
const router = Router()

router.get('/', (req,res)=>{
    res.send('sss')
})

module.exports = router;