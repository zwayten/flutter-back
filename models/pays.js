const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    image: String,
    country: String,
    town: String,
    temperature: Number
});
module.exports = mongoose.model("pay", userSchema);