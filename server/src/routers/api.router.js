const router = require('express').Router();
const authRouter = require('./auth.api.router');
const petsitterRouter = require('./petsitter.api.router');
const tokenRouter = require('./token.api.router');
const serviceRouter = require('./service.api.router')
const petsitterServiceRouter = require('./petsitterService.api.router');

router.use('/tokens', tokenRouter);
router.use('/auth', authRouter);
router.use('/petsitter', petsitterRouter);
router.use('/services', serviceRouter);
router.use('/petsitterServices', petsitterServiceRouter);
// const router = require("express").Router();
// const authRouter = require("./auth.api.router");
// const tokenRouter = require("./token.api.router");
// const profileRouter = require("./profiles.api.router");

router.use("/tokens", tokenRouter);
router.use("/auth", authRouter);
// router.use("/profiles", profileRouter);


module.exports = router;
