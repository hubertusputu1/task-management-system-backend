import express from 'express'

import auth from '../auth'

import CommentsController from '../../controllers/comments.controller'

const router = express.Router();

router.route('/')
.get(auth.required, CommentsController.getAllComments)
.post(auth.required, CommentsController.createComment)

router.route('/:id')
.delete(auth.optional, CommentsController.deleteComment)

module.exports = router;