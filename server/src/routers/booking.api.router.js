const router = require("express").Router();
const { Booking, BookedService, Service, Pet, User, sequelize } = require("../../db/models");
const { verifyAccessToken } = require("../middlewares/verifyToken");


router.post("/:sitterId", verifyAccessToken, async (req, res) => {
  const { sitterId } = req.params;
  const { totalPrice, startdate, enddate, petId, services } = req.body;
  
  if (res.locals.user.role !== "owner") {
    res.sendStatus(403);
    return;
  }

  const transaction = await sequelize.transaction();

  try {
    const newBooking = await Booking.create({
      sitterId,
      ownerId: res.locals.user.id,
      petId,
      totalPrice,
      startdate,
      enddate,
    }, { transaction });

    console.log("Services:", services);

    const bookedServices = services.map(service => ({
      bookingId: newBooking.id,
      serviceId: service.id,
    }));

    console.log("BookedServices:", bookedServices);

    await BookedService.bulkCreate(bookedServices, { transaction });

    await transaction.commit();
    res.status(201).json(newBooking);
  } catch (error) {

    await transaction.rollback();
    console.error("Error creating booking:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get("/", verifyAccessToken, async (req, res) => {
  try {
    console.log(res.locals.user);
    const bookings = await Booking.findAll({
      where: res.locals.user.role === "owner" ? { ownerId: res.locals.user.id } : { sitterId: res.locals.user.id },
      include: [
        { model: Pet, as: 'pet' },
        { model: User, as: 'sitter' },
        { model: User, as: 'owner' },
        // { model: BookedService, include: [Service] }
        { model: BookedService, as: 'bookedServices', include: [Service] } 
      ]
    });

    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Internal server error' });
  }
});




module.exports = router;