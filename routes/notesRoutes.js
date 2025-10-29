import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js"; // Already created
import { createNote, getNotes, deleteNote, pinNote, updateNote } from "../controllers/notesController.js";

const router = express.Router();

router.post("/create", authMiddleware, upload.single("image"), createNote);
router.get("/all", authMiddleware, getNotes);
router.delete("/:id", authMiddleware, deleteNote);
router.put("/pin/:id", authMiddleware, pinNote);
router.put("/:id", authMiddleware, upload.single("image"), updateNote);

export default router;
