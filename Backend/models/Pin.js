const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema(
  {
    dealername: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
      min: 3,
      max: 60,
    },
    desc: {
      type: String,
      required: true,
      min: 3,
    },
    phone: {
      type: Number,
      required: true,
      min: 10,
    },
    long: {
      type: Number,
      required: true,
    },
    lat: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pins", PinSchema);