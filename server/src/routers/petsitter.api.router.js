const router = require("express").Router();
const { User, PetsitterService, Service } = require("../../db/models");
const { verifyAccessToken } = require("../middlewares/verifyToken");

router.patch("/", verifyAccessToken, async (req, res) => {
  const { username, description, experience, photo, geoX, geoY, city, phone } = req.body;
  if (res.locals.user.role !== "sitter") {
    res.sendStatus(403);
    return;
  }
  try {
    const updatedSitterInfo = await User.update(
      { username, description, experience, photo, geoX, geoY, city, phone },
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

// ВСЕ петситтеры - доступно для всех, в т.ч. для неюзеров
router.get("/all", async (req, res) => {
  try {
    const allSitters = await User.findAll({
      where: { role: "sitter" },
      attributes: ["id", "username", "description", "experience", "photo", "geoX", "geoY", "city", "phone"], 
      include: {model: PetsitterService, as: "availableServices", include: {model: Service, as: 'service'}}
    });
    res.status(200).json({ allSitters });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка" });
  }
});

// один петситтер по айди
router.get("/:id", verifyAccessToken, async (req, res) => {
  const { id } = req.params;
  if (res.locals.user.role !== "owner") {
    return res.sendStatus(403);
  }
  try {
    const oneSitter = await User.findOne({
      where: { id, role: "sitter" },
      attributes: ["id", "username", "email", "description", "experience", "photo", "geoX", "geoY", "city", "phone" ], 
    });
    res.status(200).json({ oneSitter });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка" });
  }
});

module.exports = router;
