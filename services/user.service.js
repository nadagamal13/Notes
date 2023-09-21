const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
module.exports.signup = async (req, res) => {
  const { name, email, password, age, phone } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    res.json({ message: "email exists" });
  } else {
    bcrypt.hash(password, 4, async function (err, hash) {
      await userModel.insertMany({ name, email, password: hash, age, phone });
      res.json({ message: "signup success" });
    });
  }
};
module.exports.signin = async (req, res) => {
  const { email, password } = req.body;
  let user = await userModel.findOne({ email });
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      let token = jwt.sign(
        { role: "user", id: user._id, email: user.email },
        "abcde"
      );
      res.json({ message: "login", token });
    } else {
      res.json({ message: "wrong password" });
    }
  } else {
    res.json({ message: "wrong email" });
  }
};
module.exports.updateAccount = async (req, res) => {
  const { name, email, age, phone } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    res.json({ message: "email exists" });
  } else {
    await userModel.updateOne({ _id: req.id }, { name, email, age, phone });
    res.json({ message: "updated success" });
  }
};
module.exports.deleteAccount = async (req, res) => {
  await userModel.deleteOne({ _id: req.id });
  res.json({ message: "deleted" });
};
module.exports.changePassword = async (req, res) => {
  const { password } = req.body;
  bcrypt.hash(password, 4, async function (err, hash) {
    await userModel.updateOne({ _id: req.id }, { password: hash });
    res.json({ message: "password changed" });
  });
};
