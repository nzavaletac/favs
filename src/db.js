const mongoose = require("mongoose");

function connect() {
  mongoose.connect("mongodb://localhost:27017/dbfavs");

  mongoose.connection.once("open", () => {
    console.log("Database successfullyt connected.");
  });
  mongoose.connection.on("error", () => {
    console.log("Something went wrong.");
  });
}

module.exports = { connect };
