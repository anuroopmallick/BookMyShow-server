const express = require("express");
const theatreRouter = express.Router();
const {
  addTheatre,
  getAllTheatre,
  updateTheatre,
  deleteTheatre,
  getAllTheatresPartnerOwns,
} = require("../controller/theatre");

theatreRouter.post("/", addTheatre);

theatreRouter.get("/get-all-theatres", getAllTheatre);

theatreRouter.put("/:id", updateTheatre);

theatreRouter.delete("/:id", deleteTheatre);

theatreRouter.get(
  "/get-all-theatres-by-owner/:ownerId",
  getAllTheatresPartnerOwns
);

module.exports = theatreRouter;
