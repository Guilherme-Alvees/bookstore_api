import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import allBooksRoutes from "../api/src/routes/bookRoutes.js";
import allUsersRoutes from "../api/src/routes/userRoutes.js";

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("Hello Word"));

app.use("/api", allBooksRoutes); // Usa as rotas na URL /api/livros
app.use("/api", allUsersRoutes); // Usa as rotas na URL /api/users

app.listen(port, () => console.log(`✅ Server running on the port ${port}`));
