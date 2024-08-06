const router = require('express').Router();
const { User } = require('../../db/models');
const cookieConfig = require('../configs/cookiesConfig');
const bcrypt = require('bcrypt');
const generateTokens = require('../utils/generateToken');

router.post('/signup', async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!(username && email && password && role)) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const [user, isCreated] = await User.findOrCreate({
      where: { email },
      defaults: {
        username,
        email,
        role,
        password: await bcrypt.hash(password, 10),
      },
    });

    if (!isCreated) {
      return res.status(400).json({ message: 'User already exists' });
    } else {
      const plainUser = user.get();
      delete plainUser.password;
      delete plainUser.createdAt;
      delete plainUser.updatedAt;

      const jwtUser = { id: plainUser.id, email: plainUser.email };

      //! вот здесь передавался неправельный payload вида generateTokens(plainUser)
      //! а нужно было generateTokens({ user: plainUser })

      const { accessToken, refreshToken } = generateTokens({ user: jwtUser });

      res
        .cookie('refreshToken', refreshToken, cookieConfig.refresh)
        .json({ user: plainUser, accessToken });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const user = await User.findOne({ where: { email } });

  const isCorrectPassword = await bcrypt.compare(password, user.password);

  if (!isCorrectPassword) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  } else {
    const plainUser = user.get();
    delete plainUser.password;
    delete plainUser.createdAt;
    delete plainUser.updatedAt;

    const jwtUser = { id: plainUser.id, email: plainUser.email };
    const { accessToken, refreshToken } = generateTokens({ user: jwtUser });

    res
      .cookie('refreshToken', refreshToken, cookieConfig.refresh)
      .json({ user: plainUser, accessToken });
  }
});

router.get('/logout', async (req, res) => {
  try {
    res.clearCookie('refreshToken').sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

module.exports = router;
