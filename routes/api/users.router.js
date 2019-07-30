import express from 'express'

import auth from '../auth'

import UsersController from '../../controllers/users.controller'

const router = express.Router();

router.route('/')
.post(auth.optional, UsersController.createUser)

router.route('/signin')
.post(auth.optional, UsersController.login)

router.route('/current')
.get(auth.required, UsersController.currentUser)

module.exports = router;