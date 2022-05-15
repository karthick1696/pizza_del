const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://Amritha:Amritha25@pizza-cluster.nkn9p.mongodb.net/pizza-db"
  , { useUnifiedTopology: true, useNewUrlParser: true }
);

var db = mongoose.connection;

db.on("connected", () => {
  console.log("Mongo DB Connection Successfull");
});

db.on("error", () => {
  console.log(`Mongo DB Connection failed`);
});

module.exports = mongoose;
