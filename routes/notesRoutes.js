import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createNote, getNotes, deleteNote, pinNote, updateNote } from "../controllers/notesController.js";

const router = express.Router();

router.post("/create", authMiddleware, createNote);
router.get("/all", authMiddleware, getNotes);

router.delete("/:id", authMiddleware, deleteNote);
router.put("/pin/:id", authMiddleware, pinNote);
router.put("/:id", authMiddleware, updateNote);

export default router;
