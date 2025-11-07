import express from "express";
import {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
  getContactPhoto,
  toggleFavorite,
  upload,
} from "../controllers/contact.controller.js";

const router = express.Router();

router.get("/", getContacts);
router.post("/", createContact);
router.put("/:id", upload.single("photo"), updateContact);
router.delete("/:id", deleteContact);
router.get("/:id/photo", getContactPhoto);
router.post("/:id/favorite", toggleFavorite);

export default router;

