const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const indexRouter = require('./routes/indexRouter')
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.static('public'))
app.set('views', 'views')
app.set('view engine', 'ejs')

app.get('/', indexRouter)

app.listen(80, ()=>{
    console.log('Listening on port 80')
})