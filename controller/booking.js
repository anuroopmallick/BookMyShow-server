const stripe = require("stripe")(process.env.stripe_key);
const Booking = require("../models/bookingModel");
const Show = require("../models/showModel");

exports.makePayment = async (req, res) => {
  try {
    const { token, amount } = req.body;
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      customer: customer.id,
      payment_method_types: ["card"],
      receipt_email: token.email,
      description: "Token has been assigned to the movie",
    });

    const transactionId = paymentIntent.id;
    res.send({
      success: true,
      message: "payment successfull! ticket(s) booked !",
      data: transactionId,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

exports.bookShow = async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();

    const show = await Show.findById(req.body.show).populate("movie");
    const updatedBookedSeats = [...show.bookedSeats, ...req.body.seats];
    await Show.findByIdAndUpdate(req.body.show, {
      bookedSeats: updatedBookedSeats,
    });

    res.send({
      success: true,
      message: "new booking done !",
      data: newBooking,
    });
  } catch (err) {
    console.log("Executing error");
    res.send({
      success: false,
      message: err.message,
    });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    // { user: req.userId }
    const bookings = await Booking.find().populate("user").populate("show");
    // .populate({
    //   path: "show",
    //   populate: {
    //     path: "movie",
    //     model: "movie",
    //   },
    // })
    // .populate({
    //   path: "show",
    //   populate: {
    //     path: "theatre",
    //     model: "theatre",
    //   },
    // });
    res.send({
      success: true,
      message: "booking fetched !",
      data: bookings,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};
