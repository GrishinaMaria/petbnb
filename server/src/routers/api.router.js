const router = require("express").Router();
const authRouter = require("./auth.api.router");
const tokenRouter = require("./token.api.router");
const profileRouter = require("./profiles.api.router");

router.use("/tokens", tokenRouter);
router.use("/auth", authRouter);
router.use("/profiles", profileRouter);

module.exports = router;
