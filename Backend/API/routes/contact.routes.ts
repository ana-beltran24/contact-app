import express from "express";
import {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
  getContactPhoto,
  toggleFavorite,
} from "../controllers/contact.controller.js";

const router = express.Router();

router.get("/", getContacts);
router.post("/", createContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);
router.get("/:id/photo", getContactPhoto);
router.patch("/:id/favorite", toggleFavorite);

export default router;
