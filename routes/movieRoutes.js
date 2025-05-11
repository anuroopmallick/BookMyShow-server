const express = require("express");
const movieRouter = express.Router();
const {
  addMovie,
  getAllMovies,
  getMovie,
  updateMovie,
  deleteMovie,
} = require("../controller/movie");

// create a new movie
movieRouter.post("/", addMovie);

// get all movies
movieRouter.get("/", getAllMovies);

// get single movie
movieRouter.get("/:id", getMovie);

// Edit movie
movieRouter.put("/:id", updateMovie);

// Delete movie
movieRouter.delete("/:id", deleteMovie);

module.exports = movieRouter;
