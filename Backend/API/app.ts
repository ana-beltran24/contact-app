import express from "express";
import cors from "cors";
import contactRoutes from "./routes/contact.routes.js";

const app = express();

app.use(cors({
  origin: "*",
  credentials: true,
}));

app.use(express.json());

app.use("/api/contacts", contactRoutes);

export default app;