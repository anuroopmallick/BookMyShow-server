const Show = require("../models/showModel");
const Theatre = require("../models/theatreModel");

exports.getAllShowsByTheatre = async (req, res) => {
  try {
    const { theatreId } = req.body;
    const allShows = await Show.find({ theatre: theatreId }).populate("movie");
    res.status(200).json({
      success: true,
      message: "Retrieved shows for theatre",
      data: allShows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllTheatresByMovie = async (req, res) => {
  try {
    const { movie, date } = req.body;
    const shows = await Show.find({ movie, date }).populate("theatre");

    let uniqueTheatres = [];
    shows.forEach((show) => {
      let isTheatre = uniqueTheatres.find((theatre) => {
        return theatre._id === show.theatre._id;
      });

      if (!isTheatre) {
        const showsOfThisTheatre = shows.filter((showObj) => {
          return showObj.theatre._id == show.theatre._id;
        });

        uniqueTheatres.push({
          ...show.theatre._doc,
          shows: showsOfThisTheatre,
        });
      }
    });

    res.status(200).json({
      success: true,
      message: "All theatres by movie and date",
      data: uniqueTheatres,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getShowById = async (req, res) => {
  try {
    const { id } = req.params;
    const show = await Show.findById(id).populate("movie").populate("theatre");
    res.status(200).json({
      success: true,
      message: "Retrived the show",
      data: show,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.addShow = async (req, res) => {
  try {
    const data = new Show(req.body);
    await data.save();
    res.status(200).json({
      success: true,
      message: "Show added successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateShow = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const updatedShow = await Show.findByIdAndUpdate(id, update);
    res.status(200).json({
      success: true,
      message: "Show has been updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteShow = async (req, res) => {
  try {
    const { id } = req.params;
    await Show.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Show has been deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
