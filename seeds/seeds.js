const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:"));
db.once("open", () => {
  console.log("Database connected successfully");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  console.log("DB Cleared");
  for (let index = 0; index < 50; index++) {
    const rand1000 = Math.floor(Math.random() * 1000 + 1);
    const camp = new Campground({
      location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
    });
    camp.save();
  }
};

seedDB()
.then(() => {
  mongoose.connection.close();
  console.log("Database connection closed");
  process.exit(1);
});
