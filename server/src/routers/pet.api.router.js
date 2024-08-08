const router = require('express').Router();
const { Pet } = require('../../db/models');
const { verifyAccessToken } = require('../middlewares/verifyToken');

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
// создаем питомца
router.post('/', verifyAccessToken, async (req, res) => {
  const { name, breed, type, description, photo, age } = req.body;
  if (res.locals.user.role !== 'owner') {
    res.sendStatus(403);
    return;
  }
  try {
    const newPet = await Pet.create({
      name,
      breed,
      type,
      description,
      photo,
      age,
      ownerId: res.locals.user.id,
    });
    res.json(newPet);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

// редактируем инфу о питомце
router.patch('/:petId', verifyAccessToken, async (req, res) => {
  const { petId } = req.params;
  const { name, breed, type, description, photo, age } = req.body;
  if (res.locals.user.role !== 'owner') {
    res.sendStatus(403);
    return;
  }
  try {
    const updatedPetInfo = await Pet.update(
      { name, breed, type, description, photo, age },
      {
        where: { id: petId, ownerId: res.locals.user.id },
      },
    );
    if (updatedPetInfo) {
      const updatedPet = await Pet.findByPk(petId);
      res.status(200).json(updatedPet);
    } else {
      res.status(404).json({ message: 'Ошибка!' });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

// получаем список всех питомцв владельца
router.get('/', verifyAccessToken, async (req, res) => {
  if (res.locals.user.role !== 'owner') {
    res.sendStatus(403);
    return;
  }
  try {
    const myPets = await Pet.findAll({
      where: { ownerId: res.locals.user.id },
    });
    res.status(200).json({ myPets });
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
});

// удалить профиль питомца
router.delete('/:id', verifyAccessToken, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPet = await Pet.findOne({ where: { id } });
    if (deletedPet.ownerId === res.locals.user.id) {
      deletedPet.destroy();
      res.sendStatus(200);
    } else {
      res.status(400).json({ message: 'Нет прав на удаление' });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

// поиск одного питомца по айди его владельца
router.get('/:id', verifyAccessToken, async (req, res) => {
  const { id } = req.params;
  if (res.locals.user.role !== 'owner') {
    return res.sendStatus(403);
  }
  try {
    const onePet = await Pet.findOne({
      where: { id, ownerId: res.locals.user.id },
      attributes: [
        'id',
        'name',
        'breed',
        'type',
        'description',
        'photo',
        'age',
      ],
    });

    if (!onePet) {
      return res.status(404).json({ error: 'Питомец не найден' });
    }

    res.status(200).json({ onePet });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка' });
  }
});

module.exports = router;
