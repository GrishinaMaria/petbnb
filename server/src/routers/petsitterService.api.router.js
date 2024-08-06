const router = require('express').Router();
const { PetsitterService, Service } = require('../../db/models');

router.post('/', async (req, res) => {
    try {
        const { sitterId, serviceId, price, petType } = req.body;
        const petsitterService = await PetsitterService.create({ sitterId, serviceId, price, petType });
        if (petsitterService) {
            res.status(200).json(petsitterService);
            return;
        }
        res.status(400).json({ message: 'can not create new petsitterService' });
    } catch ({ message }) {
        res.status(500).json({ error: message })
    }
});
// router.get('/', async (req, res) => {
//     try {
        
//         const petsitterServices = await PetsitterService.findAll();
//         if (petsitterServices) {
//             res.status(200).json(petsitterServices);
//             return;
//         }
//         res.status(400).json({ message: 'petsitterServices not found' });
//     } catch ({ message }) {
//         res.status(500).json({ error: message })
//     }
// });
router.get('/all', async (req, res) => {
    try {
        // const { sitterId } = req.params;
        const petsitterService = await PetsitterService.findAll({ include: {model: Service, as: 'service'} });
        if (petsitterService) {
            res.status(200).json(petsitterService);
            return;
        }
        res.status(400).json({ message: 'petsitterService not found' });
    } catch ({ message }) {
        res.status(500).json({ error: message });
    }
});

router.get('/:sitterId', async (req, res) => {
    try {
        const { sitterId } = req.params;
        const petsitterService = await PetsitterService.findAll({ where: { sitterId }, include: {model: Service, as: 'service'} });
        if (petsitterService) {
            res.status(200).json(petsitterService);
            return;
        }
        res.status(400).json({ message: 'petsitterService not found' });
    } catch ({ message }) {
        res.status(500).json({ error: message });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await PetsitterService.destroy({
                        
      where: { id},
    });

    if (result > 0) {
      res.status(200).json({ message: 'success' });
      return;
    }

    res.status(400).json({ message: 'Can not delete service' });
    } catch ({ message }) {
        res.status(500).json({ error: message });
    }
})


module.exports = router;