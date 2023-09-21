const mongoose = require("mongoose");
const schema = mongoose.Schema(
  {
    title: String,
    description: String,
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("note", schema);
