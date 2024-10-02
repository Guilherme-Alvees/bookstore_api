import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import allBooksRoutes from "../api/src/routes/bookRoutes.js";

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("Hello Word"));

app.use("/api", allBooksRoutes); // Usa as rotas na URL /api

app.listen(port, () => console.log(`✅ Server running on the port ${port}`));
