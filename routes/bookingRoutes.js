const bookingRouter = require("express").Router();
const {
  makePayment,
  bookShow,
  getAllBookings,
} = require("../controller/booking");
const authMiddlewware = require("../middleware/authMiddleware");

//add a booking
bookingRouter.post("/make-payment", authMiddlewware, makePayment);

//get all booking
bookingRouter.post("/book-show", authMiddlewware, bookShow);

//update a booking
bookingRouter.post("/get-all-bookings", getAllBookings);

module.exports = bookingRouter;
