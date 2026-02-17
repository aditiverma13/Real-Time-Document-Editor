import express from "express";
import protect from "../middlewares/isAuth.js";

import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument
} from "../controllers/documentController.js";

const router = express.Router();

router.post("/create", protect, createDocument);
router.get("/", protect, getDocuments);
router.get("/:id", protect, getDocumentById);
router.put("/:id", protect, updateDocument);

export default router;
