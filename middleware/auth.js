var jwt = require("jsonwebtoken");
module.exports.auth = (req, res, next) => {
  const token = req.header("token");
  jwt.verify(token, "abcde", (err, decoded) => {
    if (err) {
      res.json({ message: "token error", err });
    } else {
      req.id = decoded.id;
      next();
    }
  });
};
