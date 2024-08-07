const router = require("express").Router();
const { User, PetsitterService, Service } = require("../../db/models");
const { verifyAccessToken } = require("../middlewares/verifyToken");

const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../../client/public/profilePhoto')); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  }
});

const upload = multer({ storage: storage }).single('file');

router.post("/upload", (req, res) => {
  console.log('Получен запрос на загрузку файла');

  upload(req, res, (err) => {
    if (err) {
      console.error('Ошибка multer:', err);
      return res.status(500).json({ error: "Ошибка загрузки файла -----" });
    }
    if (!req.file) {
      console.error('Файл не был загружен');
      return res.status(400).json({ error: "Файл не был загружен" });
    }
    console.log('Файл успешно загружен:', req.file);
    return res.status(200).json({ message: "Файл успешно загружен" });
  });
});




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
        include: {model: PetsitterService, as: "availableServices", include: {model: Service, as: 'service'}}
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
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  // if (res.locals.user.role !== "owner") {
  //   return res.sendStatus(403);
  // }
  try {
    const oneSitter = await User.findOne({
      where: { id, role: "sitter" },
      attributes: ["id", "username", "email", "description", "experience", "photo", "geoX", "geoY", "city", "phone"], 
      include: {model: PetsitterService, as: "availableServices", include: {model: Service, as: 'service'}}
    });
    res.status(200).json({ oneSitter });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка" });
  }
});

module.exports = router;
