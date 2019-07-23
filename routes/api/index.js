import express from 'express'
const router = express.Router();

router.use('/users', require('./users.router'));
router.use('/tasks', require('./tasks.router'));
router.use('/comments', require('./comments.router'));

module.exports = router;