//app.js
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import moment from 'moment'

import { config } from './config'
import product from './routes/product.route'

const app = express()

// use body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// list of routes
app.use(`/${ config.API_PATH }/products`, product)

// connection to db
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
mongoose.Promise = global.Promise
let db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', function () {
  console.log("Connected to DB ", moment().format('LLL'))
})

// start server
app.listen(config.PORT, () => {
    console.log('Server is up and running on port number ' + config.PORT)
})

export default app