const jwt = require('jsonwebtoken');
const { User } = require('../../db/models');

require('dotenv').config();

const verifyAccessToken = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(' ')[1]; // Bearer token
    const { user } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    res.locals.user = await User.findOne({ where: { email: user.email } });
    console.log('accessToken: ', accessToken);
    next();
  } catch (err) {
    console.log('Invalid access token');
    res.sendStatus(403);
  }
};

const verifyRefreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const { user } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    // res.locals.user = user;
    res.locals.user = await User.findOne({ where: { email: user.email } });
    console.log('refreshToken: ', refreshToken);
    next();
  } catch (err) {
    console.log('Invalid refresh token');
    res.clearCookie('refreshToken').sendStatus(401);
  }
};

module.exports = { verifyAccessToken, verifyRefreshToken };