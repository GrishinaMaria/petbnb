const router = require('express').Router();
const authRouter = require('./auth.api.router');
const petsitterRouter = require('./petsitter.api.router');
const bookingRouter = require('./booking.api.router');
const petRouter = require('./pet.api.router');
const tokenRouter = require('./token.api.router');
const serviceRouter = require('./service.api.router')
const petsitterServiceRouter = require('./petsitterService.api.router');

router.use('/tokens', tokenRouter);
router.use('/auth', authRouter);
router.use('/petsitter', petsitterRouter);
router.use('/services', serviceRouter);
router.use('/petsitterServices', petsitterServiceRouter);
router.use('/booking', bookingRouter);
router.use('/owneraccount', petRouter);


router.use("/tokens", tokenRouter);
router.use("/auth", authRouter);






module.exports = router;
