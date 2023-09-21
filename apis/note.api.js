const { auth } = require("../middleware/auth");
const {
  addNote,
  allNotes,
  updateNote,
  deleteNote,
} = require("../services/note.service");
const app = require("express").Router();

app
  .post("/", auth, addNote)
  .get("/", auth, allNotes)
  .put("/:id", auth, updateNote)
  .delete("/:id", auth, deleteNote);

module.exports = app;
