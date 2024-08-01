const router = require('express').Router();
const authRouter = require('./auth.api.router');
const petsitterRouter = require('./petsitter.api.router');
const bookingRouter = require('./booking.api.router');
const petRouter = require('./pet.api.router');
const tokenRouter = require('./token.api.router');

router.use('/tokens', tokenRouter);
router.use('/auth', authRouter);
router.use('/petsitter', petsitterRouter);
router.use('/petsitterbooking', bookingRouter);
router.use('/owneraccount', petRouter);


module.exports = router;
