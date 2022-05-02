const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://karthickraja:Kr9551881151@cluster0.c6k2f.mongodb.net/mern_pizza", { useUnifiedTopology: true, useNewUrlParser: true });

var db = mongoose.connection;

db.on("connected", () => {
  console.log("Mongo DB Connection Successfull");
});

db.on("error", () => {
  console.log(`Mongo DB Connection failed`);
});

module.exports = mongoose;
