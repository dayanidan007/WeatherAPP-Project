const express = require('express')
const app = express()
const path = require('path')
const moment = require('moment')
const api = require('./server/routes/api')

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/weatherDB', { useNewUrlParser: true })

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'nose_modules')))
app.use('/', api)

const port = 3000
app.listen(process.env.PORT || port, function () {
    console.log(`Here we go in port ${port}`)
})