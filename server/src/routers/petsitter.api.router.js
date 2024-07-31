const router = require("express").Router();
const { User } = require("../../db/models");
const { verifyAccessToken } = require("../middlewares/verifyToken");

router.patch("/", verifyAccessToken, async (req, res) => {
  const { description, experience, photo, geoX, geoY, city, phone } = req.body;
  if (res.locals.user.role !== "sitter") {
    res.sendStatus(403);
    return;
  }
  try {
    const updatedSitterInfo = await User.update(
      { description, experience, photo, geoX, geoY, city, phone },
      {
        where: { id: res.locals.user.id },
      }
    );
    if (updatedSitterInfo) {
      const updatedSitter = await User.findByPk(res.locals.user.id);
      res.status(200).json(updatedSitter);
    } else {
      res.status(404).json({ message: "Ошибка, юзер не найден" });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

module.exports = router;
