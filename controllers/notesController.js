import Note from "../models/noteModel.js";

// Create a new note
export const createNote = async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    const note = await Note.create({
      userId: req.user._id,
      title,
      content,
      tags
    });

    res.status(201).json({
      message: "Note created successfully",
      status: true,
      note
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false
    });
  }
};


// Get all notes for a user
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user._id }).sort({ updatedAt: -1 });
    res.json({
      status: true,
      notes
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false
    });
  }
};


// Delete a note
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    await Note.findByIdAndDelete(id);
    res.json({
      message: "Note deleted",
      status: true
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false
    });
  }
};


// Pin or unpin a note
export const pinNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findOne({ _id: id, userId: req.user._id });

    if (!note) {
      return res.json({
        message: "Note not found",
        status: false
      });
    }

    note.isPinned = !note.isPinned;
    await note.save();

    res.json({
      message: "Pin status updated",
      status: true,
      note
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false
    });
  }
};


// Update a note
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, tags } = req.body;

    const note = await Note.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      { title, content, tags },
      { new: true }
    );

    if (!note) {
      return res.json({
        message: "Note not found",
        status: false
      });
    }

    res.json({
      message: "Note updated",
      status: true,
      note
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false
    });
  }
};