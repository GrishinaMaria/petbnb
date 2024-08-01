const router = require("express").Router();
const { Booking } = require("../../db/models");
const { verifyAccessToken } = require("../middlewares/verifyToken");

router.post("/:sitterId", verifyAccessToken, async (req, res) => {
    const { sitterId } = req.params
  const { totalPrice, startdate, enddate, petId } = req.body;
  if (res.locals.user.role !== "owner") {
    res.sendStatus(403);
    return;
  }
  try {
    const newServiceBooking = await Booking.create({
        totalPrice,
        startdate,
        enddate,
        sitterId,
        petId,
        ownerId: res.locals.user.id,
    });
    res.json(newServiceBooking);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});


module.exports = router;