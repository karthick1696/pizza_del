const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://karthickraja:Kr9551881151@pizzacluster.9sqzj.mongodb.net/pizzaDbase"
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
