const router = require('express').Router();
const tasksRouter = require('./tasks.api.router');
const authRouter = require('./auth.api.router');
const tokenRouter = require('./token.api.router');

router.use('/tokens', tokenRouter);
router.use('/auth', authRouter);
router.use('/tasks', tasksRouter);

module.exports = router;
