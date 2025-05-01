const mongoose = require("mongoose");
const Movie = require("../models/movieModel");

exports.addMovie = async (req, res) => {
  try {
    const movie = req.body;
    const newMovie = await Movie(movie);
    await newMovie.save();
    res.status(200).json({
      success: true,
      message: "A new movie has been added",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json({
      success: true,
      message: "Movie list recovered successfully",
      data: movies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    const body = req.body;
    const updatedMovie = await Movie.findByIdAndUpdate(movieId, body, {
      returnDocument: "after",
    });
    res.status(200).json({
      success: true,
      data: updatedMovie,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: error.message,
    });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    await Movie.findByIdAndDelete(movieId);
    res.status(200).json({
      success: false,
      message: "Movie has been deleted succesfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
