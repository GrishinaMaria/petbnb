const router = require('express').Router();
const { verifyRefreshToken } = require('../middlewares/verifyToken');
const generateTokens = require('../utils/generateToken');
const cookiesConfig = require('../configs/cookiesConfig');

router.get('/refresh', verifyRefreshToken, (req, res) => {
  const { accessToken, refreshToken } = generateTokens({
    user: res.locals.user,
  });
  // console.log('===>>> accessToken:  ', accessToken);
  // console.log('===>>> refreshToken: ', refreshToken);
  return res
    .cookie('refreshToken', refreshToken, cookiesConfig.refresh)
    .status(200)
    .json({ user: res.locals.user, accessToken });
});

module.exports = router;
