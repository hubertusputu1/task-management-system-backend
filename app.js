//app.js
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import moment from 'moment'
import cors from 'cors'
import path from 'path'
import session from 'express-session'
import errorHandler from 'errorhandler'

import { config } from './config'

const app = express()
const isProduction = process.env.NODE_ENV === 'production'

// use body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(cors())
app.use(require('morgan')('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }))

// models and routes
require('./models/users.model')
require('./config/passport')
app.use(require('./routes'))


if(!isProduction) {
  app.use(errorHandler())
}

// connection to db
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
mongoose.Promise = global.Promise
mongoose.set('debug', true)

let db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', function () {
  console.log("Connected to DB ", moment().format('LLL'))
})

//Error handlers & middlewares
app.use((req, res, err) => {
  res.status(err.status || 500)

  res.json({
    errors: {
      message: err.message,
      error: err,
    },
  })
})

// start server
app.listen(config.PORT, () => {
    console.log('Server is up and running on port number ' + config.PORT)
})

export default app