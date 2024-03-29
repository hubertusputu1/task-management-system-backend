require('dotenv').config()
let config = {}

config.PORT = process.env.PORT
config.MONGODB_URI = process.env.MONGODB_URI
config.API_PATH = process.env.API_PATH
config.EMAIL_SERVICE = process.env.EMAIL_SERVICE
config.EMAIL_USERNAME = process.env.EMAIL_USERNAME
config.EMAIL_PASSWORD = process.env.EMAIL_PASSWORD

exports.config = config