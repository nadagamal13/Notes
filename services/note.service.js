const noteModel = require("../models/note.model");
module.exports.addNote = async (req, res) => {
  const { title, description } = req.body;
  await noteModel.insertMany({ title, description, createdBy: req.id });
  res.json({ message: "note added" });
};
module.exports.allNotes = async (req, res) => {
  const note = await noteModel.find({ createdBy: req.id });
  res.json({ message: "my notes", note });
};
module.exports.updateNote = async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;
  const note = await noteModel.findById({ _id: id });
  if (JSON.stringify(note.createdBy) == JSON.stringify(req.id)) {
    await noteModel.updateOne({ _id: id }, { title, description });
    res.json({ message: "updated" });
  } else {
    res.json({ message: "you can't updated" });
  }
};
module.exports.deleteNote = async (req, res) => {
  const { id } = req.params;
  const note = await noteModel.findById({ _id: id });
  if (JSON.stringify(note.createdBy) == JSON.stringify(req.id)) {
    await noteModel.deleteOne({ _id: id });
    res.json({ message: "Deleted" });
  } else {
    res.json({ message: "you can't delete" });
  }
};
