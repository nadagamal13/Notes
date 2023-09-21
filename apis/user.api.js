const { auth } = require("../middleware/auth");
const {
  signup,
  signin,
  updateAccount,
  deleteAccount,
  changePassword,
} = require("../services/user.service");

const app = require("express").Router();
app.post("/signup", signup);
app.post("/signin", signin);
app.put("/updateAccount", auth, updateAccount);
app.delete("/deleteAccount", auth, deleteAccount);
app.put("/changePassword", auth, changePassword);
module.exports = app;
