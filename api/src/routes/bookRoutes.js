import express from "express";
import bookController from "../controllers/bookController.js";

const router = express.Router();

// Rota para listar todos os livros
router.get("/livros", bookController.listarLivros);

export default router;
