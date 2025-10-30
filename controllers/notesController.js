import Note from "../models/noteModel.js";

// Create a new note
export const createNote = async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    const image = req.file ? req.file.path : null;

    const note = await Note.create({
      userId: req.user._id,
      title,
      content,
      tags,
      image
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
    const deleted = await Note.findOneAndDelete({ _id: id, userId: req.user._id });
    if (!deleted) {
      return res.status(404).json({ message: "Note not found", status: false });
    }
    res.json({ message: "Note deleted", status: true });
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
    const image = req.file ? req.file.path : undefined;

    const update = { title, content, tags };
    if (image !== undefined) update.image = image;

    const note = await Note.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      update,
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