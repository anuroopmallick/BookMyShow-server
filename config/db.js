const mongoose = require("mongoose");
// require("dotenv").config({path: "../.env"});
// console.log(process.env.mongo_url);

async function connectToDb() {
  try {
    await mongoose.connect(process.env.mongo_url);
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = connectToDb;
