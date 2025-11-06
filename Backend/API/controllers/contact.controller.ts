import { Request, Response } from "express";
import prisma from "../models/prismaClient.js";
import multer from "multer";

const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const getContacts = async (req: Request, res: Response) => {
  const contacts = await prisma.contact.findMany({
    select: {
      id: true,
      name: true,
      lastName: true,
      email: true,
      favorite: true,
      photo: true,
    },
  });
  res.json(contacts);
};


export const getContactPhoto = async (req: Request, res: Response) => {
  const { id } = req.params;
  const contact = await prisma.contact.findUnique({
    where: { id: Number(id) },
    select: { photo: true },
  });

  if (!contact || !contact.photo) {
    return res.status(404).send("Foto no encontrada");
  }

  res.set("Content-Type", "image/jpeg");
  res.send(contact.photo);
};


export const createContact = [
  upload.single("photo"),
  async (req: Request, res: Response) => {
    console.log(req.body)
    try {
      const { firstName, lastName, email, favorite } = req.body;
      const photo = req.file ? req.file.buffer : null;

      const newContact = await prisma.contact.create({
        data: {
          name: firstName, 
          lastName,
          email,
          favorite: favorite === "true" || favorite === true,
          photo,
        },
      });

      res.status(201).json(newContact);
    } catch (error) {
      console.error("Error al crear contacto:", error);
      res.status(500).json({ error: "Error al crear contacto" });
    }
  },
];

export const updateContact = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, lastName, email, favorite } = req.body;

    const data: any = {};

    if (name !== undefined) data.name = name;
    if (lastName !== undefined) data.lastName = lastName;
    if (email !== undefined) data.email = email;
    if (favorite !== undefined)
      data.favorite = favorite === "true" || favorite === true;
    if (req.file) data.photo = req.file.buffer;

    const updated = await prisma.contact.update({
      where: { id: Number(id) },
      data,
    });

    res.json(updated);
  } catch (error) {
    console.error("Error actualizando contacto:", error);
    res.status(500).json({ message: "Error actualizando contacto" });
  }
};

export const deleteContact = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.contact.delete({ where: { id: Number(id) } });
  res.json({ message: "Contacto eliminado" });
};

export const toggleFavorite = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id); 
    const { favorite } = req.body;      
    const contact = await prisma.contact.update({
      where: { id },
      data: { favorite },               
    });

    res.json(contact);
  } catch (error) {
    console.error("Error al actualizar favorito:", error);
    res.status(500).json({ message: "Error al actualizar favorito" });
  }
};