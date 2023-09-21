const mongoose = require("mongoose");
const schema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: Number,
    phone: Number,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("user", schema);
