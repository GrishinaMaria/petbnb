const router = require('express').Router()
const { Service, PetsitterService } = require('../../db/models');

router
    .get("/", async (req, res) => {
        try {
            const services = await Service.findAll();
            if (services) {
                res.status(200).json(services);
                return;
            }
            res.status(400).json({ message: 'services not found' })
        } catch ({ message }) {
          res.status(500).json({ error: message });
        }
    });
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const service = await Service.findOne({ where: { id }, include: {model: PetsitterService} });
        if (service) {
            res.status(200).json(service);
            return;
        }
        res.status(400).json({ message: 'service not found' });
    } catch ({ message }) {
        res.status(500).json({ error: message });
    }
});
router.post('/', async (req, res) => {
    try {
        const { title } = req.body;
        const service = await Service.create({ title });
        if (service) {
            res.status(200).json(service);
            return;
        }
        res.status(400).json({ message: 'can not create service' })
    } catch ({ message }) {
        res.status(500).json({ error: message })
    }
});

module.exports = router;