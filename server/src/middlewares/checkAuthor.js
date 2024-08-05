/* eslint-disable consistent-return */
const { User } = require('../../db/models');

module.exports = async (req, res, next) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(400).json({ message: 'wrong id' });
  if (res.locals.user?.id !== user.ownerId) {
    return res.status(403).json({ message: 'Not your user!' });
  }
  next();
};
