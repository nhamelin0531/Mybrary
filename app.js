if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const path = require('path')
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')

const app = express()

// Set view engine
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.set('layout', 'layouts/layout')

// Public Folder
app.use(express.static(path.join(__dirname, '/public')))

// Mongoose shenanigans
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', err => console.error(err))
db.once('open', () => console.log('Connected to database'))

// Router
app.use('/', require('./routes/router'))

app.listen(process.env.PORT || 3000)