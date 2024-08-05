const router = require('express').Router();
const { Pet } = require('../../db/models');
const { verifyAccessToken } = require('../middlewares/verifyToken');

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

// router.post('/owneraccount', async (req, res) => {
//   const { name, breed, type, description, photo, age } = req.body;
//   const newPet = new Pet({
//     name,
//     breed,
//     type,
//     description,
//     photo,
//     age,
//     owner: req.user._id,
//   });
//   try {
//     await newPet.save();
//     res.status(201).json(newPet);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// router.post('/', verifyAccessToken, async (req, res) => {
//   const { name, breed, type, description, photo, age } = req.body;
//   if (res.locals.user.role !== 'owner') {
//     return res.sendStatus(403);
//   }
//   try {
//     const newPet = Pet.build({
//       name,
//       breed,
//       type,
//       description,
//       photo,
//       age,
//       ownerId: res.locals.user.id,
//     });
//     await newPet.save();
//     res.status(201).json(newPet);
//   } catch (error) {
//     console.error(error);
//     res.sendStatus(400);
//   }
// });

router.patch('/owneraccount/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const updatedPet = await Pet.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).json(updatedPet);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
