const express = require("express");
const showRouter = express.Router();
const {
  getAllShowsByTheatre,
  getAllTheatresByMovie,
  getShowById,
  addShow,
  updateShow,
  deleteShow,
} = require("../controller/show");

showRouter.post("/", addShow);

showRouter.put("/:id", updateShow);

showRouter.delete("/:id", deleteShow);

showRouter.post("/get-all-shows-by-theatre", getAllShowsByTheatre);

showRouter.get("/get-all-theatres-by-movie", getAllTheatresByMovie);

showRouter.get("/:id", getShowById);

module.exports = showRouter;
