const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
app.use(express.json());
app.use("/", require("./apis/user.api"));
app.use("/note", require("./apis/note.api"));
app.use("*", (req, res) => {
  res.json({ message: "wrong path" });
});
mongoose
  .connect("mongodb://localhost:27017/notes")
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
