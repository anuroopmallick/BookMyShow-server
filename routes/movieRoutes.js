const express = require("express");
const movieRouter = express.Router();
const {
  addMovie,
  getAllMovies,
  updateMovie,
  deleteMovie,
} = require("../controller/movie");

// create a new movie
movieRouter.post("/", addMovie);

// get all movies
movieRouter.get("/", getAllMovies);

// Edit movie
movieRouter.put("/:id", updateMovie);

// Delete movie
movieRouter.delete("/:id", deleteMovie);

module.exports = movieRouter;
