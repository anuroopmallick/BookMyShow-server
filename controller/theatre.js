const mongoose = require("mongoose");
const Theatre = require("../models/theatreModel");

exports.addTheatre = async (req, res) => {
  try {
    const theatre = new Theatre(req.body);
    await theatre.save();
    res.status(200).json({
      success: true,
      message: "Theatre added successfully",
      data: theatre,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getAllTheatre = async (req, res) => {
  try {
    const theatres = await Theatre.find().populate("owner");
    res.status(200).json({
      success: true,
      message: "Retrieved the theatre list",
      data: theatres,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateTheatre = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const updatedTheatre = await Theatre.findByIdAndUpdate(id, body, {
      returnDocument: "after",
    });
    res.status(200).json({
      success: true,
      message: "Theatre updated successfully",
      data: updatedTheatre,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteTheatre = async (req, res) => {
  try {
    const id = req.params.id;
    await Theatre.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Theatre deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllTheatresPartnerOwns = async (req, res) => {
  try {
    let { ownerId } = req.params;
    const TheatresOwnerByPartner = await Theatre.find({ owner: ownerId });
    res.status(200).json({
      success: true,
      message: "Theatres owner by Partner is fetched",
      data: TheatresOwnerByPartner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
