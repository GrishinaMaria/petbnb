const { Router } = require('express');
const { Message, User } = require('../../db/models');

const router = Router();

router.get('/:id', async (req, res) => {
  const messages = await Message.findAll({ include: User });
  res.json(messages);
});

module.exports = router;
