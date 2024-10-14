const express = require("express");
const routes = express.Router();
const NoteModel = require("../models/NotesModel.js");

//TODO - Create a new Note
//http://mongoosejs.com/docs/api.html#document_Document-save
routes.post("/notes", (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Note content can not be empty",
    });
  }

  //TODO - Write your code here to save the note
  const noteData = req.body;
  console.log("note data", noteData);
  try {
    const note = new NoteModel(noteData);
    const newNote = note.save();
    res.send(newNote);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

//TODO - Retrieve all Notes
//http://mongoosejs.com/docs/api.html#find_find
routes.get("/notes", (req, res) => {
  //TODO - Write your code here to returns all note
  NoteModel.find()
    .then((notes) => {
      res.send(notes);
    })
    .catch((e) => {
      res.status(500).send({ message: e.message });
    });
});

//TODO - Retrieve a single Note with noteId
//http://mongoosejs.com/docs/api.html#findbyid_findById
routes.get("/notes/:noteId", (req, res) => {
  //TODO - Write your code here to return onlt one note using noteid
  NoteModel.findById(req.params.noteId)
    .then((note) => {
      if (note) {
        res.send(note);
      } else {
        res.status(404).send({ message: "Note not found" });
      }
    })
    .catch((e) => {
      res.status(500).send({ message: e.message });
    });
});

//TODO - Update a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
routes.put("/notes/:noteId", (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Note content can not be empty",
    });
  }
  //TODO - Write your code here to update the note using noteid
  NoteModel.findByIdAndUpdate(req.params.noteId, req.body, { new: true })
    .then((note) => {
      if (note) {
        res.send(note);
      } else {
        res.status(404).send({ message: "Note not found" });
      }
    })
    .catch((e) => {
      res.status(500).send({ message: e.message });
    });
});

//TODO - Delete a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
routes.delete("/notes/:noteId", (req, res) => {
  //TODO - Write your code here to delete the note using noteid
  NoteModel.findByIdAndDelete(req.params.noteId)
    .then((note) => {
      if (note) {
        res.send(note);
      } else {
        res.status(404).send({ message: "Note not found" });
      }
    })
    .catch((e) => {
      res.status(500).send({ message: e.message });
    });
});

module.exports = routes;
