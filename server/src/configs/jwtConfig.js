module.exports = {
  access: {
    expiresIn: 1000 * 60 * 2,
    algorithm: 'HS256',
  },
  refresh: {
    expiresIn: 1000 * 60 * 60 * 12,
    algorithm: 'HS256',
  },
};
