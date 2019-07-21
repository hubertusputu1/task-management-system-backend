require('dotenv').config()
let config = {}

config.PORT = process.env.PORT || '6000'
config.MONGODB_URI = process.env.MONGODB_URI
config.API_PATH = process.env.API_PATH || 'api'

exports.config = config