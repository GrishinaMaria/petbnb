const router = require('express').Router();
const { verifyRefreshToken } = require('../middlewares/verifyToken');
const generateTokens = require('../utils/generateToken');
const cookiesConfig = require('../configs/cookiesConfig');

router.get('/refresh', verifyRefreshToken, (req, res) => {
  const jwtUser = { id: res.locals.user.id, email: res.locals.user.email };
  const { accessToken, refreshToken } = generateTokens({
    user: jwtUser,
  });
  // console.log('===>>> accessToken:  ', accessToken);
  // console.log('===>>> refreshToken: ', refreshToken);
  // console.log('===>>> res.locals.user: ', res.locals.user);

  return res
    .cookie('refreshToken', refreshToken, cookiesConfig.refresh)
    .status(200)
    .json({ user: res.locals.user, accessToken });
});

module.exports = router;
